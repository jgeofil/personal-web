import { describe, expect, test, mock, beforeEach, afterEach } from "bun:test";

describe("mock global", () => {
    test("mock navigator", () => {
        const originalNavigator = globalThis.navigator;
        globalThis.navigator = { sendBeacon: mock() };
        globalThis.location = { origin: "http://example.com", pathname: "/abc" };
        console.log(navigator.sendBeacon);
        console.log(location.origin);
    });
});
