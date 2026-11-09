const CONTROL_CHARS_REGEX = /[\u0000-\u001F\u007F-\u009F]/g; // eslint-disable-line no-control-regex
const INVISIBLE_CHARS_REGEX = /[\u00AD\u200B-\u200D\u2060\uFEFF]/g;
const WHITESPACE_REGEX = /[\s\u200B-\u200D\u2060\uFEFF]+/g;
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
      console.warn(`Failed to decode URL: ${urlDecodedUrl}`, e);
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

  // Remove control characters and invisible Unicode separators/format chars
  // that browsers may ignore or normalize away for scheme-based obfuscation.
  const sanitized = decodedUrl
    .replace(CONTROL_CHARS_REGEX, "")
    .replace(INVISIBLE_CHARS_REGEX, "")
    .trim();

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
