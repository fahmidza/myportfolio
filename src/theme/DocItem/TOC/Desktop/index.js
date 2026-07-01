import React from 'react';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import TOC from '@theme/TOC';

export default function DocItemTOCDesktop() {
  const {toc, frontMatter, metadata} = useDoc();

  const isProjectPage =
    metadata.permalink &&
    metadata.permalink.includes('/docs/projects/') &&
    !metadata.permalink.endsWith('/docs/projects') &&
    !metadata.permalink.endsWith('/docs/projects/');

  const reportFiles = frontMatter?.report_files || [];

  const newToc = [...toc];
  if (isProjectPage && reportFiles.length > 0) {
    newToc.push({
      value: 'Attachments',
      id: 'attachments',
      level: 2,
    });
  }

  return (
    <TOC
      toc={newToc}
      minHeadingLevel={frontMatter.toc_min_heading_level}
      maxHeadingLevel={frontMatter.toc_max_heading_level}
      className={ThemeClassNames.docs.docTocDesktop}
    />
  );
}
