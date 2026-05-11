export default {
  async afterCreate(event) {
    await createVersion(event);
  },
  async afterUpdate(event) {
    await createVersion(event);
  },
};

async function createVersion(event) {
  const { result, params } = event;
  try {
    await (strapi as any).documents('api::post-version.post-version' as any).create({
      data: {
        title: result.title,
        content: result.content,
        description: result.description,
        post: result.id,
        author: result.author?.id || params.data?.author,
      } as any,
    });
  } catch (error) {
    console.error('Failed to create post version snapshot:', error);
  }
}
