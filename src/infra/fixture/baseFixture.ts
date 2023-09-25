import { test as base } from '@playwright/test';
import { CustomOptions, defaults } from '../config/customOptions';
import { CustomFixtures, fixtures } from './customFixtures';

export const test = base.extend<CustomOptions & CustomFixtures>({
  // CustomOptions with a defaulte value, which is expected to be overriden by the ConfigBuilder.s
  testExecutionContext: [defaults.defaultTestExecutionContext, { option: true }],

  // Overriden fixtures
  page: async ({ page }, use) => {
    await page.goto('');

    await use(page);
  },

  // Custom fixtures
  dateUtils: [
    async ({}, use) => {
      const dateUtils = new fixtures.dateUtils();
      await use(dateUtils);
    },
    { scope: 'test' },
  ],
});

export { expect, request, type Locator, type Page } from '@playwright/test';
