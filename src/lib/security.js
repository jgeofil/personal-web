export function sanitizeUrl(url) {
	if (typeof url !== "string") {
		return "#";
	}

	try {
		const parsed = new URL(url, "http://dummy");
		if (
			parsed.protocol === "javascript:" ||
			parsed.protocol === "data:" ||
			parsed.protocol === "vbscript:"
		) {
			return "#";
		}
	} catch (e) {
		// Ignore parsing errors, fallback to basic check
	}

	// Fallback to check using regex to strip control characters and whitespace
	const lowerUrl = url.replace(/^[\s\x00-\x1F]+/g, "").toLowerCase();
	if (
		lowerUrl.startsWith("javascript:") ||
		lowerUrl.startsWith("data:") ||
		lowerUrl.startsWith("vbscript:")
	) {
		return "#";
	}
	return url;
}
