/**
 * ProjectsSection — Responsive grid of all project cards with category filter.
 *
 * Features:
 * - Fixed Kaggle ML projects
 * - Dynamic fetching of GitHub repositories via GitHub API
 * - Category filter tabs: All / ML & Data Science / Mobile Dev / Systems / Web
 * - Responsive 3D glassmorphic grid layout
 */
'use client';

import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
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
  const [activeFilter, setActiveFilter] = useState(CATEGORIES.ALL);
  const [projects, setProjects] = useState(KAGGLE_PROJECTS);
  const [loading, setLoading] = useState(true);

  /* ── Fetch GitHub Projects Dynamically ── */
  useEffect(() => {
    const fetchGitHubProjects = async () => {
      try {
        const response = await fetch(
          'https://api.github.com/users/Abdullah-Mehmood-242/repos?per_page=100&sort=updated'
        );
        if (!response.ok) throw new Error('Failed to fetch');
        
        const data = await response.json();
        
        const githubProjects = data
          .filter((repo) => !repo.fork) // Exclude forks
          .map((repo) => {
            // Attempt to categorize based on language or topics
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

            // Tech stack from language and topics
            const techStack = [];
            if (repo.language) techStack.push(repo.language);
            if (repo.topics) techStack.push(...repo.topics.slice(0, 3)); // Add up to 3 topics

            // Check if it's one of the "featured" github repos based on stars or specific names
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

        // Merge Kaggle and GitHub projects
        setProjects([...KAGGLE_PROJECTS, ...githubProjects]);
      } catch (error) {
        console.error('Error fetching GitHub projects:', error);
        // Fallback to just Kaggle projects if API fails
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubProjects();
  }, []);

  /* ── Filter projects by category ── */
  const filteredProjects =
    activeFilter === CATEGORIES.ALL
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeading
          title="Projects"
          subtitle="A selection of work across machine learning, mobile, and systems"
        />

        {/* ── Category Filter Tabs ── */}
        <ScrollReveal>
          <div className={styles.filters}>
            {Object.values(CATEGORIES).map((cat) => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${
                  activeFilter === cat ? styles.active : ''
                }`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* ── Loading State ── */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
            <Loader2 size={32} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
          </div>
        ) : (
          /* ── Project Cards Grid ── */
          <div className={styles.grid}>
            {filteredProjects.map((project, index) => (
              <ScrollReveal key={project.url || project.title} delay={(index % 3) * 60}>
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  techStack={project.techStack}
                  url={project.url}
                  featured={project.featured}
                />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
