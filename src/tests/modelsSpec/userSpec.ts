import {User, UserObj} from "../../models/user.model";


describe("User Model", () => {

    const user = new User();
    let newUserId: number;

    // index
    it("User: index is defined", () => {
        expect(user.index()).toBeDefined();
    });

    // create
    it("create User", async () => {
        const newUser: UserObj = await user.create({
            first_name: "osama",
            last_name: "maher",
            password: "123"
        });

        newUserId = newUser.id as number;

        expect(newUser).toEqual({
            id: newUserId,
            first_name: "osama",
            last_name: "maher"
        });
    });

    // authentiacte
    it("authentiacted User", async () => {
        const result: (UserObj | null) = await user.authenticate( "osama", "123" );

        expect(result).not.toBeNull();
    });
    it("not-authentiacted User returns null", async () => {
        const result: (UserObj | null) = await user.authenticate( "osamaaa", "789566" );

        expect(result).toBeNull();
    });

    // show
    it("show User returns UserObj", async () => {
        const result: (UserObj | null) = await user.show(newUserId);

        expect(result).toEqual({
            id: newUserId,
            first_name: "osama",
            last_name: "maher"
        });
    });

    // teardown
    afterAll(async ()=>{
        await user.deleteAll();
    });
});