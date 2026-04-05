import { describe, expect, test, mock, beforeEach, afterEach } from "bun:test";

describe("mock global", () => {
    let originalNavigator;
    let originalLocation;

    beforeEach(() => {
        originalNavigator = globalThis.navigator;
        originalLocation = globalThis.location;
    });

    afterEach(() => {
        globalThis.navigator = originalNavigator;
        globalThis.location = originalLocation;
    });

    test("mock navigator", () => {
        const sendBeacon = mock();
        globalThis.navigator = { sendBeacon };
        globalThis.location = { origin: "http://example.com", pathname: "/abc" };

        expect(globalThis.navigator.sendBeacon).toBe(sendBeacon);
        expect(globalThis.location.origin).toBe("http://example.com");
        expect(globalThis.location.pathname).toBe("/abc");
    });
});
