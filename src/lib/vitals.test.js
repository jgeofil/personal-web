import { describe, it, expect, mock, spyOn, beforeEach, afterEach } from "bun:test";

const mockOnFID = mock(() => {});
const mockOnTTFB = mock(() => {});
const mockOnLCP = mock(() => {});
const mockOnCLS = mock(() => {});
const mockOnFCP = mock(() => {});

mock.module("web-vitals", () => {
  return {
    onFID: mockOnFID,
    onTTFB: mockOnTTFB,
    onLCP: mockOnLCP,
    onCLS: mockOnCLS,
    onFCP: mockOnFCP,
  };
});

import { webVitals } from "./vitals";

describe("webVitals", () => {
  let consoleErrorSpy;

  beforeEach(() => {
    consoleErrorSpy = spyOn(console, "error").mockImplementation(() => {});
    // Reset mocks
    mockOnFID.mockClear();
    mockOnTTFB.mockClear();
    mockOnLCP.mockClear();
    mockOnCLS.mockClear();
    mockOnFCP.mockClear();

    // Reset implementations to default (no-op)
    mockOnFID.mockImplementation(() => {});
    mockOnTTFB.mockImplementation(() => {});
    mockOnLCP.mockImplementation(() => {});
    mockOnCLS.mockImplementation(() => {});
    mockOnFCP.mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it("should register all web vitals listeners", () => {
    const options = { analyticsId: "test-id" };
    webVitals(options);

    expect(mockOnFID).toHaveBeenCalled();
    expect(mockOnTTFB).toHaveBeenCalled();
    expect(mockOnLCP).toHaveBeenCalled();
    expect(mockOnCLS).toHaveBeenCalled();
    expect(mockOnFCP).toHaveBeenCalled();
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it("should catch and log errors when a listener fails to register", () => {
    const error = new Error("Registration failed");
    mockOnFID.mockImplementation(() => {
      throw error;
    });

    const options = { analyticsId: "test-id" };
    webVitals(options);

    expect(consoleErrorSpy).toHaveBeenCalledWith("[Web Vitals]", error);
  });
});
