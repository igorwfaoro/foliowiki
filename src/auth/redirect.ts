export function getSafeRedirectPath(
  value: FormDataEntryValue | string | null,
): string {
  if (
    typeof value !== "string" ||
    !value.startsWith("/") ||
    value.startsWith("//")
  ) {
    return "/onboarding";
  }

  try {
    const url = new URL(value, "https://foliowiki.invalid");
    if (url.origin !== "https://foliowiki.invalid") return "/onboarding";
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return "/onboarding";
  }
}
