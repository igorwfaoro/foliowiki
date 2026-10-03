import Link from "next/link";
import { signOutOfFolioWiki } from "@/app/actions";
import { auth } from "@/auth";

export default async function OnboardingPage() {
  const session = await auth();
  const name = session?.user?.name?.trim();

  return (
    <main className="auth-page">
      <Link className="brand" href="/">
        Folio<span>Wiki</span>
      </Link>
      <section className="auth-panel onboarding-panel">
        <div className="eyebrow">ACCOUNT CONNECTED</div>
        <h1>{name ? `Welcome, ${name}.` : "Welcome to FolioWiki."}</h1>
        <p>
          Your Google account is connected. FolioWiki will use your existing
          Drive permissions whenever it reads your wiki.
        </p>
        <div className="onboarding-actions">
          <Link className="primary" href="/wiki">
            Continue to your wiki
          </Link>
          <form action={signOutOfFolioWiki}>
            <button className="text-button" type="submit">
              Sign out
            </button>
          </form>
        </div>
        {!process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID ? (
          <p className="auth-note">
            This self-hosted instance still needs a default Drive folder. Ask
            its administrator to configure{" "}
            <code>GOOGLE_DRIVE_ROOT_FOLDER_ID</code>.
          </p>
        ) : null}
      </section>
    </main>
  );
}
