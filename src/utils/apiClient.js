/**
 * Centralized API Client
 * Applies DIP (Dependency Inversion Principle) - abstracts fetch configuration
 * Enhanced with security features
 */

import {
  sanitizeObject,
  shouldRateLimit,
  getCSRFToken,
  secureGetToken,
  secureSetToken,
  secureClearToken,
} from './security';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const DEFAULT_TIMEOUT = 30000; // 30 seconds

// =============================================================================
// Token Management
// =============================================================================

/**
 * Get authentication token from localStorage
 * @returns {string|null} The authentication token
 */
export const getAuthToken = () => {
  // Try secure token first, fall back to legacy token
  const secureToken = secureGetToken();
  if (secureToken) return secureToken;

  // Legacy support
  return localStorage.getItem('login-token');
};

/**
 * Set authentication token in localStorage
 * @param {string} token - The token to store
 */
export const setAuthToken = (token) => {
  if (!token || typeof token !== 'string') return;

  // Clear old data
  localStorage.clear();

  // Store with expiry using secure method
  secureSetToken(token);

  // Also store in legacy format for backward compatibility
  localStorage.setItem('login-token', token);
};

/**
 * Clear authentication token from localStorage
 */
export const clearAuthToken = () => {
  secureClearToken();
  localStorage.removeItem('login-token');
};

// =============================================================================
// Request Building
// =============================================================================

/**
 * Build request options with authentication and security headers
 * @param {string} method - HTTP method
 * @param {string} token - Auth token
 * @param {Object} body - Request body (optional)
 * @returns {Object} Fetch options
 */
const buildOptions = (method, token, body = null) => {
  const csrfToken = getCSRFToken();

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest', // CSRF protection
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(csrfToken && { 'X-CSRF-Token': csrfToken }),
    },
    credentials: 'same-origin', // Include cookies for same-origin requests
  };

  if (body) {
    // Sanitize body data before sending
    const sanitizedBody = sanitizeObject(body);
    options.body = JSON.stringify(sanitizedBody);
  }

  return options;
};

// =============================================================================
// API Request with Security Features
// =============================================================================

/**
 * Make an API request with security features
 * @param {string} endpoint - API endpoint (without base URL)
 * @param {Object} config - Request configuration
 * @param {string} config.method - HTTP method (GET, POST, PATCH, DELETE)
 * @param {string} config.token - Authentication token
 * @param {Object} config.body - Request body
 * @param {number} config.timeout - Request timeout in ms
 * @param {boolean} config.skipRateLimit - Skip rate limit check
 * @returns {Promise<Object>} Response data
 */
export const apiRequest = async (
  endpoint,
  {
    method = 'GET',
    token = null,
    body = null,
    timeout = DEFAULT_TIMEOUT,
    skipRateLimit = false,
  } = {},
) => {
  // Check rate limiting
  if (!skipRateLimit && shouldRateLimit(endpoint)) {
    return {
      error: true,
      message: 'Demasiadas solicitudes. Por favor, espere un momento.',
      code: 'RATE_LIMITED',
    };
  }

  // Validate endpoint
  if (!endpoint || typeof endpoint !== 'string') {
    return {
      error: true,
      message: 'Endpoint inválido',
      code: 'INVALID_ENDPOINT',
    };
  }

  // Ensure endpoint starts with /
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  const options = buildOptions(method, token, body);

  // Create abort controller for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(`${BASE_URL}${normalizedEndpoint}`, {
      ...options,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Handle different response status codes
    if (response.status === 401) {
      // Unauthorized - clear token and redirect to login
      clearAuthToken();
      return {
        error: true,
        message: 'Sesión expirada. Por favor, inicie sesión nuevamente.',
        code: 'UNAUTHORIZED',
      };
    }

    if (response.status === 403) {
      return {
        error: true,
        message: 'No tiene permisos para realizar esta acción.',
        code: 'FORBIDDEN',
      };
    }

    if (response.status === 429) {
      return {
        error: true,
        message: 'Demasiadas solicitudes. Por favor, espere un momento.',
        code: 'RATE_LIMITED',
      };
    }

    if (response.status >= 500) {
      return {
        error: true,
        message: 'Error del servidor. Por favor, intente más tarde.',
        code: 'SERVER_ERROR',
      };
    }

    // Parse JSON response
    const data = await response.json();

    // Check for API-level errors
    if (!response.ok) {
      return {
        error: true,
        message: data.message || 'Error en la solicitud',
        code: data.code || 'REQUEST_ERROR',
        ...data,
      };
    }

    return data;
  } catch (error) {
    clearTimeout(timeoutId);

    // Handle specific error types
    if (error.name === 'AbortError') {
      return {
        error: true,
        message: 'La solicitud tardó demasiado. Por favor, intente nuevamente.',
        code: 'TIMEOUT',
      };
    }

    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      return {
        error: true,
        message: 'Error de conexión. Verifique su conexión a internet.',
        code: 'NETWORK_ERROR',
      };
    }

    return {
      error: true,
      message: 'Error inesperado. Por favor, intente nuevamente.',
      code: 'UNKNOWN_ERROR',
    };
  }
};

// =============================================================================
// Query String Builder
// =============================================================================

/**
 * Build query string from object (with XSS prevention)
 * @param {Object} params - Query parameters
 * @returns {string} Query string
 */
export const buildQueryString = (params) => {
  const uriParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      // Encode value to prevent injection
      const encodedValue = encodeURIComponent(String(value));
      uriParams.append(key, encodedValue);
    }
  });

  return uriParams.toString();
};

// =============================================================================
// Convenience Methods
// =============================================================================

export const apiGet = (endpoint, token, options = {}) => apiRequest(endpoint, {
  method: 'GET',
  token,
  ...options,
});

export const apiPost = (endpoint, token, body, options = {}) => apiRequest(endpoint, {
  method: 'POST',
  token,
  body,
  ...options,
});

export const apiPatch = (endpoint, token, body, options = {}) => apiRequest(endpoint, {
  method: 'PATCH',
  token,
  body,
  ...options,
});

export const apiDelete = (endpoint, token, options = {}) => apiRequest(endpoint, {
  method: 'DELETE',
  token,
  ...options,
});

export const apiPut = (endpoint, token, body, options = {}) => apiRequest(endpoint, {
  method: 'PUT',
  token,
  body,
  ...options,
});

// =============================================================================
// Secure File Upload
// =============================================================================

/**
 * Upload file securely
 * @param {string} endpoint - Upload endpoint
 * @param {string} token - Auth token
 * @param {File} file - File to upload
 * @param {Object} additionalData - Additional form data
 * @returns {Promise<Object>} Response data
 */
export const apiUpload = async (endpoint, token, file, additionalData = {}) => {
  if (!file) {
    return {
      error: true,
      message: 'No se proporcionó ningún archivo',
      code: 'NO_FILE',
    };
  }

  const formData = new FormData();
  formData.append('file', file);

  // Add additional data
  Object.entries(additionalData).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const csrfToken = getCSRFToken();

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(csrfToken && { 'X-CSRF-Token': csrfToken }),
      },
      credentials: 'same-origin',
      body: formData,
    });

    return response.json();
  } catch (error) {
    return {
      error: true,
      message: 'Error al subir el archivo',
      code: 'UPLOAD_ERROR',
    };
  }
};

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
  apiPut,
  apiUpload,
};
