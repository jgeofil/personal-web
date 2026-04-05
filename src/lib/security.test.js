import { describe, expect, test } from "bun:test";
import { sanitizeUrl } from "./security.js";

describe("sanitizeUrl", () => {
	test("returns empty hash for invalid inputs", () => {
		expect(sanitizeUrl()).toBe("#");
		expect(sanitizeUrl(null)).toBe("#");
		expect(sanitizeUrl(123)).toBe("#");
		expect(sanitizeUrl({})).toBe("#");
		expect(sanitizeUrl("   ")).toBe("#");
	});

	test("allows standard safe URLs", () => {
		expect(sanitizeUrl("https://example.com")).toBe("https://example.com");
		expect(sanitizeUrl("http://example.com")).toBe("http://example.com");
		expect(sanitizeUrl("mailto:test@example.com")).toBe("mailto:test@example.com");
	});

	test("allows relative URLs", () => {
		expect(sanitizeUrl("/relative/path")).toBe("/relative/path");
		expect(sanitizeUrl("?query=1")).toBe("?query=1");
		expect(sanitizeUrl("#hash")).toBe("#hash");
		expect(sanitizeUrl("//example.com")).toBe("//example.com");
	});

	test("blocks unsafe protocols", () => {
		expect(sanitizeUrl("javascript:alert(1)")).toBe("#");
		expect(sanitizeUrl("vbscript:msgbox(1)")).toBe("#");
		expect(sanitizeUrl("data:text/html,<script>alert(1)</script>")).toBe("#");
		expect(sanitizeUrl("tel:1234567890")).toBe("#");
		expect(sanitizeUrl("file:///etc/passwd")).toBe("#");
		expect(sanitizeUrl("ftp://example.com")).toBe("#");
	});

	test("blocks unsafe protocols bypassing URL parser with spaces", () => {
		expect(sanitizeUrl(" javascript:alert(1)")).toBe("#");
		expect(sanitizeUrl("java script:alert(1)")).toBe("#");
		expect(sanitizeUrl("j a v a s c r i p t:alert(1)")).toBe("#");
		expect(sanitizeUrl("vbscript :msgbox(1)")).toBe("#");
	});

	test("blocks unsafe protocols bypassing URL parser with control characters", () => {
		expect(sanitizeUrl("j\u0000avascript:alert(1)")).toBe("#");
		expect(sanitizeUrl("java\nscript:alert(1)")).toBe("#");
		expect(sanitizeUrl("java\rscript:alert(1)")).toBe("#");
		expect(sanitizeUrl("java\tscript:alert(1)")).toBe("#");
		expect(sanitizeUrl("\x01javascript:alert(1)")).toBe("#");
	});

	test("blocks mixed case bypasses", () => {
		expect(sanitizeUrl("JAVASCRIPT:alert(1)")).toBe("#");
		expect(sanitizeUrl("DaTa:text/html,<script>alert(1)</script>")).toBe("#");
		expect(sanitizeUrl("vBsCrIpT:msgbox(1)")).toBe("#");
	});

	test("blocks tricky bypasses falling back to relative check", () => {
		expect(sanitizeUrl("javascript:alert('://')")).toBe("#");
		expect(sanitizeUrl("/%0D%0Ajavascript:alert(1)")).toBe("/%0D%0Ajavascript:alert(1)");
	});
});