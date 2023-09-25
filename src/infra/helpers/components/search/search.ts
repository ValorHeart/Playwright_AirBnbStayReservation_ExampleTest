import { test } from '../../../fixture/baseFixture';
import { Locator, Page } from '../../../fixture/baseFixture';
import { DateDetails } from '../../../utils/date_utils/dateUtils';
import { DatePicker, DatePickingType } from '../date_picker/datePicker';
import { Guests, GuestsPicker } from '../guests_picker/guestsPicker';

export interface SearchDetails {
  type: 'Stays' | 'Experiences';
  destination: string;
  checkInDate?: DateDetails;
  checkOutDate?: DateDetails;
  guests?: Guests;
}

export interface SearchResult {
  title: string;
  subtitle: string;
  rating: { score: number; ratings: number };
  locator: Locator;
}

export class Search {
  page: Page;
  // Search locators
  private searchIcon: Locator;
  private staysButton: Locator;
  private whereInput: Locator;
  private checkInButton: Locator;
  private checkOutButton: Locator;
  private whoButton: Locator;
  private searchButton: Locator;
  // Date picker
  private datePanelContainer: Locator;
  // Guests picker
  private guestsPanelContainer: Locator;

  constructor(page: Page, searchContaier: Locator) {
    this.page = page;
    // Search selectors
    this.searchIcon = searchContaier.getByTestId('little-search-icon');
    this.staysButton = searchContaier.getByTestId('header-tab-search-block-tab-STAYS');
    this.whereInput = searchContaier.getByTestId('structured-search-input-field-query');
    this.checkInButton = page.getByTestId('structured-search-input-field-split-dates-0');
    this.checkOutButton = page.getByTestId('structured-search-input-field-split-dates-1');
    this.whoButton = page.getByTestId('structured-search-input-field-guests-button');
    this.searchButton = searchContaier.getByTestId('structured-search-input-search-button');
    // Date picker
    this.datePanelContainer = page.getByTestId('structured-search-input-field-dates-panel');
    // Guests picker
    this.guestsPanelContainer = page.getByTestId('structured-search-input-field-guests-panel');
  }

  public async search(searchDetails: SearchDetails) {
    return test.step('Search', async () => {
      // Search
      await this.searchIcon.waitFor();
      await this.searchIcon.click();

      if (searchDetails.type === 'Stays') {
        await this.staysButton.click();
        if (searchDetails.checkInDate) await this.selectDate('checkIn', searchDetails.checkInDate);
        if (searchDetails.checkOutDate) await this.selectDate('checkOut', searchDetails.checkOutDate);
      }

      // TODO: Support Experiences

      await this.typeDestination(searchDetails.destination);
      if (searchDetails.guests) await this.setGuests(searchDetails.guests);

      await this.searchButton.click();
    });
  }

  private async typeDestination(destination: string) {
    await this.whereInput.waitFor();
    await this.whereInput.type(destination);
  }

  private async selectDate(type: DatePickingType, date: DateDetails) {
    if (type === 'checkIn' && (await this.checkInButton.getAttribute('aria-expanded')) === 'false') {
      await this.checkInButton.click();
    }
    if (type === 'checkOut' && (await this.checkOutButton.getAttribute('aria-expanded')) === 'false') {
      await this.checkOutButton.click();
    }
    const datePicker = new DatePicker(this.datePanelContainer);
    await datePicker.selectDate(type, date);
  }

  private async setGuests(guests: Guests) {
    await this.whoButton.click();
    const guestsPicker = new GuestsPicker(this.guestsPanelContainer);
    await guestsPicker.setNumOfGuests(guests);
  }
}
