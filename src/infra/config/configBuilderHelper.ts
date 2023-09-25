import { type TestExecutionContext, type CustomOptions } from './customOptions';
import { devices, type Project, type PlaywrightTestConfig } from '@playwright/test';

export function setTextExecutionContext(
  config: PlaywrightTestConfig<CustomOptions>,
  testExecutionContext: TestExecutionContext,
) {
  // Each brower need to have it's own project, as per Playwright's architecture
  const projects: Project[] = [];

  for (const browser of testExecutionContext.browsers) {
    projects.push({
      name: browser,
      use: {
        baseURL: testExecutionContext.baseURL,
        ...devices[`Desktop ${browser}`],
        headless: testExecutionContext.headless,
      },
    });
  }

  config.projects = projects;

  return config;
}
