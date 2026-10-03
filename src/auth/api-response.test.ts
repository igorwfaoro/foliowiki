import { describe, expect, it } from "vitest";
import { getProviderErrorResponse } from "./api-response";
import { ProviderAuthenticationError } from "../core/knowledge/errors";

describe("getProviderErrorResponse", () => {
  it("returns a recoverable sign-in response for invalid provider credentials", async () => {
    const response = getProviderErrorResponse(
      new ProviderAuthenticationError(),
      "Unable to load content",
    );

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({
      error: "Google authorization needs to be renewed.",
      code: "reauthentication_required",
    });
  });

  it("uses a generic error for provider failures unrelated to authentication", async () => {
    const response = getProviderErrorResponse(
      new Error("temporary provider issue"),
      "Unable to load content",
    );

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: "temporary provider issue",
    });
  });
});
