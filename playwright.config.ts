import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "html",

  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  projects: [
    {
      name: "chromium-ja",
      testIgnore: /i18n\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        locale: "ja-JP",
      },
    },
    {
      name: "chromium-en",
      testMatch: /i18n\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        locale: "en-US",
      },
    },
  ],

  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
