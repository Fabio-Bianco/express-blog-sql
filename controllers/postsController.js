// controllers/postsController.js

// Importa la funzione getAllPosts dal model
const { getAllPosts } = require('../models/postModel');

/**
 * INDEX – Recupera tutti i post dal database,
 * con supporto per filtro opzionale via query string ?tag=...
 */
async function index(req, res) {
  try {
    // Recupera i tag dalla query string, può essere un singolo tag o un array
    let tags = req.query.tag;

    // Normalizza: se è un singolo tag, lo trasformiamo in array
    if (tags && !Array.isArray(tags)) {
      tags = [tags];
    }

    // Otteniamo i post dal DB tramite il model
    const posts = await getAllPosts(tags);

    // Risposta JSON: messaggio + risultati
    return res.status(200).json({
      message: tags
        ? `Filtered posts by tags: ${tags.join(', ')}`
        : 'All posts retrieved',
      results: posts
    });
  } catch (err) {
    console.error('❌ Error fetching posts from DB:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// Le altre funzioni (show, create, update, etc.) sono ancora basate sull'array locale
// Le aggiorneremo nelle prossime milestone

function show(req, res) {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);

  if (!post) {
    console.log(` Post con ID ${id} non trovato`);
    return res.status(404).json({ error: 'Post non trovato' });
  }

  console.log(` Post trovato con ID ${id}:`, post);

  return res.status(200).json({
    message: `Post trovato con ID: ${id}`,
    post
  });
}

function create(req, res) {
  const newId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1;

  if (!req.body.title || !req.body.content) {
    return res.status(400).json({ error: 'Titolo e contenuto sono obbligatori' });
  }

  const newPost = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    tags: req.body.tags
  };

  posts.push(newPost);

  console.log(' Nuovo post creato:', newPost);
  console.log(' Lista aggiornata:', posts);

  res.status(201).json({
    message: 'Post creato con successo',
    post: newPost
  });
}

function update(req, res) {
  const id = parseInt(req.params.id);
  const index = posts.findIndex(p => p.id === id);

  if (index === -1) {
    console.log(` Nessun post trovato con ID ${id}. Aggiornamento non eseguito.`);
    return res.status(404).json({ error: `Post con ID ${id} non trovato` });
  }

  const updatedPost = {
    id: id,
    title: req.body.title || '',
    content: req.body.content || '',
    image: req.body.image || '',
    tags: req.body.tags || []
  };

  posts[index] = updatedPost;

  console.log(` Post con ID ${id} aggiornato con successo.`);
  console.log(' Nuovo contenuto del post:', updatedPost);
  console.log(' Lista aggiornata:', posts);

  return res.status(200).json({
    message: 'Post aggiornato con successo (completo)',
    post: updatedPost
  });
}

function modify(req, res) {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);

  if (!post) {
    console.log(` Post con ID ${id} non trovato per modifica parziale.`);
    return res.status(404).json({ error: `Post con ID ${id} non trovato` });
  }

  if (req.body.title !== undefined) post.title = req.body.title;
  if (req.body.content !== undefined) post.content = req.body.content;
  if (req.body.image !== undefined) post.image = req.body.image;
  if (req.body.tags !== undefined) post.tags = req.body.tags;

  console.log(` Post con ID ${id} modificato parzialmente.`);
  console.log(' Contenuto aggiornato:', post);

  return res.status(200).json({
    message: `Post modificato con successo (parziale)`,
    post
  });
}

function remove(req, res) {
  const id = parseInt(req.params.id);
  const index = posts.findIndex(post => post.id === id);

  if (index === -1) {
    console.log(`Tentativo di eliminazione fallito: post con ID ${id} non trovato.`);
    return res.status(404).json({ error: 'Post non trovato' });
  }

  const deletedPost = posts.splice(index, 1)[0];

  console.log(` Post con ID ${id} eliminato con successo.`);
  console.log(' Lista aggiornata:', posts);

  return res.status(200).json({
    message: `Post con ID ${id} eliminato con successo`,
    post: deletedPost
  });
}

module.exports = {
  index,
  show,
  create,
  update,
  modify,
  remove
};
