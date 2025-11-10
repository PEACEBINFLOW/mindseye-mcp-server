import * as Sentry from "@sentry/cloudflare";
import { McpAgent } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerAllTools } from "../tools/registerTool";
import * as MindsEye from "../mindsEye/core";

class MyMCPBase extends McpAgent {
  async onStart() {
    await MindsEye.init();
    registerAllTools(this.server, this.props);
  }
}

export const MyMCP = Sentry.instrumentDurableObjectWithSentry(
  (env) => ({ dsn: env.SENTRY_DSN }),
  MyMCPBase
);
