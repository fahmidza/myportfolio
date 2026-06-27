import React, { useEffect, useRef } from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import styles from './styles.module.css';

const PLACEHOLDER_IMAGE = '/portfolio/img/projects/placeholder.svg';

export default function ProjectHero() {
  const { metadata, frontMatter } = useDoc();
  const heroRef = useRef(null);
  const image = frontMatter.project_image || PLACEHOLDER_IMAGE;
  const title = metadata.title || 'Project';
  const description = metadata.description || '';
  const category = frontMatter.category || '';
  const tags = frontMatter.tags || [];

  // Hide the default markdown h1 to avoid duplicate titles
  useEffect(() => {
    if (heroRef.current) {
      const article = heroRef.current.closest('article');
      if (article) {
        const defaultH1 = article.querySelector('.markdown > h1');
        if (defaultH1) {
          defaultH1.style.display = 'none';
        }
      }
    }
  }, []);

  return (
    <div className={styles.heroWrapper} ref={heroRef}>
      <div className={styles.heroImageContainer}>
        <img
          src={image}
          alt={title}
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />
      </div>

      <div className={styles.heroContent}>
        {category && (
          <span className={styles.heroCategory}>{category}</span>
        )}
        <h1 className={styles.heroTitle}>{title}</h1>
        {description && (
          <p className={styles.heroDescription}>{description}</p>
        )}
        {tags.length > 0 && (
          <div className={styles.heroTags}>
            {tags.map((tag) => (
              <span key={tag} className={styles.heroTag}>{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
