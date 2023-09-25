export class UrlUtils {
  private url: URL;
  private searchParams: URLSearchParams;

  constructor(url: string) {
    this.url = new URL(url);
    this.searchParams = new URLSearchParams(this.url.searchParams);
  }

  isPathIncludes(str: string) {
    return this.url.pathname.includes(str);
  }

  getQueryParam(param: string) {
    return this.searchParams.get(param);
  }
}
