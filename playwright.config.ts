import { defineConfig, devices } from "@playwright/test";

// Test your local code by default; set PLAYWRIGHT_BASE_URL to test the deployed demo instead
const externalBaseURL = process.env.PLAYWRIGHT_BASE_URL;
const baseURL = externalBaseURL ?? "http://localhost:3000";

// Optional: use an already-installed Chrome (set CHROME_PATH). Normally leave this unset.
const executablePath = process.env.CHROME_PATH;

export default defineConfig({
  testDir: "./e2e",
  timeout: 60_000,
  fullyParallel: false,
  workers: 1,
  reporter: "list",
  use: {
    baseURL,
    ...devices["Desktop Chrome"],
    launchOptions: executablePath ? { executablePath } : {},
  },
  // Starts the app automatically when testing locally (reuses it if already running)
  webServer: externalBaseURL
    ? undefined
    : {
        command: "npm run dev",
        url: "http://localhost:3000/students/list",
        reuseExistingServer: true,
        timeout: 120_000,
      },
});
