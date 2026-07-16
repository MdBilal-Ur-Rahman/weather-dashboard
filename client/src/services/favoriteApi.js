const API_URL = import.meta.env.VITE_API_URL;

// ==============================
// Helper
// ==============================
const fetchJson = async (url, options = {}) => {
  const response = await fetch(url, options);

  const data = await response.json();

  // Agar backend duplicate city ko success ke saath return kare
  if (!response.ok && !data.success) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

// ==============================
// Get Favorites
// ==============================
export const getFavorites = async () => {
  const res = await fetchJson(`${API_URL}/favorites`);
  return res.data;
};

// ==============================
// Add Favorite
// ==============================
export const addFavorite = async (city, country = "") => {
  const res = await fetchJson(`${API_URL}/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      city,
      country,
    }),
  });

  return res.data;
};

// ==============================
// Delete Favorite
// ==============================
export const deleteFavorite = async (id) => {
  const res = await fetchJson(`${API_URL}/favorites/${id}`, {
    method: "DELETE",
  });

  return res;
};