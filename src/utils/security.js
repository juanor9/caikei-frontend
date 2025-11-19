/**
 * Security Utilities
 * Provides security-focused functions for the application
 */

// =============================================================================
// XSS Prevention
// =============================================================================

/**
 * Sanitize HTML string to prevent XSS attacks
 * @param {string} str - String to sanitize
 * @returns {string} - Sanitized string
 */
export const sanitizeHTML = (str) => {
  if (typeof str !== 'string') return '';

  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;',
  };

  return str.replace(/[&<>"'`=/]/g, (char) => map[char]);
};

/**
 * Sanitize object values recursively
 * @param {Object} obj - Object to sanitize
 * @returns {Object} - Sanitized object
 */
export const sanitizeObject = (obj) => {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === 'string') return sanitizeHTML(obj);
  if (typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  }

  const sanitized = {};
  Object.keys(obj).forEach((key) => {
    sanitized[key] = sanitizeObject(obj[key]);
  });
  return sanitized;
};

/**
 * Strip all HTML tags from string
 * @param {string} str - String to strip
 * @returns {string} - String without HTML tags
 */
export const stripHTML = (str) => {
  if (typeof str !== 'string') return '';
  return str.replace(/<[^>]*>/g, '');
};

// =============================================================================
// Input Validation
// =============================================================================

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Is valid email
 */
export const isValidEmail = (email) => {
  if (typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} - Validation result with score and messages
 */
export const validatePassword = (password) => {
  const result = {
    isValid: false,
    score: 0,
    messages: [],
  };

  if (typeof password !== 'string') {
    result.messages.push('La contraseña debe ser un texto');
    return result;
  }

  if (password.length < 8) {
    result.messages.push('La contraseña debe tener al menos 8 caracteres');
  } else {
    result.score += 1;
  }

  if (!/[A-Z]/.test(password)) {
    result.messages.push('Debe incluir al menos una letra mayúscula');
  } else {
    result.score += 1;
  }

  if (!/[a-z]/.test(password)) {
    result.messages.push('Debe incluir al menos una letra minúscula');
  } else {
    result.score += 1;
  }

  if (!/[0-9]/.test(password)) {
    result.messages.push('Debe incluir al menos un número');
  } else {
    result.score += 1;
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    result.messages.push('Debe incluir al menos un carácter especial');
  } else {
    result.score += 1;
  }

  result.isValid = result.score >= 4;
  return result;
};

/**
 * Validate ISBN format
 * @param {string} isbn - ISBN to validate
 * @returns {boolean} - Is valid ISBN
 */
export const isValidISBN = (isbn) => {
  if (typeof isbn !== 'string') return false;
  const cleanISBN = isbn.replace(/[-\s]/g, '');
  // ISBN-10 or ISBN-13
  return /^(\d{10}|\d{13})$/.test(cleanISBN);
};

/**
 * Validate phone number format (Colombian)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - Is valid phone
 */
export const isValidPhone = (phone) => {
  if (typeof phone !== 'string') return false;
  const cleanPhone = phone.replace(/[\s()-]/g, '');
  // Colombian phone format
  return /^(\+57)?[1-9]\d{9}$/.test(cleanPhone);
};

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} - Is valid URL
 */
export const isValidURL = (url) => {
  if (typeof url !== 'string') return false;
  try {
    const parsedUrl = new URL(url);
    return ['http:', 'https:'].includes(parsedUrl.protocol);
  } catch {
    return false;
  }
};

// =============================================================================
// Secure Storage
// =============================================================================

const TOKEN_KEY = 'userToken';
const TOKEN_EXPIRY_KEY = 'tokenExpiry';
const SESSION_TIMEOUT = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Securely store authentication token
 * @param {string} token - Token to store
 * @param {number} expiryMs - Token expiry time in milliseconds
 */
export const secureSetToken = (token, expiryMs = SESSION_TIMEOUT) => {
  if (!token || typeof token !== 'string') return;

  const expiry = Date.now() + expiryMs;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(TOKEN_EXPIRY_KEY, expiry.toString());
};

/**
 * Clear authentication token
 */
export const secureClearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXPIRY_KEY);
};

/**
 * Securely retrieve authentication token
 * @returns {string|null} - Token or null if expired/not found
 */
export const secureGetToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);

  if (!token || !expiry) return null;

  const expiryTime = parseInt(expiry, 10);
  if (Date.now() > expiryTime) {
    // Token expired, clear it
    secureClearToken();
    return null;
  }

  return token;
};

/**
 * Check if token is expired
 * @returns {boolean} - Is token expired
 */
export const isTokenExpired = () => {
  const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
  if (!expiry) return true;

  const expiryTime = parseInt(expiry, 10);
  return Date.now() > expiryTime;
};

/**
 * Refresh token expiry time
 */
export const refreshTokenExpiry = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    const newExpiry = Date.now() + SESSION_TIMEOUT;
    localStorage.setItem(TOKEN_EXPIRY_KEY, newExpiry.toString());
  }
};

// =============================================================================
// CSRF Protection
// =============================================================================

/**
 * Generate CSRF token
 * @returns {string} - CSRF token
 */
export const generateCSRFToken = () => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Store CSRF token in session
 */
export const setCSRFToken = () => {
  const token = generateCSRFToken();
  sessionStorage.setItem('csrfToken', token);
  return token;
};

/**
 * Get CSRF token from session
 * @returns {string|null} - CSRF token
 */
export const getCSRFToken = () => sessionStorage.getItem('csrfToken');

// =============================================================================
// Rate Limiting (Client-side awareness)
// =============================================================================

const requestCounts = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 100;

/**
 * Check if request should be rate limited
 * @param {string} endpoint - API endpoint
 * @returns {boolean} - Should rate limit
 */
export const shouldRateLimit = (endpoint) => {
  const now = Date.now();
  const key = endpoint;

  if (!requestCounts.has(key)) {
    requestCounts.set(key, { count: 1, windowStart: now });
    return false;
  }

  const data = requestCounts.get(key);

  // Reset window if expired
  if (now - data.windowStart > RATE_LIMIT_WINDOW) {
    requestCounts.set(key, { count: 1, windowStart: now });
    return false;
  }

  // Increment count
  data.count += 1;

  // Check if over limit
  if (data.count > MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  return false;
};

/**
 * Reset rate limit for endpoint
 * @param {string} endpoint - API endpoint
 */
export const resetRateLimit = (endpoint) => {
  requestCounts.delete(endpoint);
};

// =============================================================================
// Content Security
// =============================================================================

/**
 * Validate file type for upload
 * @param {File} file - File to validate
 * @param {Array} allowedTypes - Allowed MIME types
 * @returns {boolean} - Is valid file type
 */
export const isValidFileType = (file, allowedTypes = ['image/jpeg', 'image/png', 'image/gif']) => {
  if (!file || !file.type) return false;
  return allowedTypes.includes(file.type);
};

/**
 * Validate file size
 * @param {File} file - File to validate
 * @param {number} maxSizeMB - Maximum size in MB
 * @returns {boolean} - Is valid file size
 */
export const isValidFileSize = (file, maxSizeMB = 5) => {
  if (!file || !file.size) return false;
  const maxBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxBytes;
};

/**
 * Sanitize filename
 * @param {string} filename - Filename to sanitize
 * @returns {string} - Sanitized filename
 */
export const sanitizeFilename = (filename) => {
  if (typeof filename !== 'string') return '';
  // Remove path traversal attempts and special characters
  return filename
    .replace(/\.\./g, '')
    .replace(/[/\\]/g, '')
    .replace(/[^a-zA-Z0-9.-]/g, '_');
};

// =============================================================================
// Data Masking
// =============================================================================

/**
 * Mask email address
 * @param {string} email - Email to mask
 * @returns {string} - Masked email
 */
export const maskEmail = (email) => {
  if (typeof email !== 'string' || !email.includes('@')) return email;

  const [localPart, domain] = email.split('@');
  const maskedLocal = localPart.length > 2
    ? `${localPart[0]}${'*'.repeat(localPart.length - 2)}${localPart[localPart.length - 1]}`
    : '*'.repeat(localPart.length);

  return `${maskedLocal}@${domain}`;
};

/**
 * Mask phone number
 * @param {string} phone - Phone to mask
 * @returns {string} - Masked phone
 */
export const maskPhone = (phone) => {
  if (typeof phone !== 'string') return phone;
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 4) return phone;

  return `${'*'.repeat(digits.length - 4)}${digits.slice(-4)}`;
};

/**
 * Mask credit card number
 * @param {string} cardNumber - Card number to mask
 * @returns {string} - Masked card number
 */
export const maskCardNumber = (cardNumber) => {
  if (typeof cardNumber !== 'string') return cardNumber;
  const digits = cardNumber.replace(/\D/g, '');
  if (digits.length < 4) return cardNumber;

  return `${'*'.repeat(digits.length - 4)}${digits.slice(-4)}`;
};

// =============================================================================
// Security Headers Check
// =============================================================================

/**
 * Check if running in secure context (HTTPS)
 * @returns {boolean} - Is secure context
 */
export const isSecureContext = () => {
  if (typeof window === 'undefined') return false;
  return window.isSecureContext || window.location.protocol === 'https:';
};

/**
 * Log security warning if not in secure context
 */
export const warnIfInsecure = () => {
  if (!isSecureContext() && process.env.NODE_ENV === 'production') {
    // eslint-disable-next-line no-console
    console.warn(
      'Security Warning: Application is not running in a secure context (HTTPS). '
      + 'Some security features may not be available.',
    );
  }
};

export default {
  // XSS Prevention
  sanitizeHTML,
  sanitizeObject,
  stripHTML,
  // Input Validation
  isValidEmail,
  validatePassword,
  isValidISBN,
  isValidPhone,
  isValidURL,
  // Secure Storage
  secureSetToken,
  secureGetToken,
  secureClearToken,
  isTokenExpired,
  refreshTokenExpiry,
  // CSRF Protection
  generateCSRFToken,
  setCSRFToken,
  getCSRFToken,
  // Rate Limiting
  shouldRateLimit,
  resetRateLimit,
  // Content Security
  isValidFileType,
  isValidFileSize,
  sanitizeFilename,
  // Data Masking
  maskEmail,
  maskPhone,
  maskCardNumber,
  // Security Checks
  isSecureContext,
  warnIfInsecure,
};
