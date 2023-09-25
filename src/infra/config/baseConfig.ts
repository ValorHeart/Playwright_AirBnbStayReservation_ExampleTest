import { defineConfig } from '@playwright/test';
import { CustomOptions } from './customOptions';

export default defineConfig<CustomOptions>({
  // Tests handling
  testMatch: /.*(test|spec)\.(js|ts|mjs)/,
  testDir: './tests',
  fullyParallel: true,
  maxFailures: 10,
  expect: {
    timeout: 15 * 1000,
  },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : 2,
  timeout: 5 * 60 * 1000,

  // Artifacts handling
  preserveOutput: 'always',
  outputDir: './execution-results/_test_results',
  reporter: [['list'], ['html', { outputFolder: './execution-results/_html_report', open: 'on-failure' }]],

  // Browser handling
  use: {
    acceptDownloads: true,
    actionTimeout: 15 * 1000,
    navigationTimeout: 15 * 1000,
    javaScriptEnabled: true,

    screenshot: { mode: 'only-on-failure', fullPage: true },
    trace: {
      mode: 'on',
      screenshots: true,
      snapshots: true,
      sources: true,
      attachments: true,
    },
    video: { mode: 'retain-on-failure' },
  },
});
