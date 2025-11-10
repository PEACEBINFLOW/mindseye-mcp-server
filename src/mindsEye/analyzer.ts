export function extractParams(args: Record<string, any>) {
  return Object.fromEntries(
    Object.entries(args).map(([k, v]) => [`mcp.param.${k}`, JSON.stringify(v)])
  );
}
