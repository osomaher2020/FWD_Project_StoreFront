import {User, UserObj} from "../../models/user.model";


describe("User Model", () => {

    const user = new User();

    it("index is defined", () => {
        expect(user.index()).toBeDefined();
    });

    it("create User", async () => {
        const result: UserObj = await user.create({
            first_name: "osama",
            last_name: "maher",
            password: "123"
        });

        expect(result).toEqual({
            id: 1,
            first_name: "osama",
            last_name: "maher"
        });
    });
});