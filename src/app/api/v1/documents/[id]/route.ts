import {
  getAuthenticationErrorResponse,
  getProviderErrorResponse,
} from "@/auth/api-response";
import { getGoogleAccess } from "@/auth/google-access";
import { createKnowledgeProvider } from "@/core/knowledge/provider-factory";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const access = await getGoogleAccess(request);
  const authenticationError = getAuthenticationErrorResponse(access);
  if (access.status !== "authenticated") return authenticationError!;

  const { id } = await params;
  const provider = createKnowledgeProvider();
  const context = { accessToken: access.accessToken, userId: access.userId };

  try {
    if (!(await provider.canAccess(id, context))) {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    return Response.json(await provider.getDocument(id, context));
  } catch (error) {
    return getProviderErrorResponse(error, "Unable to load document");
  }
}
