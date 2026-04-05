export function sanitizeUrl(url) {
	if (typeof url !== "string") {
		return "#";
	}

	// Remove control characters and any characters that browsers may ignore
	// but could be used for obfuscation (e.g. \x00-\x1F, \x7F-\x9F)
	const sanitized = url.replace(/[\x00-\x1F\x7F-\x9F]/g, "").trim();

	if (!sanitized) {
		return "#";
	}

	// Remove internal whitespace and check for common obfuscation like &colon;
	const lowerUrl = sanitized
		.toLowerCase()
		.replace(/\s+/g, "")
		.replace(/&colon;/g, ":");

	if (
		lowerUrl.startsWith("javascript:") ||
		lowerUrl.startsWith("data:") ||
		lowerUrl.startsWith("vbscript:") ||
		lowerUrl.startsWith("blob:")
	) {
		return "#";
	}

	return url;
}
