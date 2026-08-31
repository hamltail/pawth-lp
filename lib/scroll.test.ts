import { describe, expect, it } from "vitest";

import { BACK_TO_TOP_THRESHOLD, shouldShowBackToTop } from "./scroll";

describe("shouldShowBackToTop", () => {
  it("しきい値を超えると表示する", () => {
    expect(shouldShowBackToTop(BACK_TO_TOP_THRESHOLD + 1)).toBe(true);
  });

  it("しきい値では表示しない", () => {
    expect(shouldShowBackToTop(BACK_TO_TOP_THRESHOLD)).toBe(false);
  });

  it("しきい値未満では表示しない", () => {
    expect(shouldShowBackToTop(BACK_TO_TOP_THRESHOLD - 1)).toBe(false);
  });
});
