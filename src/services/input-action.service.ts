export class InputActionService {
    constructor() {}

    public getType(showPassword: boolean): string {
        return showPassword ? 'text' : 'password';
    }
}
