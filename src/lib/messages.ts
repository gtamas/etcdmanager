import { i18n } from '@/main';

export default class Messages {
    public static error(error: string, translate: boolean = false) {
        return {
            text:  `${i18n.t('common.messages.error')}.
            Error: ${translate ? i18n.t(error) : error}`,
            color: 'error',
            show: true,
        };
    }
    public static success(message?: string) {
        const msg = i18n.t(message || 'common.messages.success');
        return {
            text: msg,
            color: 'success',
            show: true,
        };
    }
    public static message(msg: string) {
        return {
            text: i18n.t(msg),
            color: 'info',
            show: true,
        };
    }

}
