import {
  getAuthToken,
  setAuthToken,
  clearAuthToken,
  apiRequest,
  buildQueryString,
  apiGet,
  apiPost,
  apiPatch,
  apiDelete,
} from '../../utils/apiClient';

describe('apiClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fetch.mockClear();
  });

  describe('getAuthToken', () => {
    it('should get token from localStorage', () => {
      const mockToken = 'test-token';
      localStorage.getItem.mockReturnValue(mockToken);

      const token = getAuthToken();

      expect(localStorage.getItem).toHaveBeenCalledWith('login-token');
      expect(token).toBe(mockToken);
    });

    it('should return null when no token exists', () => {
      localStorage.getItem.mockReturnValue(null);

      const token = getAuthToken();

      expect(token).toBeNull();
    });
  });

  describe('setAuthToken', () => {
    it('should clear localStorage and set new token', () => {
      const newToken = 'new-token';

      setAuthToken(newToken);

      expect(localStorage.clear).toHaveBeenCalled();
      expect(localStorage.setItem).toHaveBeenCalledWith('login-token', newToken);
    });
  });

  describe('clearAuthToken', () => {
    it('should remove token from localStorage', () => {
      clearAuthToken();

      expect(localStorage.removeItem).toHaveBeenCalledWith('login-token');
    });
  });

  describe('buildQueryString', () => {
    it('should build query string from object', () => {
      const params = { name: 'test', page: 1 };

      const queryString = buildQueryString(params);

      expect(queryString).toBe('name=test&page=1');
    });

    it('should ignore null values', () => {
      const params = { name: 'test', empty: null };

      const queryString = buildQueryString(params);

      expect(queryString).toBe('name=test');
    });

    it('should ignore undefined values', () => {
      const params = { name: 'test', empty: undefined };

      const queryString = buildQueryString(params);

      expect(queryString).toBe('name=test');
    });

    it('should handle empty object', () => {
      const queryString = buildQueryString({});

      expect(queryString).toBe('');
    });
  });

  describe('apiRequest', () => {
    it('should make GET request with token', async () => {
      const mockResponse = { data: 'test' };
      fetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse),
      });

      const result = await apiRequest('/api/test', {
        method: 'GET',
        token: 'test-token',
      });

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/test'),
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            Authorization: 'Bearer test-token',
          }),
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should make POST request with body', async () => {
      const mockResponse = { id: 1 };
      const body = { name: 'test' };
      fetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse),
      });

      const result = await apiRequest('/api/test', {
        method: 'POST',
        token: 'test-token',
        body,
      });

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/test'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(body),
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should make request without token', async () => {
      const mockResponse = { data: 'public' };
      fetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse),
      });

      await apiRequest('/api/public', { method: 'GET' });

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/public'),
        expect.objectContaining({
          headers: expect.not.objectContaining({
            Authorization: expect.any(String),
          }),
        })
      );
    });
  });

  describe('convenience methods', () => {
    beforeEach(() => {
      fetch.mockResolvedValue({
        json: () => Promise.resolve({ success: true }),
      });
    });

    it('apiGet should make GET request', async () => {
      await apiGet('/api/test', 'token');

      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ method: 'GET' })
      );
    });

    it('apiPost should make POST request', async () => {
      await apiPost('/api/test', 'token', { data: 'test' });

      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ method: 'POST' })
      );
    });

    it('apiPatch should make PATCH request', async () => {
      await apiPatch('/api/test', 'token', { data: 'test' });

      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ method: 'PATCH' })
      );
    });

    it('apiDelete should make DELETE request', async () => {
      await apiDelete('/api/test', 'token');

      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ method: 'DELETE' })
      );
    });
  });
});
