/**
 * Sanitizes a URL to prevent XSS attacks via dangerous protocols.
 *
 * @param {string} url - The URL to sanitize.
 * @returns {string} The sanitized URL.
 */
export function sanitizeUrl(url) {
	if (!url) return '';

	const dangerousProtocols = /^(javascript:|data:|vbscript:)/i;
	if (dangerousProtocols.test(url.trim())) {
		return 'about:blank';
	}

	return url;
}
