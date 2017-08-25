import { ProjectMarsColonyPage } from './app.po';

describe('project-mars-colony App', () => {
  let page: ProjectMarsColonyPage;

  beforeEach(() => {
    page = new ProjectMarsColonyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
