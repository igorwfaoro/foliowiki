import { redirect } from "next/navigation";
import Link from "next/link";
import { signInWithGoogle } from "@/app/actions";
import { auth } from "@/auth";
import { getSafeRedirectPath } from "@/auth/redirect";

type SignInPageProps = {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const [session, params] = await Promise.all([auth(), searchParams]);
  const callbackUrl = getSafeRedirectPath(params.callbackUrl ?? null);

  if (session && !session.error) redirect(callbackUrl);

  const needsReauthentication =
    params.error === "reauth" || session?.error === "RefreshTokenError";
  const signInFailed = Boolean(params.error && params.error !== "reauth");

  return (
    <main className="auth-page">
      <Link className="brand" href="/">
        Folio<span>Wiki</span>
      </Link>
      <section className="auth-panel" aria-labelledby="signin-title">
        <div className="eyebrow">YOUR DRIVE, STILL YOURS</div>
        <h1 id="signin-title">Sign in to FolioWiki</h1>
        <p>
          Connect your Google account to browse the documents and folders you
          already have access to.
        </p>

        {needsReauthentication ? (
          <div className="auth-message" role="alert">
            Your Google authorization is no longer valid. Sign in again to
            reconnect your Drive.
          </div>
        ) : null}
        {signInFailed ? (
          <div className="auth-message" role="alert">
            Google sign-in could not be completed. Please try again.
          </div>
        ) : null}

        <form action={signInWithGoogle}>
          <input type="hidden" name="callbackUrl" value={callbackUrl} />
          <button className="primary auth-submit" type="submit">
            Continue with Google
          </button>
        </form>
        <p className="auth-note">
          FolioWiki reads your Drive structure and Google Docs. Your files and
          their original permissions stay in Google Drive.
        </p>
      </section>
    </main>
  );
}
