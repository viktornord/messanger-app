import { MessangerPage } from './app.po';

describe('messanger App', function() {
  let page: MessangerPage;

  beforeEach(() => {
    page = new MessangerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
