import Link from "next/link";
import { signOutOfFolioWiki } from "@/app/actions";
import { auth } from "@/auth";

export default async function WikiPage() {
  const session = await auth();

  return (
    <main className="workspace-page">
      <header className="workspace-nav">
        <Link className="brand" href="/">
          Folio<span>Wiki</span>
        </Link>
        <div className="workspace-account">
          <span>{session?.user?.email}</span>
          <form action={signOutOfFolioWiki}>
            <button className="text-button" type="submit">
              Sign out
            </button>
          </form>
        </div>
      </header>
      <section className="workspace-content">
        <div className="eyebrow">YOUR KNOWLEDGE BASE</div>
        <h1>Your wiki workspace</h1>
        <p>
          You are signed in. FolioWiki checks your Google Drive access before
          serving wiki content, so your source permissions remain authoritative.
        </p>
        {!process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID ? (
          <div className="auth-message" role="status">
            A Drive root folder has not been configured for this instance yet.
            Ask its administrator to set{" "}
            <code>GOOGLE_DRIVE_ROOT_FOLDER_ID</code>.
          </div>
        ) : (
          <p className="workspace-note">
            Your Drive root is configured. Folder and document navigation will
            appear here as the wiki experience is completed.
          </p>
        )}
      </section>
    </main>
  );
}
