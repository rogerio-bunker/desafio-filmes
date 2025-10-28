const API_BASE = "http://localhost:3000";

// Busca filmes (agora via backend)
export async function searchMovies(query) {
  if (!query || !query.trim()) return [];
  const resp = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}`);
  if (!resp.ok) {
    console.error("Erro ao buscar filmes:", resp.status);
    return [];
  }
  return resp.json();
}

// Favoritos
export async function getFavorites() {
  const resp = await fetch(`${API_BASE}/favorites`);
  if (!resp.ok) {
    console.error("Erro ao buscar favoritos:", resp.status);
    return [];
  }
  return resp.json();
}

export async function addFavorite(movie) {
  const resp = await fetch(`${API_BASE}/favorites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ movie }),
  });
  return resp.json(); // deve retornar { favoritos: [...] }
}

export async function removeFavorite(id) {
  const resp = await fetch(`${API_BASE}/favorites/${id}`, {
    method: "DELETE",
  });
  return resp.json();
}

// Compartilhar lista
export async function shareFavorites(movies) {
  const resp = await fetch(`${API_BASE}/share`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ movies }),
  });
  return resp.json(); // { shareId, url }
}

export async function getSharedList(shareId) {
  const resp = await fetch(`${API_BASE}/shared/${shareId}`);
  if (!resp.ok) {
    throw new Error("Lista não encontrada");
  }
  return resp.json();
}
