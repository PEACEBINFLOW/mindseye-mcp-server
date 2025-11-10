import * as Sentry from "@sentry/node";

export function setUser({ username, email }: { username: string; email?: string }) {
  Sentry.setUser({ username, email });
}
