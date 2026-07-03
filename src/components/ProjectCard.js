/**
 * ProjectCard — Glassmorphic project card with hover effects.
 *
 * Displays:
 * - Project title
 * - 2-sentence description
 * - Tech stack tags
 * - Outbound action button
 * - Optional "Featured" badge for priority projects
 */
import { ExternalLink, Star } from 'lucide-react';
import styles from './ProjectCard.module.css';

export default function ProjectCard({
  title,
  description,
  techStack = [],
  url,
  featured = false,
}) {
  return (
    <div className={`glass-card ${styles.card} ${featured ? styles.featured : ''}`}>
      {/* Featured Badge */}
      {featured && (
        <div className={styles.badge}>
          <Star size={12} />
          Featured
        </div>
      )}

      {/* Card Body */}
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>

      {/* Tech Stack Tags */}
      <div className={styles.tags}>
        {techStack.map((tech) => (
          <span key={tech} className="tag">
            {tech}
          </span>
        ))}
      </div>

      {/* Action Button */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn btn-outline ${styles.action}`}
      >
        View Project
        <ExternalLink size={14} />
      </a>
    </div>
  );
}
