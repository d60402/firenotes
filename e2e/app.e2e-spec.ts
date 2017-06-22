import { FirenotesPage } from './app.po';

describe('firenotes App', () => {
  let page: FirenotesPage;

  beforeEach(() => {
    page = new FirenotesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
