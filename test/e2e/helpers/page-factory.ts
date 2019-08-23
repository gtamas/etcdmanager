import { Application } from 'spectron';

import { InitialPage } from '../po/init.po';

export interface Pages {
  initialPage: InitialPage;
}


export class PageFactory implements Pages {

  public initialPage: InitialPage;

  public initPages(app: Application) {
    return {
     initialPage: new InitialPage(app),
    };
  }
}
