import { test, expect, mock, beforeEach, describe, it, afterEach } from "bun:test";

// Mock web-vitals
mock.module("web-vitals", () => ({
	onCLS: mock(),
	onFCP: mock(),
	onFID: mock(),
	onLCP: mock(),
	onTTFB: mock(),
}));

import { onCLS, onFCP, onFID, onLCP, onTTFB } from "web-vitals";
import { sendToAnalytics, webVitals } from "./vitals";

describe("vitals", () => {
	const originalNavigator = global.navigator;
	const originalLocation = global.location;
	const originalFetch = global.fetch;
	const originalConsoleLog = global.console.log;
	const originalConsoleError = global.console.error;
	const originalBlob = global.Blob;

	let lastBlobContent = "";

	beforeEach(() => {
		// Reset mocks
		mock.restore();

		// Setup standard mocks
		global.navigator = {
			sendBeacon: mock(() => true),
			connection: {
				effectiveType: "4g",
			},
		};
		global.location = {
			href: "https://example.com/test",
		};
		global.fetch = mock(() => Promise.resolve(new Response()));
		global.console.log = mock();
		global.console.error = mock();

		// Mock Blob to capture content
		global.Blob = class {
			constructor(content, options) {
				this.content = content;
				this.options = options;
				this.type = options.type;
				lastBlobContent = content[0];
			}
			toString() { return "[object Blob]"; }
			static [Symbol.hasInstance](instance) {
				return instance && instance.type === "application/x-www-form-urlencoded";
			}
		};
	});

	afterEach(() => {
		global.navigator = originalNavigator;
		global.location = originalLocation;
		global.fetch = originalFetch;
		global.console.log = originalConsoleLog;
		global.console.error = originalConsoleError;
		global.Blob = originalBlob;
	});

	describe("sendToAnalytics", () => {
		const metric = {
			id: "v3-123",
			name: "LCP",
			value: 123.45,
		};
		const options = {
			params: { id: "123" },
			path: "/posts/123",
			analyticsId: "XYZ123",
			debug: false,
		};

		it("sends data via sendBeacon when available", () => {
			sendToAnalytics(metric, options);

			expect(global.navigator.sendBeacon).toHaveBeenCalled();
			const [url, blob] = global.navigator.sendBeacon.mock.calls[0];
			expect(url).toBe("https://vitals.vercel-analytics.com/v1/vitals");
			expect(blob.type).toBe("application/x-www-form-urlencoded");

			const params = new URLSearchParams(lastBlobContent);
			expect(params.get("dsn")).toBe("XYZ123");
			expect(params.get("id")).toBe("v3-123");
			expect(params.get("page")).toBe("/posts/[id]");
			expect(params.get("event_name")).toBe("LCP");
			expect(params.get("value")).toBe("123.45");
			expect(params.get("speed")).toBe("4g");
		});

		it("falls back to fetch when sendBeacon is unavailable", () => {
			global.navigator.sendBeacon = undefined;

			sendToAnalytics(metric, options);

			expect(global.fetch).toHaveBeenCalled();
			const [url, init] = global.fetch.mock.calls[0];
			expect(url).toBe("https://vitals.vercel-analytics.com/v1/vitals");
			expect(init.method).toBe("POST");
			expect(init.keepalive).toBe(true);

			const params = new URLSearchParams(lastBlobContent);
			expect(params.get("dsn")).toBe("XYZ123");
		});

		it("handles missing navigator.connection gracefully", () => {
			global.navigator.connection = undefined;

			sendToAnalytics(metric, options);

			const params = new URLSearchParams(lastBlobContent);
			expect(params.get("speed")).toBe("");
		});

		it("logs to console when debug is true", () => {
			sendToAnalytics(metric, { ...options, debug: true });
			expect(global.console.log).toHaveBeenCalledWith(
				"[Web Vitals]",
				"LCP",
				expect.stringContaining('"dsn": "XYZ123"')
			);
		});
	});

	describe("webVitals", () => {
		it("registers all web vitals callbacks", () => {
			webVitals({});

			expect(onFID).toHaveBeenCalled();
			expect(onTTFB).toHaveBeenCalled();
			expect(onLCP).toHaveBeenCalled();
			expect(onCLS).toHaveBeenCalled();
			expect(onFCP).toHaveBeenCalled();
		});

		it("handles errors during registration gracefully", () => {
			onFID.mockImplementation(() => {
				throw new Error("fail");
			});

			webVitals({});

			expect(global.console.error).toHaveBeenCalledWith(
				"[Web Vitals]",
				expect.any(Error)
			);
		});
	});
});
