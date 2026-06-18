'use strict';

hexo.extend.generator.register('welcome-homepage', function (locals) {
  const slug = this.config.homepage_post;

  if (!slug) {
    throw new Error('Missing "homepage_post" in _config.yml.');
  }

  const welcomePost = locals.posts.toArray().find(post => post.slug === slug);

  if (!welcomePost) {
    throw new Error(`Homepage post "${slug}" was not found in source/_posts/.`);
  }

  const homepage = {
    ...welcomePost,
    __post: true,
    path: 'index.html',
    permalink: `${this.config.url.replace(/\/$/, '')}/`,
    prev: null,
    next: null
  };

  return {
    path: 'index.html',
    layout: ['post', 'page', 'index'],
    data: homepage
  };
});
