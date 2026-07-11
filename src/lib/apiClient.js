const DEFAULT_API_BASE_URL = import.meta.env.PROD
  ? "https://odinbook-server-production-a812.up.railway.app"
  : "http://localhost:3000";

export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/$/, "");

export function apiUrl(path) {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function apiRequest(path, options = {}) {
  return fetch(apiUrl(path), {
    credentials: "include",
    ...options,
  });
}

export async function apiFetch(path, options = {}) {
  const headers = options.body instanceof FormData
    ? options.headers
    : {
        "Content-Type": "application/json",
        ...options.headers,
      };

  const response = await apiRequest(path, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = new Error(`Request failed with status ${response.status}`);
    error.status = response.status;
    throw error;
  }

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return null;
  }

  return response.json();
}
