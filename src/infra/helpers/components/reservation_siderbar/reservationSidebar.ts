import { Locator } from '../../../fixture/baseFixture';
import { DateDetails, DateUtils } from '../../../utils/date_utils/dateUtils';
import { DatePicker, DatePickingType } from '../date_picker/datePicker';
import { Guests, GuestsPicker } from '../guests_picker/guestsPicker';

export class ReservationSidebar {
  // Locators
  private reserveButton: Locator;
  // Date picker
  private datePanelContainer: Locator;
  private checkInDateSelector: Locator;
  private checkOutDateSelector: Locator;
  private datePanelCloseButton: Locator;
  // Guests picker
  private guestsSelector: Locator;
  private guestsPanelContainer: Locator;
  private guestsPanelCloseButton: Locator;

  constructor(container: Locator) {
    // Selectors
    this.reserveButton = container.getByRole('button', { name: 'Reserve' });
    // Date picker
    this.datePanelContainer = container.getByTestId('bookit-sidebar-availability-calendar');
    this.checkInDateSelector = container.getByTestId('change-dates-checkIn');
    this.checkOutDateSelector = container.getByTestId('change-dates-checkOut');
    this.datePanelCloseButton = this.datePanelContainer.getByRole('button', { name: 'Close' });
    // Guests picker
    this.guestsSelector = container.locator('css=#GuestPicker-book_it-trigger');
    this.guestsPanelContainer = container.locator('css=[aria-labelledby="GuestPicker-book_it-form"]');
    this.guestsPanelCloseButton = this.guestsPanelContainer.getByRole('button', { name: 'Close' });
  }

  async clickReserveButton() {
    await this.reserveButton.click();
  }

  // ---------- Dates ----------
  async getDate(type: DatePickingType): Promise<DateDetails> {
    let date: string = '';
    if (type === 'checkIn') date = (await this.checkInDateSelector.textContent()) || '';
    if (type === 'checkOut') date = (await this.checkOutDateSelector.textContent()) || '';

    const day = date.match('(\\d{1,2})\\/(\\d{1,2})\\/(\\d{4})')?.[2] || '';
    const month = date.match('(\\d{1,2})\\/(\\d{1,2})\\/(\\d{4})')?.[1] || '';
    const year = date.match('(\\d{1,2})\\/(\\d{1,2})\\/(\\d{4})')?.[3] || '';

    return new DateUtils().getDate({}, { day, month, year });
  }

  async updateDate(type: DatePickingType, date: DateDetails) {
    await this.openDatePanel(type);

    const datePicker = new DatePicker(this.datePanelContainer);

    await datePicker.selectDate(type, date);

    if (await this.datePanelCloseButton.isVisible()) await this.datePanelCloseButton.click();
  }

  async isDateAvailable(type: DatePickingType, date: DateDetails): Promise<boolean> {
    await this.openDatePanel(type);

    const datePicker = new DatePicker(this.datePanelContainer);

    const dateAvailability = await datePicker.isDateAvailable(date);

    await this.datePanelCloseButton.click();

    return dateAvailability;
  }

  private async openDatePanel(type: DatePickingType) {
    if (type === 'checkIn' && !(await this.datePanelContainer.isVisible())) {
      this.checkInDateSelector.waitFor();
      await this.checkInDateSelector.click();
    }
    if (type === 'checkOut' && !(await this.datePanelContainer.isVisible())) {
      this.checkInDateSelector.waitFor();
      await this.checkOutDateSelector.click();
    }
  }

  // ---------- Guests ----------
  async getGuestsCount(): Promise<number> {
    return Number((await this.guestsSelector.textContent())?.match('\\d+'));
  }

  async getGuests(): Promise<Guests> {
    await this.openGuestsPanel();

    const guestsPicker = new GuestsPicker(this.guestsPanelContainer);
    const guests = await guestsPicker.getNumOfGuests();

    await this.guestsPanelCloseButton.click();

    return guests;
  }

  async updateGuests(guests: Guests) {
    await this.openGuestsPanel();

    const guestsPicker = new GuestsPicker(this.guestsPanelContainer);
    await guestsPicker.setNumOfGuests(guests);

    await this.guestsPanelCloseButton.click();
  }

  private async openGuestsPanel() {
    if (!(await this.guestsPanelContainer.isVisible())) {
      await this.guestsSelector.waitFor();
      await this.guestsSelector.click();
    }
  }
}
