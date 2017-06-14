import { KoensWebsiteV2Page } from './app.po';

describe('koens-website-v2 App', () => {
  let page: KoensWebsiteV2Page;

  beforeEach(() => {
    page = new KoensWebsiteV2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
