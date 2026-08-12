import { describe, it, expect } from "bun:test";
import { formatPlatform } from "./formatters.js";

describe("formatPlatform", () => {
	it("should return the formatted name for known platforms", () => {
		expect(formatPlatform("googlescholar")).toBe("Google Scholar");
		expect(formatPlatform("github")).toBe("GitHub");
		expect(formatPlatform("linkedin")).toBe("LinkedIn");
		expect(formatPlatform("x")).toBe("X (Twitter)");
	});

	it("should return the original input for unknown platforms", () => {
		expect(formatPlatform("facebook")).toBe("facebook");
		expect(formatPlatform("instagram")).toBe("instagram");
		expect(formatPlatform("unknown_platform")).toBe("unknown_platform");
	});

	it("should handle empty or nullish inputs gracefully", () => {
		expect(formatPlatform("")).toBe("");
		expect(formatPlatform(null)).toBe(null);
		expect(formatPlatform(undefined)).toBe(undefined);
	});
});
