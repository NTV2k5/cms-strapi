import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::blog-comment.blog-comment' as any, ({ strapi }) => ({
  /**
   * Custom create: automatically assign author_user from the authenticated user.
   * Uses strapi.db.query which accepts numeric IDs for relations (post, parent).
   */
  async create(ctx) {
    if (!ctx.state.user) {
      return ctx.unauthorized('You must be logged in to comment.');
    }

    const { content, post, parent, status } = ctx.request.body?.data || {};

    const entry = await strapi.db.query('api::blog-comment.blog-comment').create({
      data: {
        content,
        post: post || null,
        parent: parent || null,
        status: status || 'approved',
        author_user: ctx.state.user.id,
      },
      populate: ['author_user', 'post', 'parent'],
    });

    return { data: entry };
  },

  /**
   * Custom findFlat: returns ALL comments for a post as a flat list.
   * Frontend will build the tree structure (supporting infinite nesting).
   */
  async findFlat(ctx) {
    const { postId } = ctx.params;

    const entries = await strapi.db.query('api::blog-comment.blog-comment').findMany({
      where: {
        post: { id: postId },
      },
      populate: {
        author_user: {
          select: ['id', 'username'],
          populate: { avatar: true },
        },
        parent: {
          select: ['id'],
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    return { data: entries };
  },
}));
