import { test, expect, mock, spyOn, beforeEach } from "bun:test";

// Mock the web-vitals module before importing the module that uses it
mock.module("web-vitals", () => {
	return {
		onFID: mock((cb) => {}),
		onTTFB: mock((cb) => {}),
		onLCP: mock((cb) => {}),
		onCLS: mock((cb) => {}),
		onFCP: mock((cb) => {}),
	};
});

// Now import webVitals and the mocked module
import { webVitals } from "./vitals.js";
import * as webVitalsModule from "web-vitals";

test("webVitals logs error when a web-vitals function throws", () => {
	const error = new Error("Test error");
	webVitalsModule.onFID.mockImplementationOnce(() => {
		throw error;
	});

	const consoleSpy = spyOn(console, "error").mockImplementation(() => {});

	webVitals({});

	expect(consoleSpy).toHaveBeenCalledWith("[Web Vitals]", error);

	consoleSpy.mockRestore();
});

test("webVitals registers all callbacks in happy path", () => {
	// Reset mocks manually since restore_all might not be available as expected
	webVitalsModule.onFID.mockClear();
	webVitalsModule.onTTFB.mockClear();
	webVitalsModule.onLCP.mockClear();
	webVitalsModule.onCLS.mockClear();
	webVitalsModule.onFCP.mockClear();

	const options = { some: "options" };
	webVitals(options);

	expect(webVitalsModule.onFID).toHaveBeenCalled();
	expect(webVitalsModule.onTTFB).toHaveBeenCalled();
	expect(webVitalsModule.onLCP).toHaveBeenCalled();
	expect(webVitalsModule.onCLS).toHaveBeenCalled();
	expect(webVitalsModule.onFCP).toHaveBeenCalled();
});
