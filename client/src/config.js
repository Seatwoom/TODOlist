export const API_BASE_URL = "http://localhost:5000";
export const CAT_API_URL = "https://api.thecatapi.com/v1";
export const SESSION_TIMEOUT = 300000;
export const RESET_SESSION = () => {
  window.dispatchEvent(new CustomEvent("resetSession"));
};
