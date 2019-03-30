import { FormUtils } from "./FormUtils";

describe("FormUtils", () => {

    describe("#isValidEmail", () => {
        it("returns true when email is valid", () => {
            expect(FormUtils.isValidEmail("test@gmail.com")).toBe(true);
        });

        it("returns false when email is invalid", () => {
            expect(FormUtils.isValidEmail("test@gmail.c")).toBe(false);
        });
    });

    describe("#isValidPassword", () => {
        it("returns true if the password has a length of 6 characters, has 1 digit and 1 special character", () => {
            expect(FormUtils.isValidPassword("h3llo!")).toBe(true);
            expect(FormUtils.isValidPassword("h3llo@")).toBe(true);
            expect(FormUtils.isValidPassword("h3llo#")).toBe(true);
            expect(FormUtils.isValidPassword("h3llo$")).toBe(true);
            expect(FormUtils.isValidPassword("h3llo%")).toBe(true);
        });

        it("returns false if the password doesn't have at least 6 characters", () => {
            expect(FormUtils.isValidPassword("hello")).toBe(false);
        });

        it("returns false if the password has the correct length and special character but no digits", () => {
            expect(FormUtils.isValidPassword("hello!")).toBe(false);
        });

        it("returns false if the password has the correct length and at least 1 digit, but no special character", () => {
            expect(FormUtils.isValidPassword("h3llo0")).toBe(false);
        });
    });
});