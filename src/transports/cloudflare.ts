import * as Sentry from "@sentry/cloudflare";
import { OAuthProvider } from "@modelcontextprotocol/sdk/server/oauth.js";
import { MyMCP } from "./workerInstance";

export const getSentryConfig = (env: any) => ({
  dsn: env.SENTRY_DSN,
  tracesSampleRate: 1.0
});

const worker = new OAuthProvider({
  apiRoute: "/sse",
  apiHandler: MyMCP.mount("/sse"),
  authorizeEndpoint: "/authorize",
  tokenEndpoint: "/token",
  clientRegistrationEndpoint: "/register",
  defaultHandler: () => new Response("ok")
});

export const startCloudflare = () =>
  Sentry.withSentry(getSentryConfig, worker);
