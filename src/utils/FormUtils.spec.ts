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
});