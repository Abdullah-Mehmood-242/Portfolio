/**
 * AboutSection — Professional narrative about Abdullah's career trajectory.
 *
 * Highlights:
 * - Technical pivot from mobile development → ML/Data Science
 * - Education: BSCS from University of Lahore (3.58 CGPA)
 * - Current focus on local ML workflows, mathematical modeling, operations research
 * - Certifications in cybersecurity
 */
'use client';

import {
  GraduationCap,
  BrainCircuit,
  ShieldCheck,
  Trophy,
  Code2,
  ArrowRight,
} from 'lucide-react';
import SectionHeading from './SectionHeading';
import ScrollReveal from './ScrollReveal';
import styles from './AboutSection.module.css';

/* ── Education & Certification data ── */
const EDUCATION = {
  institution: 'University of Lahore',
  campus: 'Sargodha Campus',
  degree: 'Bachelor of Science in Computer Science',
  period: '2022 – 2026',
  cgpa: '3.58 / 4.0',
};

const CERTIFICATIONS = [
  {
    title: 'Certified Ethical Hacking (v12) Specialization',
    issuer: 'LearnKartS / Coursera',
    date: 'Aug 2025',
    credential: 'D5WSTUQ34AGF',
  },
  {
    title: 'Defronix Certified Junior Security Practitioner (DCjSP)',
    issuer: 'Defronix Cyber Security',
    date: 'Oct 2025',
    credential: 'DCJSP1353',
  },
  {
    title: 'Advanced Cybersecurity',
    issuer: 'LearnKartS / Coursera',
    date: 'Aug 2025',
    credential: '6N5QMGA78YFL',
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHeading
          title="About"
          subtitle="From mobile apps to machine intelligence"
        />

        <div className={styles.grid}>
          {/* ── Main Narrative ── */}
          <ScrollReveal>
            <div className={`glass-card ${styles.narrative}`}>
              <div className={styles.narrativeIcon}>
                <BrainCircuit size={28} />
              </div>
              <h3>The Pivot</h3>
              <p>
                While my early software engineering footprint began with mobile application development, my career and technical focus are exclusively dedicated to Data Science and Machine Learning.
              </p>
              <p>
                Operating professionally as A.M., I specialize in Time Series Forecasting, Computer Vision, and Operations Research. My core competency lies in architecting predictive models and decision-support systems that solve complex data problems. Whether engineering LSTM models for cryptocurrency volatility, designing CNNs for precise disease detection, or utilizing operations research for retail inventory optimization, my focus is strictly on transforming raw data into rigorous, actionable intelligence. I build the mathematical logic and robust machine learning pipelines that drive intelligent systems.
              </p>
            </div>
          </ScrollReveal>

          {/* ── Right Column: Education + Certs + Achievement ── */}
          <div className={styles.rightColumn}>
            {/* Education Card */}
            <ScrollReveal delay={100}>
              <div className={`glass-card ${styles.infoCard}`}>
                <div className={styles.cardHeader}>
                  <GraduationCap size={22} />
                  <h3>Education</h3>
                </div>
                <div className={styles.eduDetails}>
                  <p className={styles.institution}>
                    {EDUCATION.institution}
                  </p>
                  <p className={styles.campus}>{EDUCATION.campus}</p>
                  <p className={styles.degree}>{EDUCATION.degree}</p>
                  <div className={styles.eduMeta}>
                    <span className="tag">{EDUCATION.period}</span>
                    <span className="tag">CGPA: {EDUCATION.cgpa}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Achievement Card */}
            <ScrollReveal delay={200}>
              <div className={`glass-card ${styles.infoCard}`}>
                <div className={styles.cardHeader}>
                  <Trophy size={22} />
                  <h3>Achievement</h3>
                </div>
                <p className={styles.achievementText}>
                  Secured <strong>2nd position</strong> in the Speed Programming
                  Competition at the University of Lahore.
                </p>
              </div>
            </ScrollReveal>

            {/* Certifications Card */}
            <ScrollReveal delay={300}>
              <div className={`glass-card ${styles.infoCard}`}>
                <div className={styles.cardHeader}>
                  <ShieldCheck size={22} />
                  <h3>Certifications</h3>
                </div>
                <ul className={styles.certList}>
                  {CERTIFICATIONS.map((cert, i) => (
                    <li key={i} className={styles.certItem}>
                      <span className={styles.certTitle}>{cert.title}</span>
                      <span className={styles.certMeta}>
                        {cert.issuer} · {cert.date}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
