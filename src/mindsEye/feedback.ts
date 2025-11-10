import * as Sentry from "@sentry/node";

export function handleError(err: any) {
  const eventId = Sentry.captureException(err);

  return {
    content: [
      {
        type: "text",
        text: [
          "**Error**",
          "There was a problem with your request.",
          `**Event ID**: ${eventId}`,
          process.env.NODE_ENV !== "production" ? String(err?.message ?? err) : ""
        ].join("\n\n"),
        isError: true
      }
    ]
  };
}
