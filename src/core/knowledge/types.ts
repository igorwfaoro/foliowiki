export type AccessContext = { userId?: string; accessToken?: string };
export type WikiTreeNode = {
  id: string;
  title: string;
  type: "folder" | "document";
  children?: WikiTreeNode[];
};
export type WikiTree = { root: WikiTreeNode };
export type WikiInline = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  href?: string;
};
export type WikiBlock =
  | { type: "heading"; level: 1 | 2 | 3 | 4; content: WikiInline[] }
  | { type: "paragraph"; content: WikiInline[] }
  | { type: "quote"; content: WikiInline[] }
  | { type: "code"; code: string; language?: string }
  | { type: "divider" };
export type WikiDocument = {
  id: string;
  title: string;
  blocks: WikiBlock[];
  editUrl?: string;
  updatedAt?: string;
};
export type SearchResult = {
  id: string;
  title: string;
  excerpt?: string;
  path?: string[];
};
