import React from 'react';
import Content from '@theme-original/DocItem/Content';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import ProjectHero from '@site/src/components/ProjectHero';

export default function ContentWrapper(props) {
  const { metadata } = useDoc();

  // Only show the ProjectHero on project detail pages (not the index)
  const isProjectPage =
    metadata.permalink &&
    metadata.permalink.includes('/docs/projects/') &&
    !metadata.permalink.endsWith('/docs/projects') &&
    !metadata.permalink.endsWith('/docs/projects/');

  return (
    <>
      {isProjectPage && <ProjectHero />}
      <Content {...props} />
    </>
  );
}
