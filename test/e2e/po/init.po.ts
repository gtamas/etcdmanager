import log from '../helpers/logger-decorator';
import { Helpers } from './../helpers/helpers';

export class InitialPage extends Helpers {

  private headerTextLocator = 'h1';

  @log
  public async getHeader() {
    return await this.getText(this.headerTextLocator);
  }

}
