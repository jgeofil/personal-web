import { describe, it, expect } from 'bun:test';
import { sanitizeUrl } from './security';

describe('sanitizeUrl', () => {
	it('should allow valid http and https URLs', () => {
		expect(sanitizeUrl('http://example.com')).toBe('http://example.com');
		expect(sanitizeUrl('https://example.com/path?query=1')).toBe('https://example.com/path?query=1');
	});

	it('should allow relative URLs', () => {
		expect(sanitizeUrl('/about')).toBe('/about');
		expect(sanitizeUrl('styles.css')).toBe('styles.css');
	});

	it('should block javascript: URLs', () => {
		expect(sanitizeUrl('javascript:alert(1)')).toBe('about:blank');
		expect(sanitizeUrl('  javascript:alert(1)')).toBe('about:blank');
		expect(sanitizeUrl('JAVASCRIPT:alert(1)')).toBe('about:blank');
	});

	it('should block data: URLs', () => {
		expect(sanitizeUrl('data:text/html,<script>alert(1)</script>')).toBe('about:blank');
	});

	it('should block vbscript: URLs', () => {
		expect(sanitizeUrl('vbscript:msgbox("Hi")')).toBe('about:blank');
	});

	it('should return empty string for null or undefined', () => {
		expect(sanitizeUrl(null)).toBe('');
		expect(sanitizeUrl(undefined)).toBe('');
	});
});
