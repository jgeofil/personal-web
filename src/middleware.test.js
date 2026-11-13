import { describe, expect, it, mock } from "bun:test";

// Astro resolves this virtual module when bundling the application.
mock.module("astro:middleware", () => ({ defineMiddleware: (handler) => handler }));

const { onRequest } = await import("./middleware.js");
const { get } = await import("./pages/edge.json.js");
const headerPolicy = (await Bun.file(new URL("../public/_headers", import.meta.url)).text())
  .split("\n")
  .filter((line) => line.startsWith("  "))
  .map((line) => {
    const separator = line.indexOf(":");
    return [line.slice(0, separator).trim(), line.slice(separator + 1).trim()];
  });

function expectSecurityHeaders(response) {
  expect(headerPolicy.length).toBe(7);
  for (const [name, value] of headerPolicy) {
    expect(response.headers.get(name)).toBe(value);
  }
}

describe("security middleware", () => {
  it("applies the static header policy to edge.json and preserves its response", async () => {
    const response = await onRequest({}, get);

    expectSecurityHeaders(response);
    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("application/json");
    expect(response.headers.get("Cache-Control")).toBe("s-maxage=10, stale-while-revalidate");
    expect(Number.isNaN(Date.parse((await response.json()).time))).toBe(false);
  });

  it.each([200, 404])("applies the policy to HTML responses with status %s", async (status) => {
    const response = await onRequest({}, async () => new Response("<h1>Page</h1>", {
      status,
      headers: { "Content-Type": "text/html", "X-Frame-Options": "SAMEORIGIN" },
    }));

    expectSecurityHeaders(response);
    expect(response.status).toBe(status);
    expect(response.headers.get("Content-Type")).toBe("text/html");
    expect(await response.text()).toBe("<h1>Page</h1>");
  });
});
