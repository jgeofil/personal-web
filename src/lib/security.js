const CONTROL_CHARS_REGEX = /[\x00-\x1F\x7F-\x9F]/g;
const WHITESPACE_REGEX = /\s+/g;

/**
 * Decodes basic HTML entities that might be used to obfuscate protocols.
 * Supports decimal (&#106;), hex (&#x6A;), and common named entities.
 * Handles optional semicolons for numeric entities as some browsers do.
 */
function decodeHtmlEntities(str) {
	return str
		.replace(/&#([0-9]+);?/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)))
		.replace(/&#x([0-9a-f]+);?/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
		.replace(/&colon;?/gi, ":")
		.replace(/&tab;?/gi, "\t")
		.replace(/&newline;?/gi, "\n");
}

export function sanitizeUrl(url) {
	if (typeof url !== "string") {
		return "#";
	}

	// 1. Decode HTML entities to handle obfuscation
	const decoded = decodeHtmlEntities(url);

	// 2. Remove control characters and trim
	const sanitized = decoded.replace(CONTROL_CHARS_REGEX, "").trim();

	if (!sanitized) {
		return "#";
	}

	// 3. Remove internal whitespace and lowercase for protocol check
	const lowerUrl = sanitized
		.toLowerCase()
		.replace(WHITESPACE_REGEX, "");

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
