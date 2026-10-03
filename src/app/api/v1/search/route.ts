import {
  getAuthenticationErrorResponse,
  getProviderErrorResponse,
} from "@/auth/api-response";
import { getGoogleAccess } from "@/auth/google-access";
import { createKnowledgeProvider } from "@/core/knowledge/provider-factory";
import { z } from "zod";

const schema = z.string().trim().min(2).max(120);

export async function GET(request: Request) {
  const access = await getGoogleAccess(request);
  const authenticationError = getAuthenticationErrorResponse(access);
  if (access.status !== "authenticated") return authenticationError!;

  const parsed = schema.safeParse(new URL(request.url).searchParams.get("q"));
  if (!parsed.success) {
    return Response.json({ error: "Invalid query" }, { status: 400 });
  }

  try {
    return Response.json(
      await createKnowledgeProvider().search(parsed.data, {
        accessToken: access.accessToken,
        userId: access.userId,
      }),
    );
  } catch (error) {
    return getProviderErrorResponse(error, "Unable to search documents");
  }
}
