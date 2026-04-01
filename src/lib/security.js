export function sanitizeUrl(url) {
	if (typeof url !== "string" || !url.trim()) {
		return "#";
	}
	try {
		const parsedUrl = new URL(url);
		if (['https:', 'http:', 'mailto:'].includes(parsedUrl.protocol)) {
			return url;
		}
		return '#';
	} catch (e) {
		// URL constructor throws for relative URLs.
		// We can assume relative URLs are safe in this context.
		// A simple check for relative URLs is that they don't contain `://`.
		if (!url.includes('://')) {
			return url;
		}
		return '#';
	}
}
