import { TranslateResult } from 'vue-i18n';
import { markdown } from 'markdown';

export class PlatformService {

    // @ts-ignore
    private platform: string;

    constructor() {
        this.setPlatform();
    }

    private setPlatform() {
        this.platform = process.platform;
    }

    public getMeta(): string {
        return this.platform !== 'darwin' ? 'CTRL' : 'CMD';
    }

    public getLabel(meta: boolean, ...keys: string[]): string {
        return (meta ? this.getMeta() : '') + keys.join(' ');
    }

    public getHelp(key: TranslateResult) {

        return markdown.toHTML(key
                .toString()
                .replace(/[ ]{2,}/g, '')
        );

    }

}
