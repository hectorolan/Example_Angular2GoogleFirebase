import { OlanhGamesclasificadosAngularPage } from './app.po';

describe('olanh-gamesclasificados-angular App', function() {
  let page: OlanhGamesclasificadosAngularPage;

  beforeEach(() => {
    page = new OlanhGamesclasificadosAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
