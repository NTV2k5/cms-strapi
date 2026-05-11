/**
 * Lifecycle hooks for Comment
 */

const FORBIDDEN_WORDS = ['spam', 'junk', 'badword1', 'badword2']; // Example blacklist
const LINK_REGEX = /https?:\/\/[^\s]+/g;

export default {
  async beforeCreate(event) {
    const { data } = event.params;

    if (data.content) {
      const content = data.content.toLowerCase();
      
      // Check for forbidden words
      const containsForbidden = FORBIDDEN_WORDS.some(word => content.includes(word));
      
      // Check for excessive links (more than 2 links)
      const links = data.content.match(LINK_REGEX) || [];
      const excessiveLinks = links.length > 2;

      if (containsForbidden || excessiveLinks) {
        data.status = 'blocked';
        data.isSpam = true;
      }
    }
  },
};
