import "@testing-library/jest-dom";
import { Mock, vi } from "vitest";

declare global {
  interface GlobalThis {
    mockSignInWithOAuth: Mock;
  }
}

// Mock Vite env variables
Object.defineProperty(globalThis, "import.meta", {
  value: {
    env: {
      VITE_SUPABASE_URL: "https://mock.supabase.co",
      VITE_SUPABASE_ANON_KEY: "mock-anon-key",
    },
  },
});

class IntersectionObserverMock {
  constructor(callback: any, options?: any) {
    this.callback = callback;
    this.options = options;
  }

  readonly callback: IntersectionObserverCallback;
  readonly options?: IntersectionObserverInit;

  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn();
}

globalThis.IntersectionObserver = IntersectionObserverMock as any;

export {};
