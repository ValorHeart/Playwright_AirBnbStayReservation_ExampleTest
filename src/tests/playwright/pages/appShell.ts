import { type Locator, type Page, components } from '../../../infra';

export class AppShell {
  private page: Page;
  // Page locators
  private headerContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    // Page Selectors
    this.headerContainer = page.getByTestId('QA_EXPLORE_HEADER');
  }

  async search(searchDetails: components.SearchDetails) {
    const search = new components.Search(this.page, this.headerContainer);
    await search.search(searchDetails);
  }
}
