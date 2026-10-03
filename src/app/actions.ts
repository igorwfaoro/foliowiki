"use server";

import { signIn, signOut } from "@/auth";
import { getSafeRedirectPath } from "@/auth/redirect";

export async function signInWithGoogle(formData: FormData) {
  await signIn("google", {
    redirectTo: getSafeRedirectPath(formData.get("callbackUrl")),
  });
}

export async function signOutOfFolioWiki() {
  await signOut({ redirectTo: "/" });
}
