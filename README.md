# Progetto Express API - Blog REST

Questo progetto è una semplice API REST costruita con **Node.js** e **Express**.  
Inizialmente ogni post era rappresentato da un oggetto in un array locale (`posts.js`), ma ora è stato integrato con **MySQL** per la gestione e persistenza dei dati.

---

## 🛠️ Funzionalità principali (CRUD)

- `GET /posts` → Elenco di tutti i post (filtro opzionale per `?tag=`)
- `GET /posts/:id` → Dettaglio di un post per ID
- `POST /posts` → Creazione di un nuovo post
- `PUT /posts/:id` → Aggiornamento completo di un post
- `PATCH /posts/:id` → Aggiornamento parziale di un post
- `DELETE /posts/:id` → Eliminazione di un post

---

## 🗄️ Database MySQL

Il progetto utilizza **MySQL** per memorizzare i post.

### 🔹 Milestone completate

#### 1. Connessione al DB
- Il database è stato importato in **MySQL Workbench**
- Installato il client MySQL:

  npm install mysql2
 
- Creata la configurazione di connessione in `config/db.js`
- Console log in fase di connessione per verifica

#### 2. API `GET /posts`
- Recupera i post direttamente dal database

#### 3. API `DELETE /posts/:id`
- Elimina il post selezionato dal database
- Risponde con `204 No Content` se l’operazione va a buon fine

#### 4. API `GET /posts/:id`
- Recupera il singolo post con `id` specifico

#### ✅ Bonus
- `GET /posts/:id` restituisce anche i **tag associati** grazie a una `JOIN` tra `posts` e `tags`

---

## 🧱 Struttura del progetto

```
.
├── app.js                     # Entry point
├── config/
│   └── db.js                  # Configurazione connessione MySQL
├── routers/
│   └── posts.js               # Definizione delle rotte
├── controllers/
│   └── postsController.js     # Funzioni logiche (CRUD + SQL)
├── middlewares/
│   └── checkError.js          # Middleware personalizzato
├── public/                    # File statici
├── package.json
└── .gitignore
```

---

## 🧩 Middleware utilizzati

- `express.json()` → parsing del body JSON
- `checkError.js` → middleware personalizzato (es. logger)
- Middleware 404 → risposta JSON se rotta non trovata
- Middleware 500 → gestione errori interni (`err.stack`)

---

## 🧪 Test consigliati (con Postman)

- `GET /posts`
- `POST /posts` 
- `GET /posts/:id` 

- `PUT /posts/:id`
- `PATCH /posts/:id`
- `DELETE /posts/:id`
- Rotta di errore: `GET /errore-test`

---

## 📜 Script utili

- `npm install` → installa le dipendenze
- `npm start` → avvia il server
- `npm run dev` → avvia il server in modalità sviluppo con `--watch`

---

## 📦 Requisiti

- Node.js (v18+)
- Express
- MySQL (Workbench o CLI)

---

## 👨‍💻 Autore

**Fabio Bianco**  
Sviluppato per scopo didattico e presentazione a colloqui tecnici.
