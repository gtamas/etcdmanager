export default class Messages {
    public static error(error: string) {
        return {
            text: `Could not perform operation.
            Error: ${error}`,
            color: 'error',
            show: true,
        };
    }
    public static success(message?: string) {
        const msg = message || 'Operation successful';
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
