// models/postModel.js
const db = require('../config/db');

/**
 * Recupera tutti i post, con filtro opzionale per tag
 * @param {string[] | undefined} tags - Array di tag (opzionale)
 * @returns {Promise<Array>}
 */
async function getAllPosts(tags) {
    let query = `
      SELECT posts.id, posts.title, posts.content, posts.image,
             GROUP_CONCAT(tags.label) AS tags
      FROM posts
      LEFT JOIN post_tag ON posts.id = post_tag.post_id
      LEFT JOIN tags ON tags.id = post_tag.tag_id
    `;
  
    const values = [];
  
    if (tags && tags.length > 0) {
      const placeholders = tags.map(() => '?').join(',');
      query += ` WHERE tags.label IN (${placeholders})`;
      values.push(...tags);
    }
  
    query += `
      GROUP BY posts.id
      ORDER BY posts.id DESC
    `;
  
    const [rows] = await db.query(query, values);
    return rows.map(post => ({
      ...post,
      tags: post.tags ? post.tags.split(',') : []
    }));
  }
  
module.exports = {
  getAllPosts
};
