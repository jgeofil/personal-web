const CONTROL_CHARS_REGEX = /[\x00-\x20\x7F-\x9F\u200B-\u200D\u2028\u2029\uFEFF]/g;
const WHITESPACE_REGEX = /[\s\u200B-\u200D\u2028\u2029\uFEFF]+/g;
const COLON_ENTITY_REGEX = /&colon;/g;

export function sanitizeUrl(url) {
	if (typeof url !== "string") {
		return "#";
	}

	// URL decode to handle obfuscated protocols like %6a%61%76%61%73%63%72%69%70%74%3a
	// Try decoding repeatedly to handle double-encoding (e.g. %253A -> %3A -> :)
	let urlDecodedUrl = url;
	let prevUrl;
	do {
		prevUrl = urlDecodedUrl;
		try {
			urlDecodedUrl = decodeURIComponent(urlDecodedUrl);
		} catch (e) {
			// Ignore invalid URL encoding, stick with the last valid decoded string
			break;
		}
	} while (urlDecodedUrl !== prevUrl);

	// Decode HTML entities before sanitizing
	let decodedUrl = urlDecodedUrl
		.replace(/&#(\d+);?/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)))
		.replace(/&#x([0-9a-f]+);?/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
		.replace(/&colon;?/gi, ":")
		.replace(/&tab;?/gi, "\t")
		.replace(/&newline;?/gi, "\n");

	// Remove control characters and any characters that browsers may ignore
	// but could be used for obfuscation (e.g. \x00-\x1F, \x7F-\x9F)
	let sanitized = decodedUrl.replace(CONTROL_CHARS_REGEX, "").trim();

	try {
		// Decode again after trimming control chars if url encoded
		sanitized = decodeURIComponent(sanitized);
	} catch (e) {
		// Ignore
	}

	if (!sanitized) {
		return "#";
	}

	// Remove internal whitespace and check for common obfuscation like &colon;
	const lowerUrl = sanitized
		.toLowerCase()
		.replace(WHITESPACE_REGEX, "")
		.replace(COLON_ENTITY_REGEX, ":").replace(/%3a/g, ":");

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
