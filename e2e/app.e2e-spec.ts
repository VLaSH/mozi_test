import { MoziTestPage } from './app.po';

describe('mozi-test App', function() {
  let page: MoziTestPage;

  beforeEach(() => {
    page = new MoziTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
