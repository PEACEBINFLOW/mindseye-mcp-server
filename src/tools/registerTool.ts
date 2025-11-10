import { z } from "zod";
import * as MindsEye from "../mindsEye/core";

export function registerAllTools(server: any, props?: any) {
  registerTool(server, "echo", { message: z.string() }, async ({ message }) => {
    return {
      content: [{ type: "text", text: `Echo: ${message}` }]
    };
  });

  registerTool(server, "divide", { a: z.number(), b: z.number() }, async ({ a, b }) => {
    const result = a / b;
    if (!Number.isFinite(result)) throw new Error("Divide by zero");

    return {
      content: [{ type: "text", text: `Result: ${result}` }]
    };
  }, props);
}

function registerTool(server, name, schema, handler, props?) {
  server.tool(name, `Tool: ${name}`, schema, async (args) => {
    return await MindsEye.trace.startNewTrace(async () => {
      return await MindsEye.trace.startSpan(
        {
          name: `mcp.tool/${name}`,
          attributes: MindsEye.analyzer.extractParams(args)
        },
        async () => {
          if (props) {
            MindsEye.context.setUser({
              username: props.login,
              email: props.email
            });
          }

          try {
            return await handler(args);
          } catch (err) {
            return MindsEye.feedback.handleError(err);
          }
        }
      );
    });
  });
}
