export class ProviderAuthenticationError extends Error {
  constructor() {
    super("Knowledge provider authentication failed");
    this.name = "ProviderAuthenticationError";
  }
}
