

export class FormUtils {

    private static readonly emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    private static readonly passwordPattern = /^[a-z\d[!@#$%]{6,}$/;
    private static readonly containsDigit = /.*\d+.*/;
    private static readonly containsSpecialCharacter = /.*[!@#$%]+.*/;
    static readonly INVALID_PASSWORD_MESSAGE = "requires at least 6 characters with 1 number and a special character (!@#$%)";

    static isValidEmail(email: string): boolean {
        return FormUtils.emailPattern.test(String(email).toLowerCase());
    }

    static isValidPassword(password: string): boolean {
        return FormUtils.passwordPattern.test(password.toLowerCase())
            && FormUtils.containsDigit.test(password.toLowerCase())
            && FormUtils.containsSpecialCharacter.test(password.toLowerCase());
    }
}