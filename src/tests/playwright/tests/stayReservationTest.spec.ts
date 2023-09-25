// Assuming this is being imported from an infrastructure npm package.
import { test, expect, components } from '../../../infra';
import { MainPage } from '../pages/mainPage';
import { ListingPage } from '../pages/listingPage';
import { ReservationPage } from '../pages/reservationPage';

test('Stay revervation test', async ({ page, context, dateUtils }) => {
  const searchDeatils: components.SearchDetails = {
    type: 'Stays',
    destination: 'Tokyo, Japan',
    checkInDate: dateUtils.getDate({ plusDays: 1 }),
    checkOutDate: dateUtils.getDate({ plusDays: 2 }),
    guests: { adults: 2, children: 1, infants: 0, pets: 0 },
  };

  // 1) Search for a Stay
  const mainPage = new MainPage(page);
  await mainPage.shell().search(searchDeatils);

  const searchResults = await mainPage.getSearchResults();

  // Confirming search results appear
  expect(searchResults.length).toBeGreaterThan(1);
  expect(searchResults[0].title).toBeTruthy();

  // 2) Select a Listing
  const highestRatedSearchResult = mainPage.getHighestRatedSearchResult(searchResults);
  const waitForNewTab = context.waitForEvent('page');
  await highestRatedSearchResult.locator.click();
  const newPage = await waitForNewTab;

  // 3) Confirm Booking Details
  const listingPage = new ListingPage(newPage);
  await listingPage.closeTranslationDialogIfAppears();

  // Getting details from 'Revervation sidebar'
  const checkInDate = await listingPage.reservationSidebar().getDate('checkIn');
  const checkOutDate = await listingPage.reservationSidebar().getDate('checkOut');
  const guestsCount = await listingPage.reservationSidebar().getGuestsCount();
  const guests = await listingPage.reservationSidebar().getGuests();

  expect(checkInDate).toEqual(searchDeatils.checkInDate);
  expect(checkOutDate).toEqual(searchDeatils.checkOutDate);
  expect(guestsCount).toBe(3);
  expect(guests).toEqual(searchDeatils.guests);

  // 4)	Adjust and Verify Guest Count
  const newGuests: components.Guests = { adults: 2, children: 0, infants: 0, pets: 0 };
  await listingPage.reservationSidebar().updateGuests(newGuests);

  // Adjusting listing guests
  const adjustedGuestsCount = await listingPage.reservationSidebar().getGuestsCount();
  const adjustedGuests = await listingPage.reservationSidebar().getGuests();

  expect(adjustedGuestsCount).toBe(2);
  expect(adjustedGuests).toEqual(newGuests);

  // 5) Change Booking Dates
  const adjustedCheckInDate = dateUtils.getDate({ plusDays: 7 }, checkInDate);
  const adjustedCheckOutDate = dateUtils.getDate({ plusDays: 7 }, checkOutDate);

  const isCheckInDateAvailable = await listingPage.reservationSidebar().isDateAvailable('checkIn', adjustedCheckInDate);
  const isCheckOutDateAvailable = await listingPage
    .reservationSidebar()
    .isDateAvailable('checkOut', adjustedCheckOutDate);

  if (isCheckInDateAvailable && isCheckOutDateAvailable) {
    await listingPage.reservationSidebar().updateDate('checkIn', adjustedCheckInDate);
    await listingPage.reservationSidebar().updateDate('checkOut', adjustedCheckOutDate);
  }

  // 6) Reserve and Validate
  await listingPage.reservationSidebar().clickReserveButton();
  const reservationPage = new ReservationPage(newPage);

  const isReservationUrl = reservationPage.url().isPathIncludes('stays');
  const urlNumOfAdultsParam = Number(reservationPage.url().getQueryParam('numberOfAdults'));

  expect(isReservationUrl).toBeTruthy();
  expect(urlNumOfAdultsParam).toEqual(adjustedGuests.adults);
});
