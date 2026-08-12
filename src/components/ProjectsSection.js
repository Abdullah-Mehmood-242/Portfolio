/**
 * ProjectsSection — Responsive grid of all project cards with category filter.
 *
 * Features:
 * - Fixed Kaggle ML projects
 * - Dynamic fetching of GitHub repositories via GitHub API (Personal & Think & Code)
 * - Category filter tabs: All / ML & Data Science / Mobile Dev / Systems / Web
 * - Responsive 3D glassmorphic grid layout
 */
'use client';

import { useState, useEffect } from 'react';
import { Loader2, Github } from 'lucide-react';
import SectionHeading from './SectionHeading';
import ScrollReveal from './ScrollReveal';
import ProjectCard from './ProjectCard';
import styles from './ProjectsSection.module.css';

/* ── Category Constants ── */
const CATEGORIES = {
  ALL: 'All',
  ML: 'ML & Data Science',
  MOBILE: 'Mobile Dev',
  SYSTEMS: 'Systems & OS',
  WEB: 'Web',
};

/* ── Account Constants ── */
const ACCOUNTS = {
  PERSONAL: 'Personal',
  THINK_AND_CODE: 'Think & Code',
};

/* ── Hardcoded Kaggle / Fixed Projects ── */
const KAGGLE_PROJECTS = [
  {
    title: 'Cryptocurrency Volatility Forecasting',
    description:
      'Engineered an LSTM neural network to forecast Bitcoin and market volatility using robust time-series pipelines. Evaluated performance with rigorous loss functions and optimization algorithms to minimize sequential prediction error.',
    techStack: ['Python', 'LSTM', 'TensorFlow', 'Pandas', 'NumPy'],
    url: 'https://www.kaggle.com/code/abdullahmehmood242/abdullah-mehmood-70169004-cryptocurrency',
    featured: true,
    category: CATEGORIES.ML,
  },
  {
    title: 'Plant Disease Detection',
    description:
      'Developed a ResNet50V2 image classification model to diagnose plant diseases from leaf imagery with automated augmentation. Integrated Grad-CAM visualizations to interpret model decision-making and map spatial features critical to identification.',
    techStack: ['Python', 'ResNet50V2', 'Grad-CAM', 'OpenCV', 'Keras'],
    url: 'https://www.kaggle.com/code/talhamehmood8015/talha-mehmood-70169004-plant-disease-detection',
    featured: true,
    category: CATEGORIES.ML,
  },
  {
    title: 'Amazon Review Sentiment Analysis',
    description:
      'Built a Bidirectional LSTM model to classify sentiment polarity across large Amazon review datasets. Designed text preprocessing pipelines including tokenization, stop-word removal, and vectorization for deep learning ingestion.',
    techStack: ['Python', 'BiLSTM', 'NLTK', 'TensorFlow', 'Keras'],
    url: 'https://www.kaggle.com/code/ammadyounas/ammad-younas-70158184-amazon-review-sentiment',
    featured: true,
    category: CATEGORIES.ML,
  },
];

export default function ProjectsSection() {
  const [activeAccount, setActiveAccount] = useState(ACCOUNTS.PERSONAL);
  const [activeFilter, setActiveFilter] = useState(CATEGORIES.ALL);
  
  const [personalProjects, setPersonalProjects] = useState(KAGGLE_PROJECTS);
  const [tcProjects, setTcProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ── Fetch GitHub Projects Dynamically ── */
  useEffect(() => {
    const fetchGitHubProjects = async () => {
      try {
        const [resPersonal, resTC] = await Promise.all([
          fetch('https://api.github.com/users/Abdullah-Mehmood-242/repos?per_page=100&sort=updated'),
          fetch('https://api.github.com/users/tcintern-033/repos?per_page=100&sort=updated')
        ]);

        let githubPersonal = [];
        let githubTC = [];

        if (resPersonal.ok) {
          const data = await resPersonal.json();
          githubPersonal = processRepos(data);
        }
        
        if (resTC.ok) {
          const data = await resTC.json();
          githubTC = processRepos(data);
        }

        setPersonalProjects([...KAGGLE_PROJECTS, ...githubPersonal]);
        setTcProjects(githubTC);
      } catch (error) {
        console.error('Error fetching GitHub projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubProjects();
  }, []);

  const processRepos = (repos) => {
    if (!Array.isArray(repos)) return [];
    
    return repos
      .filter((repo) => !repo.fork)
      .map((repo) => {
        let category = CATEGORIES.WEB;
        const lang = repo.language?.toLowerCase() || '';
        const desc = repo.description?.toLowerCase() || '';
        
        if (lang === 'python' || lang === 'jupyter notebook' || desc.includes('ml') || desc.includes('classification')) {
          category = CATEGORIES.ML;
        } else if (lang === 'dart' || lang === 'kotlin' || desc.includes('android')) {
          category = CATEGORIES.MOBILE;
        } else if (lang === 'c++' || lang === 'c' || desc.includes('simulator')) {
          category = CATEGORIES.SYSTEMS;
        }

        const techStack = [];
        if (repo.language) techStack.push(repo.language);
        if (repo.topics) techStack.push(...repo.topics.slice(0, 3));

        const isFeatured = repo.stargazers_count > 0 || repo.name.includes('Fault-Tolerant') || repo.name.includes('Under-Byte');

        return {
          title: repo.name.replace(/-/g, ' '),
          description: repo.description || 'No description provided.',
          techStack: techStack.length > 0 ? techStack : ['Code'],
          url: repo.html_url,
          featured: isFeatured,
          category: category,
        };
      });
  };

  /* ── Filter projects by category ── */
  const currentProjects = activeAccount === ACCOUNTS.PERSONAL ? personalProjects : tcProjects;

  const filteredProjects =
    activeFilter === CATEGORIES.ALL
      ? currentProjects
      : currentProjects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeading
          title="Projects"
          subtitle="A selection of work across machine learning, mobile, and systems"
        />

        {/* ── Account Toggle ── */}
        <ScrollReveal>
          <div className={styles.accountToggle}>
            {Object.values(ACCOUNTS).map((acc) => (
              <button
                key={acc}
                className={`${styles.accountBtn} ${
                  activeAccount === acc ? styles.activeAccount : ''
                }`}
                onClick={() => {
                  setActiveAccount(acc);
                  setActiveFilter(CATEGORIES.ALL);
                }}
              >
                {acc}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* ── Category Filter Tabs ── */}
        <ScrollReveal>
          <div className={styles.filters}>
            {Object.values(CATEGORIES)
              .filter(
                (cat) =>
                  activeAccount === ACCOUNTS.PERSONAL ||
                  (cat !== CATEGORIES.MOBILE && cat !== CATEGORIES.SYSTEMS)
              )
              .map((cat) => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${
                  activeFilter === cat ? styles.active : ''
                }`}
                onClick={() => setActiveFilter(cat)}
              >
                {activeAccount === ACCOUNTS.THINK_AND_CODE && cat === CATEGORIES.ML 
                  ? 'AI & ML' 
                  : cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* ── GitHub Link for Think & Code ── */}
        {activeAccount === ACCOUNTS.THINK_AND_CODE && (
          <ScrollReveal>
            <div className={styles.tcLinkWrapper}>
              <a
                href="https://github.com/tcintern-033?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.tcLink}
              >
                <Github size={18} />
                View Think & Code GitHub Profile
              </a>
            </div>
          </ScrollReveal>
        )}

        {/* ── Loading State ── */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
            <Loader2 size={32} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
          </div>
        ) : (
          /* ── Project Cards Grid ── */
          <div className={styles.grid}>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <ScrollReveal key={project.url || project.title} delay={(index % 3) * 60}>
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    techStack={project.techStack}
                    url={project.url}
                    featured={project.featured}
                  />
                </ScrollReveal>
              ))
            ) : (
              <div className={styles.noProjects}>
                <p>No projects found for this category.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
