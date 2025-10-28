import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { getSharedList } from "../api.js";
import "../App.css";

export default function SharedList() {
  const { shareId } = useParams();
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState("loading"); // "loading" | "ok" | "error"

  useEffect(() => {
    async function load() {
      try {
        const data = await getSharedList(shareId);
        setMovies(data);
        setStatus("ok");
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    }
    load();
  }, [shareId]);

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
            <NavLink to="/" className="nav-link">Buscar</NavLink>
            <span className="divider">•</span>
            <NavLink to="/favorites" className="nav-link">Favoritos</NavLink>
          </nav>
        </div>
      </header>

      <main className="content-area">
        <section className="block">
          <div className="favorites-header">
            <h2 className="section-title">
              Lista compartilhada
            </h2>
            <small className="info-text" style={{ opacity: 0.8 }}>
              ID: {shareId}
            </small>
          </div>

          {status === "loading" && (
            <p className="info-text">Carregando lista...</p>
          )}

          {status === "error" && (
            <p className="info-text">
              Não foi possível carregar essa lista. Talvez o link esteja
              incorreto ou expirado.
            </p>
          )}

          {status === "ok" && movies.length === 0 && (
            <p className="info-text">
              Esta lista compartilhada está vazia.
            </p>
          )}

          {status === "ok" && movies.length > 0 && (
            <div
              className={
                movies.length === 1
                  ? "movies-grid single"
                  : "movies-grid"
              }
            >
              {movies.map((m) => (
                <div
                  key={m.id}
                  className={
                    movies.length === 1
                      ? "movie-card single"
                      : "movie-card"
                  }
                >
                  {m.poster && (
                    <div className="poster-wrapper">
                      <img src={m.poster} alt={m.titulo} />
                      <span className="badge-vote">
                        ⭐ {m.nota?.toFixed ? m.nota.toFixed(1) : m.nota}
                      </span>
                    </div>
                  )}
                  <div className="movie-info">
                    <h3 className="movie-title">{m.titulo}</h3>
                    {m.overview && (
                      <p className="movie-overview">{m.overview}</p>
                    )}
                    {/* Aqui não tem botão de favoritar/remover.
                        É somente visual. */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
