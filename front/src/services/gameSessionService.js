export const fetchGameSessions = async (token) => {
  const response = await fetch("http://localhost:5000/api/gamesessions", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  if (!response.ok) throw new Error("Oyun geçmişi alınamadı.");
  return await response.json();
};

export const fetchGameSessionById = async (id, token) => {
  const response = await fetch(`http://localhost:5000/api/gamesessions/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  if (!response.ok) throw new Error("Oyun detayı alınamadı.");
  return await response.json();
};