import { describe, expect, it } from "vitest";
import { getSafeRedirectPath } from "./redirect";

describe("getSafeRedirectPath", () => {
  it("keeps a local return path", () => {
    expect(getSafeRedirectPath("/wiki?view=all")).toBe("/wiki?view=all");
  });

  it.each(["https://attacker.example", "//attacker.example", "not-a-path"])(
    "falls back for an unsafe redirect: %s",
    (value) => {
      expect(getSafeRedirectPath(value)).toBe("/onboarding");
    },
  );
});
