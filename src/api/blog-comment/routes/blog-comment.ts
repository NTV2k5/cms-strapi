import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::blog-comment.blog-comment' as any, {
  config: {
    delete: {
      policies: ['is-comment-author'],
    },
    update: {
      policies: ['is-comment-author'],
    },
  },
});
