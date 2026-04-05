import { describe, it, expect } from "bun:test";
import { sanitizeUrl } from "./security.js";

describe("sanitizeUrl", () => {
	it("should return the same URL for valid protocols", () => {
		expect(sanitizeUrl("https://google.com")).toBe("https://google.com");
		expect(sanitizeUrl("http://localhost:3000")).toBe("http://localhost:3000");
		expect(sanitizeUrl("/about")).toBe("/about");
		expect(sanitizeUrl("mailto:test@example.com")).toBe("mailto:test@example.com");
		expect(sanitizeUrl("tel:+123456789")).toBe("tel:+123456789");
	});

	it("should return # for blocked protocols", () => {
		expect(sanitizeUrl("javascript:alert(1)")).toBe("#");
		expect(sanitizeUrl("data:text/html,<html>")).toBe("#");
		expect(sanitizeUrl("vbscript:msgbox('hello')")).toBe("#");
		expect(sanitizeUrl("blob:https://example.com/uuid")).toBe("#");
	});

	it("should handle blocked protocols with leading/trailing whitespace", () => {
		expect(sanitizeUrl("  javascript:alert(1)  ")).toBe("#");
		expect(sanitizeUrl("\tjavascript:alert(1)\n")).toBe("#");
	});

	it("should be case-insensitive for blocked protocols", () => {
		expect(sanitizeUrl("JAVASCRIPT:alert(1)")).toBe("#");
		expect(sanitizeUrl("JavaScripT:alert(1)")).toBe("#");
		expect(sanitizeUrl("DATA:text/html,<html>")).toBe("#");
		expect(sanitizeUrl("VBSCRIPT:msgbox('hello')")).toBe("#");
		expect(sanitizeUrl("BLOB:https://example.com/uuid")).toBe("#");
	});

	it("should block obfuscated protocols", () => {
		expect(sanitizeUrl("javascript&colon;alert(1)")).toBe("#");
		expect(sanitizeUrl("j a v a s c r i p t : alert(1)")).toBe("#");
		expect(sanitizeUrl("javascript\x00:alert(1)")).toBe("#");
		expect(sanitizeUrl("javascript\r\n:alert(1)")).toBe("#");
		expect(sanitizeUrl("data\t:text/html,<html>")).toBe("#");
	});

	it("should return # for non-string inputs", () => {
		expect(sanitizeUrl(null)).toBe("#");
		expect(sanitizeUrl(undefined)).toBe("#");
		expect(sanitizeUrl(123)).toBe("#");
		expect(sanitizeUrl({})).toBe("#");
		expect(sanitizeUrl([])).toBe("#");
		expect(sanitizeUrl(true)).toBe("#");
	});

	it("should return # for empty or only control character strings", () => {
		expect(sanitizeUrl("")).toBe("#");
		expect(sanitizeUrl("   ")).toBe("#");
		expect(sanitizeUrl("\x00\x01\x02")).toBe("#");
	});
});
