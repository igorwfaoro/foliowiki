import {
  getAuthenticationErrorResponse,
  getProviderErrorResponse,
} from "@/auth/api-response";
import { getGoogleAccess } from "@/auth/google-access";
import { createKnowledgeProvider } from "@/core/knowledge/provider-factory";

export async function GET(request: Request) {
  const access = await getGoogleAccess(request);
  const authenticationError = getAuthenticationErrorResponse(access);
  if (access.status !== "authenticated") return authenticationError!;

  try {
    return Response.json(
      await createKnowledgeProvider().getTree({
        accessToken: access.accessToken,
        userId: access.userId,
      }),
    );
  } catch (error) {
    return getProviderErrorResponse(error, "Unable to load tree");
  }
}
