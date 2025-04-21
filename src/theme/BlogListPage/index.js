// /**
//  * Copyright @ by Code Lyoko Team. All rights reserved.
//  * Author: Thành Nam Nguyễn
//  */

import { HtmlClassNameProvider, PageMetadata, ThemeClassNames } from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import BlogLayout from '@theme/BlogLayout';
import BlogPostItems from '@theme/BlogPostItems';
import Image from '@theme/IdealImage';
import SearchMetadata from '@theme/SearchMetadata';
import clsx from 'clsx';
import React from 'react';

import { Box, Typography } from '@mui/material';
import { BlogPagination } from '../BlogPagination';

function BlogListPageMetadata(props) {
  const { metadata } = props;
  const {
    siteConfig: { title: siteTitle },
  } = useDocusaurusContext();
  const { blogDescription, blogTitle, permalink } = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;

  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}

function BlogHomepageBanner(props) {
  const blogMetadata = props.metadata;
  const imageDefault = {
    urlBannerBg: 'img/blog_background.jpg',
    urlAvatar: 'img/torai_icon_transparent.png',
  };

  return (
    <div className="blog">
      <div className="blog-banner-wrapper">
        <Image img={useBaseUrl(imageDefault.urlBannerBg)} alt="Blog banner" className="blog-banner-bg" loading="lazy" />
        <Image
          img={useBaseUrl(imageDefault.urlAvatar)}
          alt="avatar blog"
          className="blog-avatar"
          width={100}
          height={100}
          loading="lazy"
        />
      </div>
      <Box sx={{ marginTop: '100px' }}>
        <Typography variant="h2" className="section-block__heading">
          {blogMetadata.blogTitle}
        </Typography>
        <Typography variant="body1" className="section-block__description">
          {blogMetadata.blogDescription}
        </Typography>
      </Box>
    </div>
  );
}

function BlogListPageContent(props) {
  const { metadata, items, sidebar } = props;

  return (
    <BlogLayout sidebar={sidebar}>
      <BlogHomepageBanner {...props} />
      <BlogPostItems items={items} />
      <BlogPagination metadata={metadata} />
    </BlogLayout>
  );
}

export default function BlogListPage(props) {
  return (
    <HtmlClassNameProvider className={clsx(ThemeClassNames.wrapper.blogPages, ThemeClassNames.page.blogListPage)}>
      <BlogListPageMetadata {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
