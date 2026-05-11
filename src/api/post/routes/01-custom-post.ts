export default {
  routes: [
    {
      method: 'GET',
      path: '/blog-lastest',
      handler: 'post.getLatest',
      config: {
        auth: {},
      },
    },
  ],
};
