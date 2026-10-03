import type {
  AccessContext,
  SearchResult,
  WikiDocument,
  WikiTree,
} from "./types";
export interface KnowledgeProvider {
  getTree(context: AccessContext): Promise<WikiTree>;
  getDocument(id: string, context: AccessContext): Promise<WikiDocument>;
  search(query: string, context: AccessContext): Promise<SearchResult[]>;
  canAccess(id: string, context: AccessContext): Promise<boolean>;
}
