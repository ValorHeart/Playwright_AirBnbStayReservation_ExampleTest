import { type Locator, type Page, components } from '../../../infra';
import { AppShell } from './appShell';

export class MainPage {
  private page: Page;
  // Page locators
  // Search results locatos
  private cardContaier: Locator;
  private cardTitle: Locator;
  private cardSubtitle: Locator;
  private cardRating: Locator;

  constructor(page: Page) {
    this.page = page;
    // Page Selectors
    // Search results selectors
    this.cardContaier = page.getByTestId('card-container');
    this.cardTitle = page.getByTestId('listing-card-title');
    this.cardSubtitle = page.getByTestId('listing-card-subtitle');
    this.cardRating = page.locator('xpath=//span[contains(@aria-label, "rating")]');
  }

  shell(): AppShell {
    return new AppShell(this.page);
  }

  async getSearchResults(): Promise<components.SearchResult[]> {
    await this.cardContaier.locator(this.cardRating).last().waitFor();

    const searchResults: components.SearchResult[] = [];

    for (const card of await this.cardContaier.all()) {
      const title = (await card.locator(this.cardTitle).textContent()) || '';
      const subtitle = (await card.locator(this.cardSubtitle).first().textContent()) || '';
      const rating =
        (await card.locator(this.cardRating).isVisible()) && (await card.locator(this.cardRating).textContent());
      const score = rating ? Number(rating.match('\\d\\.\\d{1,}')) : 0;
      const ratings = rating ? Number(rating.match('\\((\\d{1,})\\)')?.[1]) : 0;

      searchResults.push({
        title: title,
        subtitle: subtitle,
        rating: { score, ratings },
        locator: card,
      });
    }

    return searchResults;
  }

  getHighestRatedSearchResult(searchResults: components.SearchResult[]) {
    return searchResults.reduce(function (accumulator, searchResult, _, __) {
      const currentScore = searchResult.rating.score;
      const previousScore = accumulator.rating.score;

      return currentScore > previousScore ? searchResult : accumulator;
    }, searchResults[0]);
  }
}
