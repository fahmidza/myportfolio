import React from 'react';
import Img from '@theme-original/MDXComponents/Img';

export default function ImgWrapper(props) {
  return (
    <figure style={{ textAlign: 'center', margin: '2rem 0' }}>
      <Img {...props} />
      {props.title && (
        <figcaption style={{ color: 'var(--ifm-color-emphasis-700)', fontSize: '0.9em', marginTop: '0.5rem', fontStyle: 'italic' }}>
          {props.title}
        </figcaption>
      )}
    </figure>
  );
}
