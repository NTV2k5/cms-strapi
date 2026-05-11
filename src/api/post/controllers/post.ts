/**
 * post controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::post.post', ({ strapi }) => ({
  async getLatest(ctx) {
    // Get limit from query params, default to 5
    const { limit = 5 } = ctx.query;
    
    try {
      // Use Strapi 5 Document Service
      const entries = await strapi.documents('api::post.post').findMany({
        sort: 'publishedAt:desc',
        limit: Number(limit),
        populate: '*',
        status: 'published',
      });

      return ctx.send({ data: entries });
    } catch (error) {
      ctx.body = error;
      ctx.status = 500;
    }
  },
}));

