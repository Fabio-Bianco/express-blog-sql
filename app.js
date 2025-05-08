require('dotenv').config();
require('./config/db');
const express = require("express"); // Importa il modulo Express
const app = express();              // Crea un'applicazione Express
const port = 4000;                  // Imposta la porta su cui il server sarà in ascolto

// Import dei router e middleware personalizzati
const postsRouter = require("./routers/posts");
const checkError = require("./middlewares/checkError");

// Middleware globali
app.use(express.json());       // Parsing del body in formato JSON
app.use(checkError);           // Middleware personalizzato (es. logger, validazioni)
app.use("/posts", postsRouter); // Registra tutte le rotte con prefisso /posts
app.use(express.static("public")); // Serve i file statici dalla cartella /public

// Rotta di base
app.get("/", (req, res) => {
  res.send("Benvenuto sul blog");
});

// Rotta per simulare un errore 500
app.get('/errore-test', (req, res) => {
  throw new Error('Errore simulato per test 500');
});

// Middleware per rotte non trovate (404)
app.use((req, res, next) => {
  console.log(`❌ [404] Rotta non trovata: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    error: 'La risorsa richiesta non esiste'
  });
});

// Middleware per errori generici (500)
app.use((err, req, res, next) => {
  console.error('🔥 Errore interno del server:', err.stack); // err.stack = traccia dettagliata dell'errore
  res.status(500).json({
    error: "Errore interno del server"
  });
});

// Avvio del server
app.listen(port, () => {
  console.log("Server attivo sulla porta " + port);
});
