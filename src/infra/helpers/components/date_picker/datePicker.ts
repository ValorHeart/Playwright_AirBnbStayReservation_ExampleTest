import { Locator } from '../../../fixture/baseFixture';
import { DateDetails } from '../../../utils/date_utils/dateUtils';

export type DatePickingType = 'checkIn' | 'checkOut';

export class DatePicker {
  // Locators
  private datePanelContainer: Locator;

  constructor(cotainer: Locator) {
    // Selectors
    this.datePanelContainer = cotainer;
  }

  async selectDate(type: DatePickingType, date: DateDetails) {
    await this.datePanelContainer.waitFor();

    await this.datePanelContainer.getByTestId(`calendar-day-${date.month}/${date.day}/${date.year}`).click();
  }

  async isDateAvailable(date: DateDetails): Promise<boolean> {
    await this.datePanelContainer.waitFor();

    const dateElement = this.datePanelContainer.getByTestId(`calendar-day-${date.month}/${date.day}/${date.year}`);

    const isDateAvailable = await dateElement.getAttribute('data-is-day-blocked');

    return isDateAvailable === 'false';
  }
}
