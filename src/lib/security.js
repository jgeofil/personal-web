const CONTROL_CHARS_REGEX = /[\x00-\x1F\x7F-\x9F]/g;
const WHITESPACE_REGEX = /\s+/g;
const COLON_ENTITY_REGEX = /&colon;/g;

export function sanitizeUrl(url) {
	if (typeof url !== "string") {
		return "#";
	}

	// Decode HTML entities before sanitizing
	let decodedUrl = url
		.replace(/&#(\d+);?/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)))
		.replace(/&#x([0-9a-f]+);?/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
		.replace(/&colon;?/gi, ":")
		.replace(/&tab;?/gi, "\t")
		.replace(/&newline;?/gi, "\n");

	// Remove control characters and any characters that browsers may ignore
	// but could be used for obfuscation (e.g. \x00-\x1F, \x7F-\x9F)
	const sanitized = decodedUrl.replace(CONTROL_CHARS_REGEX, "").trim();

	if (!sanitized) {
		return "#";
	}

	// Remove internal whitespace and check for common obfuscation like &colon;
	const lowerUrl = sanitized
		.toLowerCase()
		.replace(WHITESPACE_REGEX, "")
		.replace(COLON_ENTITY_REGEX, ":");

	if (
		lowerUrl.startsWith("javascript:") ||
		lowerUrl.startsWith("data:") ||
		lowerUrl.startsWith("vbscript:") ||
		lowerUrl.startsWith("blob:")
	) {
		return "#";
	}

	return sanitized;
}
