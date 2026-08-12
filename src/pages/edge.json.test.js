import { describe, it, expect } from "bun:test";
import { get } from "./edge.json.js";

describe("edge.json.js get handler", () => {
  it("should return a 200 status code", async () => {
    const response = await get();
    expect(response.status).toBe(200);
  });

  it("should have correct headers", async () => {
    const response = await get();
    expect(response.headers.get("Content-Type")).toBe("application/json");
    expect(response.headers.get("Cache-Control")).toBe("s-maxage=10, stale-while-revalidate");
  });

  it("should return a JSON object with a time property", async () => {
    const response = await get();
    const data = await response.json();
    expect(data).toHaveProperty("time");
    // Check if it's a valid date string
    expect(new Date(data.time).toString()).not.toBe("Invalid Date");
  });
});
