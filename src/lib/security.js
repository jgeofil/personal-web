export function sanitizeUrl(url) {
	if (typeof url !== "string") {
		return "#";
	}
	const lowerUrl = url.trim().toLowerCase();
	if (
		lowerUrl.startsWith("javascript:") ||
		lowerUrl.startsWith("data:") ||
		lowerUrl.startsWith("vbscript:")
	) {
		return "#";
	}
	return url;
}
