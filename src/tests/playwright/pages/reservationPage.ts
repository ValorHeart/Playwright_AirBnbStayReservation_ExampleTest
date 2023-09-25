import { type Locator, type Page, utils } from '../../../infra';

export class ReservationPage {
  private page: Page;
  // Page locators

  constructor(page: Page) {
    this.page = page;
    // Page Selectors
  }

  url() {
    const urlUtils = new utils.UrlUtils(this.page.url());
    return urlUtils;
  }
}
