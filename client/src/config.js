const API_BASE_URL = 'http://localhost:5000';
const CAT_API_URL = 'https://api.thecatapi.com/v1';
const SESSION_TIMEOUT = 300000;

const RESET_SESSION = () => {
  window.dispatchEvent(new CustomEvent('resetSession'));
};

module.exports = {
  API_BASE_URL,
  CAT_API_URL,
  SESSION_TIMEOUT,
  RESET_SESSION,
};
