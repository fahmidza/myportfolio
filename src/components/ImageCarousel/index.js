import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

export default function ImageCarousel({ images, alt, className }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <div className={`${styles.carouselWrapper} ${className || ''}`}>
      {images.map((img, index) => (
        <img
          key={`${img}-${index}`}
          src={img}
          alt={alt}
          className={`${styles.carouselImage} ${index === currentIndex ? styles.active : ''}`}
          loading="lazy"
        />
      ))}
      {images.length > 1 && (
        <div className={styles.carouselIndicators}>
          {images.length > 5 ? (
            <span 
              className={styles.carouselCounter}
              onClick={(e) => {
                e.preventDefault();
                setCurrentIndex((prev) => (prev + 1) % images.length);
              }}
              title="Next image"
            >
              {currentIndex + 1} / {images.length}
            </span>
          ) : (
            images.map((_, index) => (
              <span
                key={index}
                className={`${styles.indicator} ${index === currentIndex ? styles.indicatorActive : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentIndex(index);
                }}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
