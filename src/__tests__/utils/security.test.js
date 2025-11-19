/**
 * Security Utilities Tests
 */
import {
  sanitizeHTML,
  sanitizeObject,
  stripHTML,
  isValidEmail,
  validatePassword,
  isValidISBN,
  isValidPhone,
  isValidURL,
  secureSetToken,
  secureGetToken,
  secureClearToken,
  isTokenExpired,
  isValidFileType,
  isValidFileSize,
  sanitizeFilename,
  maskEmail,
  maskPhone,
  maskCardNumber,
} from '../../utils/security';

describe('XSS Prevention', () => {
  describe('sanitizeHTML', () => {
    it('should escape HTML special characters', () => {
      expect(sanitizeHTML('<script>alert("xss")</script>')).toBe(
        '&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;',
      );
    });

    it('should escape ampersands', () => {
      expect(sanitizeHTML('foo & bar')).toBe('foo &amp; bar');
    });

    it('should escape quotes', () => {
      expect(sanitizeHTML("it's \"quoted\"")).toBe(
        'it&#x27;s &quot;quoted&quot;',
      );
    });

    it('should return empty string for non-string input', () => {
      expect(sanitizeHTML(null)).toBe('');
      expect(sanitizeHTML(undefined)).toBe('');
      expect(sanitizeHTML(123)).toBe('');
    });
  });

  describe('sanitizeObject', () => {
    it('should sanitize all string values in object', () => {
      const input = {
        name: '<script>alert("xss")</script>',
        value: 'normal text',
      };
      const result = sanitizeObject(input);
      expect(result.name).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;');
      expect(result.value).toBe('normal text');
    });

    it('should handle nested objects', () => {
      const input = {
        level1: {
          level2: '<b>bold</b>',
        },
      };
      const result = sanitizeObject(input);
      expect(result.level1.level2).toBe('&lt;b&gt;bold&lt;&#x2F;b&gt;');
    });

    it('should handle arrays', () => {
      const input = ['<a>link</a>', 'text'];
      const result = sanitizeObject(input);
      expect(result[0]).toBe('&lt;a&gt;link&lt;&#x2F;a&gt;');
      expect(result[1]).toBe('text');
    });

    it('should preserve non-string values', () => {
      const input = { num: 123, bool: true };
      const result = sanitizeObject(input);
      expect(result.num).toBe(123);
      expect(result.bool).toBe(true);
    });
  });

  describe('stripHTML', () => {
    it('should remove all HTML tags', () => {
      expect(stripHTML('<p>Hello <b>World</b></p>')).toBe('Hello World');
    });

    it('should handle self-closing tags', () => {
      expect(stripHTML('Line 1<br/>Line 2')).toBe('Line 1Line 2');
    });

    it('should return empty string for non-string input', () => {
      expect(stripHTML(null)).toBe('');
    });
  });
});

describe('Input Validation', () => {
  describe('isValidEmail', () => {
    it('should validate correct email formats', () => {
      expect(isValidEmail('user@example.com')).toBe(true);
      expect(isValidEmail('user.name@example.co.uk')).toBe(true);
    });

    it('should reject invalid email formats', () => {
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('user@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail(null)).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('should validate strong passwords', () => {
      const result = validatePassword('Secure1!password');
      expect(result.isValid).toBe(true);
      expect(result.score).toBeGreaterThanOrEqual(4);
    });

    it('should reject weak passwords', () => {
      const result = validatePassword('weak');
      expect(result.isValid).toBe(false);
      expect(result.messages.length).toBeGreaterThan(0);
    });

    it('should check for minimum length', () => {
      const result = validatePassword('Short1!');
      expect(result.messages).toContain('La contraseña debe tener al menos 8 caracteres');
    });

    it('should check for uppercase letters', () => {
      const result = validatePassword('lowercase1!');
      expect(result.messages).toContain('Debe incluir al menos una letra mayúscula');
    });

    it('should check for numbers', () => {
      const result = validatePassword('NoNumbers!');
      expect(result.messages).toContain('Debe incluir al menos un número');
    });

    it('should check for special characters', () => {
      const result = validatePassword('NoSpecial1');
      expect(result.messages).toContain('Debe incluir al menos un carácter especial');
    });
  });

  describe('isValidISBN', () => {
    it('should validate ISBN-10', () => {
      expect(isValidISBN('0123456789')).toBe(true);
      expect(isValidISBN('0-123-45678-9')).toBe(true);
    });

    it('should validate ISBN-13', () => {
      expect(isValidISBN('9780123456789')).toBe(true);
      expect(isValidISBN('978-0-123-45678-9')).toBe(true);
    });

    it('should reject invalid ISBNs', () => {
      expect(isValidISBN('123')).toBe(false);
      expect(isValidISBN('invalid')).toBe(false);
      expect(isValidISBN(null)).toBe(false);
    });
  });

  describe('isValidPhone', () => {
    it('should validate Colombian phone numbers', () => {
      expect(isValidPhone('3001234567')).toBe(true);
      expect(isValidPhone('+573001234567')).toBe(true);
    });

    it('should reject invalid phone numbers', () => {
      expect(isValidPhone('123')).toBe(false);
      expect(isValidPhone('invalid')).toBe(false);
    });
  });

  describe('isValidURL', () => {
    it('should validate HTTP/HTTPS URLs', () => {
      expect(isValidURL('https://example.com')).toBe(true);
      expect(isValidURL('http://example.com/path')).toBe(true);
    });

    it('should reject invalid URLs', () => {
      expect(isValidURL('not-a-url')).toBe(false);
      expect(isValidURL('ftp://example.com')).toBe(false);
      expect(isValidURL('')).toBe(false);
    });
  });
});

describe('Secure Storage', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('secureSetToken and secureGetToken', () => {
    it('should store and retrieve token', () => {
      secureSetToken('test-token');
      expect(secureGetToken()).toBe('test-token');
    });

    it('should return null for expired token', () => {
      // Set token with very short expiry
      secureSetToken('test-token', 1);

      // Wait for expiry
      return new Promise((resolve) => {
        setTimeout(() => {
          expect(secureGetToken()).toBeNull();
          resolve();
        }, 10);
      });
    });

    it('should not store invalid tokens', () => {
      secureSetToken(null);
      expect(secureGetToken()).toBeNull();

      secureSetToken('');
      expect(secureGetToken()).toBeNull();
    });
  });

  describe('secureClearToken', () => {
    it('should clear stored token', () => {
      secureSetToken('test-token');
      secureClearToken();
      expect(secureGetToken()).toBeNull();
    });
  });

  describe('isTokenExpired', () => {
    it('should return true when no token exists', () => {
      expect(isTokenExpired()).toBe(true);
    });

    it('should return false for valid token', () => {
      secureSetToken('test-token', 60000);
      expect(isTokenExpired()).toBe(false);
    });
  });
});

describe('Content Security', () => {
  describe('isValidFileType', () => {
    it('should validate allowed file types', () => {
      const jpegFile = { type: 'image/jpeg' };
      const pngFile = { type: 'image/png' };
      const pdfFile = { type: 'application/pdf' };

      expect(isValidFileType(jpegFile)).toBe(true);
      expect(isValidFileType(pngFile)).toBe(true);
      expect(isValidFileType(pdfFile, ['application/pdf'])).toBe(true);
    });

    it('should reject disallowed file types', () => {
      const exeFile = { type: 'application/x-executable' };
      expect(isValidFileType(exeFile)).toBe(false);
    });
  });

  describe('isValidFileSize', () => {
    it('should validate file size under limit', () => {
      const smallFile = { size: 1024 * 1024 }; // 1 MB
      expect(isValidFileSize(smallFile, 5)).toBe(true);
    });

    it('should reject file size over limit', () => {
      const largeFile = { size: 10 * 1024 * 1024 }; // 10 MB
      expect(isValidFileSize(largeFile, 5)).toBe(false);
    });
  });

  describe('sanitizeFilename', () => {
    it('should remove path traversal attempts', () => {
      expect(sanitizeFilename('../../../etc/passwd')).toBe('etcpasswd');
    });

    it('should remove special characters', () => {
      expect(sanitizeFilename('file<>:"|?*.txt')).toBe('file_______.txt');
    });

    it('should preserve valid filenames', () => {
      expect(sanitizeFilename('document.pdf')).toBe('document.pdf');
    });
  });
});

describe('Data Masking', () => {
  describe('maskEmail', () => {
    it('should mask email address', () => {
      expect(maskEmail('user@example.com')).toBe('u**r@example.com');
      expect(maskEmail('ab@example.com')).toBe('**@example.com');
    });

    it('should handle invalid input', () => {
      expect(maskEmail('invalid')).toBe('invalid');
      expect(maskEmail(null)).toBe(null);
    });
  });

  describe('maskPhone', () => {
    it('should mask phone number', () => {
      expect(maskPhone('3001234567')).toBe('******4567');
      expect(maskPhone('+573001234567')).toBe('*********4567');
    });

    it('should handle short numbers', () => {
      expect(maskPhone('123')).toBe('123');
    });
  });

  describe('maskCardNumber', () => {
    it('should mask credit card number', () => {
      expect(maskCardNumber('4111111111111111')).toBe('************1111');
      expect(maskCardNumber('4111 1111 1111 1111')).toBe('************1111');
    });

    it('should handle short numbers', () => {
      expect(maskCardNumber('123')).toBe('123');
    });
  });
});
