import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();

// Render (e serviços cloud em geral) definem a porta via env
const PORT = process.env.PORT || 3000;

// usa variável de ambiente se existir, senão fallback para sua chave
const TMDB_API_KEY = process.env.TMDB_API_KEY || "17e5f0785f7fbd2795d09d69daccc321";

const TMDB_BASE = "https://api.themoviedb.org/3";
const TMDB_IMG = "https://image.tmdb.org/t/p/w500";

app.use(cors());
app.use(express.json());

// "banco" em memória
let favorites = [];     // filmes favoritados
let sharedLists = {};   // { shareId: [listaDeFilmes] }

// rota raiz só pra health check
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Desafio Filmes backend está rodando 🚀",
    endpoints: {
      search: "/search?q=matrix",
      favorites_get: "/favorites",
      favorites_post: "/favorites",
      favorites_delete: "/favorites/:id",
      share_post: "/share",
      shared_get: "/shared/:id"
    }
  });
});

// util de normalização
function normalizeMovie(m) {
  return {
    id: m.id,
    titulo: m.title,
    nota: m.vote_average ?? 0,
    overview: m.overview ?? "",
    poster: m.poster_path ? `${TMDB_IMG}${m.poster_path}` : null,
  };
}

// GET /search?q=batman
app.get("/search", async (req, res) => {
  const q = req.query.q;
  if (!q || !q.trim()) {
    return res.json([]);
  }

  try {
    const url = `${TMDB_BASE}/search/movie?api_key=${TMDB_API_KEY}&language=pt-BR&query=${encodeURIComponent(
      q.trim()
    )}`;

    const tmdbResp = await axios.get(url);
    const results = tmdbResp.data.results || [];

    const movies = results.map(normalizeMovie);
    return res.json(movies);
  } catch (err) {
    console.error("Erro TMDb /search:", err.message);
    return res.status(500).json({ error: "Erro ao buscar filmes" });
  }
});

// GET /favorites
app.get("/favorites", (req, res) => {
  return res.json(favorites);
});

// POST /favorites { movie }
app.post("/favorites", (req, res) => {
  const movie = req.body.movie;
  if (!movie || !movie.id) {
    return res.status(400).json({ error: "Filme inválido" });
  }

  const exists = favorites.find((m) => m.id === movie.id);
  if (!exists) {
    favorites.push(movie);
  }

  return res.json({ favoritos: favorites });
});

// DELETE /favorites/:id
app.delete("/favorites/:id", (req, res) => {
  const id = req.params.id;
  favorites = favorites.filter((m) => String(m.id) !== String(id));
  return res.json({ favoritos: favorites });
});

// POST /share { movies }
app.post("/share", (req, res) => {
  const movies = req.body.movies;
  if (!Array.isArray(movies)) {
    return res.status(400).json({ error: "Lista inválida" });
  }

  const shareId = Math.random().toString(36).slice(2, 8);
  sharedLists[shareId] = movies;

  return res.json({
    shareId,
    url: `https://desafio-filmes-backend.onrender.com/shared/${shareId}`
  });
});

// GET /shared/:id
app.get("/shared/:id", (req, res) => {
  const { id } = req.params;
  const list = sharedLists[id];

  if (!list) {
    return res.status(404).json({ error: "Lista não encontrada" });
  }

  return res.json(list);
});

app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}`);
});
