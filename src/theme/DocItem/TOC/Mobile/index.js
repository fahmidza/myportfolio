import React from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import TOCCollapsible from '@theme/TOCCollapsible';
import styles from '@docusaurus/theme-classic/lib/theme/DocItem/TOC/Mobile/styles.module.css';

export default function DocItemTOCMobile() {
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
    <TOCCollapsible
      toc={newToc}
      minHeadingLevel={frontMatter.toc_min_heading_level}
      maxHeadingLevel={frontMatter.toc_max_heading_level}
      className={clsx(ThemeClassNames.docs.docTocMobile, styles.tocMobile)}
    />
  );
}
