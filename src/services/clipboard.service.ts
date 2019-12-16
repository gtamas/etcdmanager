import store from '@/store';
import Messages from '@/lib/messages';

export class ClipboardService {
    constructor() {}

    public copyToClipboard(value: any) {
        navigator.clipboard.writeText(value).then(
            () => {
                store.commit(
                    'message',
                    Messages.success('common.messages.copyClipboardSuccess')
                );
            },
            () => {
                store.commit(
                    'message',
                    Messages.error('common.messages.copyClipboardError')
                );
            }
        );
    }
}
