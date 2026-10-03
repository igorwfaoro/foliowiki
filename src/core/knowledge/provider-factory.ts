import { GoogleDriveProvider } from "@/providers/google/google-drive.provider";
export function createKnowledgeProvider() {
  const root = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID;
  if (!root) throw new Error("GOOGLE_DRIVE_ROOT_FOLDER_ID is not configured");
  return new GoogleDriveProvider(root);
}
