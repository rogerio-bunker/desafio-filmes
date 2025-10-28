import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  getFavorites,
  removeFavorite,
  shareFavorites,
} from "../api.js";
import "../App.css";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [shareInfo, setShareInfo] = useState(null); // { shareId, url }

  useEffect(() => {
    (async () => {
      const favs = await getFavorites();
      setFavorites(favs);
      window.scrollTo({ top: 0, behavior: "smooth" });
    })();
  }, []);

  async function handleRemove(id) {
    const resp = await removeFavorite(id);
    setFavorites(resp.favoritos);
  }

  async function handleShare() {
    if (favorites.length === 0) return;
    const resp = await shareFavorites(favorites);
    setShareInfo(resp); // { shareId, url }
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
            <NavLink to="/" className="nav-link">
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
        <section className="block">
          <div className="favorites-header">
            <h2 className="section-title">Meus Favoritos</h2>

            <button
              className="btn-ghost"
              disabled={favorites.length === 0}
              onClick={handleShare}
              style={
                favorites.length === 0
                  ? { opacity: 0.4, cursor: "not-allowed" }
                  : {}
              }
            >
              🔗 Compartilhar lista
            </button>
          </div>

          {favorites.length === 0 && (
            <p className="info-text">
              Você ainda não adicionou nenhum filme aos favoritos.
            </p>
          )}

          {favorites.length > 0 && (
            <div
              className={
                favorites.length === 1
                  ? "movies-grid single"
                  : "movies-grid"
              }
            >
              {favorites.map((f) => (
                <div
                  key={f.id}
                  className={
                    favorites.length === 1
                      ? "movie-card single"
                      : "movie-card"
                  }
                >
                  {f.poster && (
                    <div className="poster-wrapper">
                      <img src={f.poster} alt={f.titulo} />
                      <span className="badge-vote">
                        ⭐ {f.nota?.toFixed ? f.nota.toFixed(1) : f.nota}
                      </span>
                    </div>
                  )}

                  <div className="movie-info">
                    <h3 className="movie-title">{f.titulo}</h3>
                    {f.overview && (
                      <p className="movie-overview">{f.overview}</p>
                    )}

                    <button
                      className="btn-danger"
                      onClick={() => handleRemove(f.id)}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {shareInfo && (
            <div className="share-box" style={{ marginTop: "24px" }}>
              <p className="share-label">Sua lista foi compartilhada!</p>
              <p className="info-text">
                Envie este link para outra pessoa visualizar:
              </p>
              <a
                className="share-url"
                href={shareInfo.url.replace(
                  "http://localhost:3000/shared/",
                  "http://localhost:5173/shared/"
                )}
              >
                {shareInfo.url.replace(
                  "http://localhost:3000/shared/",
                  "http://localhost:5173/shared/"
                )}
              </a>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
