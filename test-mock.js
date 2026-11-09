import { describe, test, mock } from "bun:test";

describe("mock global", () => {
  test("mock navigator", () => {
    const _originalNavigator = globalThis.navigator;
    globalThis.navigator = { sendBeacon: mock() };
    globalThis.location = { origin: "http://example.com", pathname: "/abc" };
    console.log(navigator.sendBeacon);
    console.log(location.origin);
  });
});
