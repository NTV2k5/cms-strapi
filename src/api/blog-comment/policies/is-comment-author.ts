/**
 * Policy to check if the user is the author of the comment
 */
export default async (policyContext, config, { strapi }) => {
  const { id } = policyContext.params;
  const { user } = policyContext.state;

  if (!user) return false;

  // Fetch the comment to check authorship
  const comment = await strapi.documents('api::blog-comment.blog-comment').findOne({
    documentId: id,
    populate: ['author_user']
  });

  if (!comment) return true; // Let it fall through to 404

  // Check if current user ID matches comment author ID
  return comment.author_user?.id === user.id;
};
