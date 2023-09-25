import { type Locator, type Page, components } from '../../../infra';
import { AppShell } from './appShell';

export class ListingPage {
  private page: Page;
  // Page locators
  private reservationSidebarContainer: Locator;
  // Translation dialog
  private translationDialogModal: Locator;
  private translationDialogCloseButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // Page Selectors
    this.reservationSidebarContainer = page.getByTestId('book-it-default');
    // Translation dialog
    this.translationDialogModal = page.getByRole('dialog', { name: 'Translation on' });
    this.translationDialogCloseButton = this.translationDialogModal.getByRole('button', { name: 'Close' });
  }

  shell(): AppShell {
    return new AppShell(this.page);
  }

  reservationSidebar(): components.ReservationSidebar {
    return new components.ReservationSidebar(this.reservationSidebarContainer);
  }

  async closeTranslationDialogIfAppears() {
    try {
      await this.translationDialogCloseButton.waitFor({ timeout: 5000 });
      await this.translationDialogCloseButton.click();
    } catch (err) {}
  }
}
