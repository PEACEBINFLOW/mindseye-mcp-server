import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerAllTools } from "../tools/registerTool";
import * as MindsEye from "../mindsEye/core";

const server = new McpServer({
  name: "MindsEye MCP",
  version: "0.1.0"
});

registerAllTools(server);

export async function startStdio() {
  await MindsEye.init();

  return await MindsEye.trace.startNewTrace(async () => {
    const transport = new StdioServerTransport();
    await server.connect(transport);
  });
}
