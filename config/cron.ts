export default {
  /**
   * Every minute, check for posts that should be published.
   */
  '*/1 * * * *': async ({ strapi }) => {
    const now = new Date().toISOString();
    
    // Find posts with scheduledPublishAt <= now and not yet published
    const postsToPublish = await strapi.documents('api::post.post').findMany({
      filters: {
        scheduledPublishAt: { $lte: now },
        publishedAt: { $null: true },
      },
    });

    if (postsToPublish.length > 0) {
      console.log(`[Cron] Publishing ${postsToPublish.length} scheduled posts...`);
      
      for (const post of postsToPublish) {
        await strapi.documents('api::post.post').publish({
          documentId: post.documentId,
        });
      }
    }
  },
};
