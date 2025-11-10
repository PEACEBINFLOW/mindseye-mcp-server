import { startCloudflare } from "./transports/cloudflare";
import { startStdio } from "./transports/stdio";

// Select based on your runtime
// startCloudflare();
startStdio(); // Local dev default
