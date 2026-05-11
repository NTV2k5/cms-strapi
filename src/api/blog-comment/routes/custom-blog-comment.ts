export default {
  routes: [
    {
      method: 'GET',
      path: '/blog-comments/flat/:postId',
      handler: 'blog-comment.findFlat',
      config: {
        auth: false,
        policies: [],
      },
    },
  ],
};
