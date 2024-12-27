import { API_BASE_URL, CAT_API_URL } from "../config";

export const fetchCatsFromAPI = async () => {
  const response = await fetch(
    `${CAT_API_URL}/images/search?limit=10&api_key=YOUR_API_KEY`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch cats from API");
  }
  return await response.json();
};

export const loadCatsFromServer = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/api/cats`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });

  const text = await response.text();
  console.log("Server response:", text);

  try {
    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error("Failed to parse response:", error);
    throw new Error("Failed to parse JSON response");
  }
};

export const saveCatsToServer = async (cats) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/api/cats`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify({ cats }),
  });
  if (!response.ok) {
    throw new Error("Failed to save cats");
  }
  return await response.json();
};
