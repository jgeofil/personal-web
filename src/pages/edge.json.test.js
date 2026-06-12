import { describe, expect, it } from "bun:test";
import { describe, expect, it } from "bun:test";
import { GET } from "./edge.json.js";

describe("edge.json.js GET handler", () => {
  it("should return a 200 Response with correct headers and JSON body", async () => {
    const response = await get();

    // Check status
    expect(response.status).toBe(200);

    // Check headers
    expect(response.headers.get("Content-Type")).toBe("application/json");
    expect(response.headers.get("Cache-Control")).toBe("s-maxage=10, stale-while-revalidate");

    // Check JSON body
    const data = await response.json();

    // Assert the response has a valid time field
    expect(data).toHaveProperty("time");
    // Ensure that it's a valid date string
    const date = new Date(data.time);
    expect(date.toString()).not.toBe("Invalid Date");
  });
});
