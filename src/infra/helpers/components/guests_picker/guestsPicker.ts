import { Locator } from '../../../fixture/baseFixture';

export interface Guests {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

export class GuestsPicker {
  private guestsPanelContainer: Locator;

  constructor(container: Locator) {
    this.guestsPanelContainer = container;
  }

  async setNumOfGuests(guests: Guests) {
    this.guestsPanelContainer.waitFor();

    await this.setGuests('adults', guests.adults);
    await this.setGuests('children', guests.children);
    await this.setGuests('infants', guests.infants);
    await this.setGuests('pets', guests.pets);
  }

  async getNumOfGuests(): Promise<Guests> {
    this.guestsPanelContainer.waitFor();

    const guests: Guests = {
      adults: await this.getGuests('adults'),
      children: await this.getGuests('children'),
      infants: await this.getGuests('infants'),
      pets: await this.getGuests('pets'),
    };
    return guests;
  }

  private async setGuests(type: string, numOfGuests: number) {
    let currentNumOfGuests = await this.getGuests(type);

    if (currentNumOfGuests < numOfGuests) {
      do {
        await this.increaseGuests(type);
        currentNumOfGuests = await this.getGuests(type);
      } while (currentNumOfGuests < numOfGuests);
    }

    if (currentNumOfGuests > numOfGuests) {
      do {
        await this.decreaseGuests(type);
        currentNumOfGuests = await this.getGuests(type);
      } while (currentNumOfGuests > numOfGuests);
    }
  }

  private async getGuests(type: string) {
    const searchPanelGuestsElement = this.guestsPanelContainer.getByTestId(`stepper-${type}-value`);
    if (await searchPanelGuestsElement.isVisible()) {
      return Number(await searchPanelGuestsElement.textContent());
    }

    const reservationSidebarGuestsElement = this.guestsPanelContainer.getByTestId(
      `GuestPicker-book_it-form-${type}-stepper-value`,
    );
    if (await reservationSidebarGuestsElement.isVisible()) {
      return Number(await reservationSidebarGuestsElement.textContent());
    }

    return -1;
  }

  private async increaseGuests(type: string) {
    const searchPanelGuestsElement = this.guestsPanelContainer.getByTestId(`stepper-${type}-increase-button`);
    if (await searchPanelGuestsElement.isVisible()) {
      await searchPanelGuestsElement.click();
    }

    const reservationSidebarGuestsElement = this.guestsPanelContainer.getByTestId(
      `GuestPicker-book_it-form-${type}-stepper-increase-button`,
    );
    if (await reservationSidebarGuestsElement.isVisible()) {
      await reservationSidebarGuestsElement.click();
    }
  }

  private async decreaseGuests(type: string) {
    const searchPanelGuestsElement = this.guestsPanelContainer.getByTestId(`stepper-${type}-decrease-button`);
    if (await searchPanelGuestsElement.isVisible()) {
      await searchPanelGuestsElement.click();
    }

    const reservationSidebarGuestsElement = this.guestsPanelContainer.getByTestId(
      `GuestPicker-book_it-form-${type}-stepper-decrease-button`,
    );
    if (await reservationSidebarGuestsElement.isVisible()) {
      await reservationSidebarGuestsElement.click();
    }
  }
}
