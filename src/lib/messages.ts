import { i18n } from '@/main';

export default class Messages {
    public static error(error: string) {
        return {
            text:  `${i18n.t('common.messages.error')}.
            Error: ${error}`,
            color: 'error',
            show: true,
        };
    }
    public static success(message?: string) {
        const msg = message || i18n.t('common.messages.success');
        return {
            text: msg,
            color: 'success',
            show: true,
        };
    }
    public static message(msg: string) {
        return {
            text: msg,
            color: 'info',
            show: true,
        };
    }

}
