import { describe, expect, test } from "bun:test";
import { get } from "./edge.json.js";

describe("edge.json endpoint", () => {
	test("returns a valid Response object", async () => {
		const response = await get();
		expect(response).toBeInstanceOf(Response);
	});

	test("returns status 200", async () => {
		const response = await get();
		expect(response.status).toBe(200);
	});

	test("returns correct headers", async () => {
		const response = await get();
		expect(response.headers.get("Content-Type")).toBe("application/json");
		expect(response.headers.get("Cache-Control")).toBe("s-maxage=10, stale-while-revalidate");
	});

	test("returns valid JSON with a time property", async () => {
		const response = await get();
		const data = await response.json();
		expect(data).toHaveProperty("time");

		// Verify time is a valid date string
		const date = new Date(data.time);
		expect(isNaN(date.getTime())).toBe(false);
	});
});
