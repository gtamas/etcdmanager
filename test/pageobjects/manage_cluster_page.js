const BasePage = require('./base_page');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');


chai.should();
chai.use(chaiAsPromised);

class ManageClusterPage extends BasePage {


        async clickClusterMenu(){
            await this.app.client.$('div[data-test="menu.cluster.list-tile-title"]')
            .click();
            await this.app.client.waitUntilTextExists('div[data-test="health.title.toolbar-title"]','Cluster');
            await this.app.client.waitUntilTextExists('div[data-test="health.cluster-propName.card-title"]','etcd1');
        }

        async clickHealthClusterIcon(){
            await this.app.client.$('i[data-test="health.cluster-favorite.icon"]').click();
            await this.app.client.waitUntilTextExists('i[data-test="health.props-item-id.icon"]','check_circle');
        }

        async clickInfoIcon(){
            await this.app.client.$('i[data-test="health.cluster-info.icon"]').click();
            await this.app.client.waitUntilTextExists('div[data-test="health.cluster-dialogs-info-title.toolbar-title"]','Info');
        }

        async clickCloseBtn(){
            await this.app.client.$('button[data-test="health.cluster-dialogs-close.button"]').click();
        }
}

module.exports = ManageClusterPage;