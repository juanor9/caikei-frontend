/**
 * Centralized API Client
 * Applies DIP (Dependency Inversion Principle) - abstracts fetch configuration
 */

const BASE_URL = process.env.REACT_APP_BASE_URL;

/**
 * Get authentication token from localStorage
 * @returns {string|null} The authentication token
 */
export const getAuthToken = () => localStorage.getItem('login-token');

/**
 * Set authentication token in localStorage
 * @param {string} token - The token to store
 */
export const setAuthToken = (token) => {
  localStorage.clear();
  localStorage.setItem('login-token', token);
};

/**
 * Clear authentication token from localStorage
 */
export const clearAuthToken = () => {
  localStorage.removeItem('login-token');
};

/**
 * Build request options with authentication
 * @param {string} method - HTTP method
 * @param {string} token - Auth token
 * @param {Object} body - Request body (optional)
 * @returns {Object} Fetch options
 */
const buildOptions = (method, token, body = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  return options;
};

/**
 * Make an API request
 * @param {string} endpoint - API endpoint (without base URL)
 * @param {Object} config - Request configuration
 * @param {string} config.method - HTTP method (GET, POST, PATCH, DELETE)
 * @param {string} config.token - Authentication token
 * @param {Object} config.body - Request body
 * @returns {Promise<Object>} Response data
 */
export const apiRequest = async (endpoint, { method = 'GET', token = null, body = null } = {}) => {
  const options = buildOptions(method, token, body);
  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  return response.json();
};

/**
 * Build query string from object
 * @param {Object} params - Query parameters
 * @returns {string} Query string
 */
export const buildQueryString = (params) => {
  const uriParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      uriParams.append(key, value);
    }
  });
  return uriParams.toString();
};

// Convenience methods
export const apiGet = (endpoint, token) => apiRequest(endpoint, { method: 'GET', token });

export const apiPost = (endpoint, token, body) => apiRequest(endpoint, { method: 'POST', token, body });

export const apiPatch = (endpoint, token, body) => apiRequest(endpoint, { method: 'PATCH', token, body });

export const apiDelete = (endpoint, token) => apiRequest(endpoint, { method: 'DELETE', token });

export default {
  getAuthToken,
  setAuthToken,
  clearAuthToken,
  apiRequest,
  buildQueryString,
  apiGet,
  apiPost,
  apiPatch,
  apiDelete,
};
