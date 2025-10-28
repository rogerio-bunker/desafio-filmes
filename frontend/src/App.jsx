import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  searchMovies,
  getFavorites,
  addFavorite,
  removeFavorite,
} from "./api.js";
import "./App.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    (async () => {
      const favs = await getFavorites();
      setFavorites(favs);
    })();
  }, []);

  const isFavorite = (id) => favorites.some((m) => m.id === id);

  async function handleSearch(e) {
    e.preventDefault();
    const term = query.trim();
    if (!term) return;
    setLoading(true);
    const results = await searchMovies(term);
    setMovies(results);
    setLoading(false);
    setHasSearched(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function backToStart() {
    setQuery("");
    setMovies([]);
    setHasSearched(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleAddFavorite(movie) {
    const resp = await addFavorite(movie);
    setFavorites(resp.favoritos);
  }

  async function handleRemoveFavorite(id) {
    const resp = await removeFavorite(id);
    setFavorites(resp.favoritos);
  }

  return (
    <div className="page-wrapper">
      {/* HEADER */}
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <span className="logo-mark">🎬</span>
            <span className="brand-text">MovieList</span>
          </div>
          <nav className="nav-links">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link${isActive ? " active" : ""}`
              }
            >
              Buscar
            </NavLink>
            <span className="divider">•</span>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `nav-link${isActive ? " active" : ""}`
              }
            >
              Favoritos
            </NavLink>
          </nav>
        </div>
      </header>

      {/* CONTEÚDO */}
      <main className="content-area">
        {/* HERO INICIAL */}
        {!hasSearched && movies.length === 0 && (
          <section className="hero-section">
            <div className="hero-card">
              <h1 className="hero-title">Encontre seu próximo filme</h1>
              <p className="hero-subtitle">
                Pesquise pelo título e veja a nota do TMDb.
              </p>

              <form onSubmit={handleSearch} className="search-bar hero-search">
                <input
                  className="input-text"
                  type="text"
                  placeholder="Ex.: Matrix, Batman..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                />
                <button className="btn-primary" type="submit">
                  Buscar
                </button>
              </form>
            </div>
        </section>
        )}

        {/* RESULTADOS */}
        {hasSearched && (
          <section className="block">
            <div className="results-header">
              <h2 className="section-title">Resultados</h2>
              <button className="btn-ghost" onClick={backToStart}>
                ← Voltar ao início da pesquisa
              </button>
            </div>

            {loading && <p className="info-text">Carregando...</p>}

            {!loading && movies.length === 0 && (
              <p className="info-text">
                Nenhum filme encontrado para “{query}”.
              </p>
            )}

            <div className="movies-grid">
              {movies.map((m) => (
                <div
                  key={m.id}
                  className="movie-card"
                >
                  {m.poster && (
                    <div className="poster-wrapper">
                      <img src={m.poster} alt={m.titulo} />
                      <span className="badge-vote">
                        ⭐ {m.nota.toFixed(1)}
                      </span>
                    </div>
                  )}

                  <div className="movie-info">
                    <h3 className="movie-title">{m.titulo}</h3>
                    {m.overview && (
                      <p className="movie-overview">{m.overview}</p>
                    )}

                    {isFavorite(m.id) ? (
                      <button
                        className="btn-danger"
                        onClick={() => handleRemoveFavorite(m.id)}
                      >
                        Remover dos favoritos
                      </button>
                    ) : (
                      <button
                        className="btn-secondary"
                        onClick={() => handleAddFavorite(m)}
                      >
                        Favoritar
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
