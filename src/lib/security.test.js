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
	});

	it("should return # for non-string inputs", () => {
		expect(sanitizeUrl(null)).toBe("#");
		expect(sanitizeUrl(undefined)).toBe("#");
		expect(sanitizeUrl(123)).toBe("#");
		expect(sanitizeUrl({})).toBe("#");
		expect(sanitizeUrl([])).toBe("#");
		expect(sanitizeUrl(true)).toBe("#");
	});
});
