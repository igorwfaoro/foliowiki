import { docs_v1 } from "@googleapis/docs";
import { drive_v3 } from "@googleapis/drive";
import { OAuth2Client } from "google-auth-library";
import { ProviderAuthenticationError } from "@/core/knowledge/errors";
import type { KnowledgeProvider } from "@/core/knowledge/knowledge-provider";
import type {
  AccessContext,
  SearchResult,
  WikiDocument,
  WikiInline,
  WikiTree,
  WikiTreeNode,
} from "@/core/knowledge/types";
const FOLDER = "application/vnd.google-apps.folder";
const DOC = "application/vnd.google-apps.document";
export class GoogleDriveProvider implements KnowledgeProvider {
  constructor(private readonly rootFolderId: string) {}
  private clients(context: AccessContext) {
    if (!context.accessToken)
      throw new Error("Google access token is required");
    const auth = new OAuth2Client();
    auth.setCredentials({ access_token: context.accessToken });
    return {
      drive: new drive_v3.Drive({ auth }),
      docs: new docs_v1.Docs({ auth }),
    };
  }
  private async providerRequest<T>(request: Promise<T>): Promise<T> {
    try {
      return await request;
    } catch (error) {
      if (isUnauthorized(error)) throw new ProviderAuthenticationError();
      throw error;
    }
  }
  async getTree(context: AccessContext): Promise<WikiTree> {
    const root = await this.folder(this.rootFolderId, context);
    return { root };
  }
  private async folder(
    id: string,
    context: AccessContext,
  ): Promise<WikiTreeNode> {
    const { drive } = this.clients(context);
    const meta = await this.providerRequest(
      drive.files.get({
        fileId: id,
        fields: "id,name,mimeType",
      }),
    );
    const res = await this.providerRequest(
      drive.files.list({
        q: `'${id}' in parents and trashed = false`,
        fields: "files(id,name,mimeType)",
        orderBy: "folder,name",
      }),
    );
    const children = await Promise.all(
      (res.data.files ?? [])
        .filter(
          (f) =>
            f.id && f.name && (f.mimeType === FOLDER || f.mimeType === DOC),
        )
        .map(async (f) =>
          f.mimeType === FOLDER
            ? this.folder(f.id!, context)
            : { id: f.id!, title: f.name!, type: "document" as const },
        ),
    );
    return {
      id: meta.data.id ?? id,
      title: meta.data.name ?? "Wiki",
      type: "folder",
      children,
    };
  }
  async getDocument(id: string, context: AccessContext): Promise<WikiDocument> {
    const { docs } = this.clients(context);
    const res = await this.providerRequest(
      docs.documents.get({ documentId: id }),
    );
    const blocks: WikiDocument["blocks"] = [];
    for (const item of res.data.body?.content ?? []) {
      const p = item.paragraph;
      if (!p) continue;
      const content: WikiInline[] = [];
      for (const el of p.elements ?? []) {
        const run = el.textRun;
        if (!run?.content) continue;
        content.push({
          text: run.content.replace(/\n$/, ""),
          bold: run.textStyle?.bold ?? undefined,
          italic: run.textStyle?.italic ?? undefined,
          href: run.textStyle?.link?.url ?? undefined,
        });
      }
      if (!content.some((x) => x.text)) continue;
      const style = p.paragraphStyle?.namedStyleType;
      if (style?.startsWith("HEADING_")) {
        const level = Math.min(4, Math.max(1, Number(style.slice(8)) || 2)) as
          1 | 2 | 3 | 4;
        blocks.push({ type: "heading", level, content });
      } else blocks.push({ type: "paragraph", content });
    }
    return {
      id,
      title: res.data.title ?? "Untitled",
      blocks,
      editUrl: `https://docs.google.com/document/d/${id}/edit`,
    };
  }
  async search(query: string, context: AccessContext): Promise<SearchResult[]> {
    const { drive } = this.clients(context);
    const safe = query.replace(/'/g, "\\'");
    const res = await this.providerRequest(
      drive.files.list({
        q: `trashed = false and mimeType = '${DOC}' and fullText contains '${safe}'`,
        fields: "files(id,name,modifiedTime)",
        pageSize: 25,
      }),
    );
    return (res.data.files ?? [])
      .filter((f) => f.id && f.name)
      .map((f) => ({ id: f.id!, title: f.name! }));
  }
  async canAccess(id: string, context: AccessContext): Promise<boolean> {
    try {
      const { drive } = this.clients(context);
      await this.providerRequest(drive.files.get({ fileId: id, fields: "id" }));
      return true;
    } catch (error) {
      if (error instanceof ProviderAuthenticationError) throw error;
      return false;
    }
  }
}

function isUnauthorized(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;

  const candidate = error as {
    code?: number | string;
    status?: number;
    response?: { status?: number };
  };
  return (
    candidate.code === 401 ||
    candidate.code === "401" ||
    candidate.status === 401 ||
    candidate.response?.status === 401
  );
}
