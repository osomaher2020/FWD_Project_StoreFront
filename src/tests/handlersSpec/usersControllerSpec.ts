import supertest from "supertest";
import app from "../../index";
import { User, UserObj } from "../../models/user.model";

describe("Users API endPoints", () => {

    const user = new User();

    const userObj: UserObj = {
        first_name: "osama",
        last_name: "maher",
        password: "123"
    };

    let userToken: any;

    beforeAll(async function (){
        const newUser: UserObj = await user.create(userObj);
        userObj.id = newUser.id;
    });

    it("user is Authorized", async () => {
        const auth_response = await supertest(app)
            .post("/users/authenticate")
            .set("content-type", "application/json")
            .send({
                first_name: userObj.first_name,
                password: userObj.password
            })
            .expect(200);

        const {token} = auth_response.body;
        userToken = token;
    });

    it("wrong Authorization returns 401", async () => {
        await supertest(app)
            .post("/users/authenticate")
            .set("content-type", "application/json")
            .send({
                first_name: userObj.first_name,
                password: "blablabla"
            })
            .expect(401);
    });

    // index
    it("/users gets list of UserObj[]", async () => {
        const result = await supertest(app)
            .get("/users")
            .set("content-type", "application/json")
            .set('Authorization', 'Bearer '+userToken);

        expect(result.status).toBe(200);

        const {first_name, last_name} = result.body[0];
        expect(first_name).toBe(userObj.first_name);
        expect(last_name).toBe(userObj.last_name);
    });

    // show
    it("Show specific user:id", async () => {
        const result = await supertest(app)
            .get(`/users/${userObj.id}`)
            .set("content-type", "application/json")
            .set('Authorization', 'Bearer '+userToken);

        expect(result.status).toBe(200);

        const {first_name, last_name} = result.body;
        expect(first_name).toBe(userObj.first_name);
        expect(last_name).toBe(userObj.last_name);
    });

    // create
    it("Create new user", async () => {

        const userObj2: UserObj = {
            first_name: "osama2",
            last_name: "maher2",
            password: "123"
        };

        const result = await supertest(app)
            .post("/users")
            .set("content-type", "application/json")
            .set('Authorization', 'Bearer '+userToken)
            .send(userObj2);

        expect(result.status).toBe(200);

        const {first_name, last_name} = result.body;
        expect(first_name).toBe(userObj2.first_name);
        expect(last_name).toBe(userObj2.last_name);
    });

    afterAll( async () => {
        await user.deleteAll();
    });
});