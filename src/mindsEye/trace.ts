import * as Sentry from "@sentry/node";

export function startNewTrace(fn: Function) {
  return Sentry.startTransaction({ name: "mcp.session" }, () => fn());
}

export function startSpan({ name, attributes }, fn: Function) {
  return Sentry.startSpan({ name, attributes }, fn);
}
