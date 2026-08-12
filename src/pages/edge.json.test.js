import { describe, it, expect } from "bun:test";
import { get } from "./edge.json.js";

describe("edge.json.js", () => {
  it("should return a 200 OK response", async () => {
    const response = await get();
    expect(response.status).toBe(200);
  });

  it("should have the correct headers", async () => {
    const response = await get();
    expect(response.headers.get("Content-Type")).toBe("application/json");
    expect(response.headers.get("Cache-Control")).toBe("s-maxage=10, stale-while-revalidate");
  });

  it("should return a JSON body with a time property", async () => {
    const response = await get();
    const data = await response.json();
    expect(data).toHaveProperty("time");
    // Verify that time is a valid date string
    expect(new Date(data.time).getTime()).not.toBeNaN();
  });
});
