/**
 * useSecurity Hook
 * Provides security-related functionality for React components
 */
import { useEffect, useCallback } from 'react';
import {
  warnIfInsecure,
  setCSRFToken,
  refreshTokenExpiry,
  isTokenExpired,
  secureClearToken,
} from '../utils/security';
import { clearAuthToken } from '../utils/apiClient';

/**
 * Hook for security features in React components
 * @returns {Object} Security utilities
 */
const useSecurity = () => {
  // Check secure context on mount
  useEffect(() => {
    warnIfInsecure();

    // Initialize CSRF token
    setCSRFToken();

    // Set up activity listener for token refresh
    const handleActivity = () => {
      if (!isTokenExpired()) {
        refreshTokenExpiry();
      }
    };

    // Listen for user activity to refresh token
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach((event) => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    // Cleanup
    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, []);

  // Check if session is expired
  const checkSession = useCallback(() => {
    if (isTokenExpired()) {
      clearAuthToken();
      secureClearToken();
      return false;
    }
    return true;
  }, []);

  // Logout securely
  const secureLogout = useCallback(() => {
    clearAuthToken();
    secureClearToken();
    sessionStorage.clear();

    // Redirect to login
    window.location.href = '/login';
  }, []);

  // Force refresh on inactivity
  const setupInactivityTimeout = useCallback((timeoutMs = 30 * 60 * 1000) => {
    let inactivityTimer;

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        secureLogout();
      }, timeoutMs);
    };

    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach((event) => {
      window.addEventListener(event, resetTimer, { passive: true });
    });

    resetTimer();

    return () => {
      clearTimeout(inactivityTimer);
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [secureLogout]);

  return {
    checkSession,
    secureLogout,
    setupInactivityTimeout,
    isTokenExpired,
  };
};

export default useSecurity;
