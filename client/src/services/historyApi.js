const API_URL = import.meta.env.VITE_API_URL;

// ==============================
// Helper
// ==============================
const fetchJson = async (url, options = {}) => {
  const response = await fetch(url, options);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

// ==============================
// Add History
// ==============================
export const addHistory = async (city, country, temperature) => {
  const response = await fetchJson(`${API_URL}/history`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      city,
      country,
      temperature,
    }),
  });

  return response.data;
};

// ==============================
// Get All History
// ==============================
export const getHistory = async () => {
  const response = await fetchJson(`${API_URL}/history`);
  return response.data;
};

// ==============================
// Delete One History
// ==============================
export const deleteHistory = async (id) => {
  const response = await fetchJson(`${API_URL}/history/${id}`, {
    method: "DELETE",
  });

  return response;
};

// ==============================
// Clear All History
// ==============================
export const clearHistory = async () => {
  const response = await fetchJson(`${API_URL}/history`, {
    method: "DELETE",
  });

  return response;
};