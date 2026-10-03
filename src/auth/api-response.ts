import type { GoogleAccessResult } from "@/auth/google-access";
import { ProviderAuthenticationError } from "@/core/knowledge/errors";

function reauthenticationRequiredResponse(): Response {
  return Response.json(
    {
      error: "Google authorization needs to be renewed.",
      code: "reauthentication_required",
    },
    { status: 401 },
  );
}

export function getAuthenticationErrorResponse(
  result: GoogleAccessResult,
): Response | null {
  if (result.status === "authenticated") return null;

  if (result.status === "reauthentication-required") {
    return reauthenticationRequiredResponse();
  }

  return Response.json({ error: "Unauthorized" }, { status: 401 });
}

export function getProviderErrorResponse(
  error: unknown,
  fallbackMessage: string,
): Response {
  if (error instanceof ProviderAuthenticationError) {
    return reauthenticationRequiredResponse();
  }

  return Response.json(
    { error: error instanceof Error ? error.message : fallbackMessage },
    { status: 500 },
  );
}
