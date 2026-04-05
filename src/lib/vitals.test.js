import { describe, expect, test, mock, beforeEach, afterEach } from "bun:test";
import { sendToAnalytics } from "./vitals.js";

describe("sendToAnalytics", () => {
	let originalNavigator;
	let originalLocation;
	let originalFetch;

	beforeEach(() => {
		originalNavigator = globalThis.navigator;
		originalLocation = globalThis.location;
		originalFetch = globalThis.fetch;

		globalThis.navigator = {
			sendBeacon: mock(),
			connection: {
				effectiveType: "4g"
			}
		};

		globalThis.location = {
			origin: "https://example.com",
			pathname: "/test-path"
		};

		globalThis.fetch = mock();
	});

	afterEach(() => {
		globalThis.navigator = originalNavigator;
		globalThis.location = originalLocation;
		globalThis.fetch = originalFetch;
	});

	const mockMetric = {
		id: "v1-123",
		name: "LCP",
		value: 1234.5,
	};

	const mockOptions = {
		analyticsId: "test-dsn-123",
		page: "/test-page",
	};

	test("uses sendBeacon when available", () => {
		sendToAnalytics(mockMetric, mockOptions);

		expect(navigator.sendBeacon).toHaveBeenCalledTimes(1);
		expect(globalThis.fetch).not.toHaveBeenCalled();

		const [url, blob] = navigator.sendBeacon.mock.calls[0];
		expect(url).toBe("https://vitals.vercel-analytics.com/v1/vitals");
		expect(blob).toBeInstanceOf(Blob);
		expect(blob.type).toContain("application/x-www-form-urlencoded");
	});

	test("falls back to fetch when sendBeacon is not available", () => {
		globalThis.navigator.sendBeacon = undefined;

		sendToAnalytics(mockMetric, mockOptions);

		expect(globalThis.fetch).toHaveBeenCalledTimes(1);

		const [url, options] = globalThis.fetch.mock.calls[0];
		expect(url).toBe("https://vitals.vercel-analytics.com/v1/vitals");
		expect(options.method).toBe("POST");
		expect(options.credentials).toBe("omit");
		expect(options.keepalive).toBe(true);
		expect(options.body).toBeInstanceOf(Blob);
	});

	test("constructs correct payload", async () => {
		sendToAnalytics(mockMetric, mockOptions);

		const blob = navigator.sendBeacon.mock.calls[0][1];
		const text = await blob.text();
		const params = new URLSearchParams(text);

		expect(params.get("dsn")).toBe("test-dsn-123");
		expect(params.get("id")).toBe("v1-123");
		expect(params.get("page")).toBe("/test-page");
		expect(params.get("href")).toBe("https://example.com/test-path");
		expect(params.get("event_name")).toBe("LCP");
		expect(params.get("value")).toBe("1234.5");
		expect(params.get("speed")).toBe("4g");
	});

	test("handles missing connection speed gracefully", async () => {
		delete globalThis.navigator.connection;

		sendToAnalytics(mockMetric, mockOptions);

		const blob = navigator.sendBeacon.mock.calls[0][1];
		const text = await blob.text();
		const params = new URLSearchParams(text);

		expect(params.get("speed")).toBe("");
	});

	test("handles missing page gracefully", async () => {
		sendToAnalytics(mockMetric, { analyticsId: "test-dsn-123" });

		const blob = navigator.sendBeacon.mock.calls[0][1];
		const text = await blob.text();
		const params = new URLSearchParams(text);

		expect(params.get("page")).toBe("undefined"); // or empty string depending on URLSearchParams implementation
	});
});
