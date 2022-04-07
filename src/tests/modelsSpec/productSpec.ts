import {Product, ProductObj} from "../../models/product.model";


describe("Product Model", () => {

    const product = new Product();

    let newProductId: number;

    // index
    it("Product: index is defined", () => {
        expect(product.index()).toBeDefined();
    });

    // create
    it("create Product", async () => {
        const newproduct: ProductObj = await product.create({
            name: "tomato",
            price: 15.25,
            category: "vegetables"
        });

        newProductId = newproduct.id as number;

        expect(newproduct).toEqual({
            id: newProductId,
            name: "tomato",
            price: 15.25,
            category: "vegetables"
        });
    });

    // show
    it("show Product:id", async () => {
        const result: (ProductObj | null) = await product.show(newProductId);

        expect(result).toEqual({
            id: newProductId,
            name: "tomato",
            price: 15.25,
            category: "vegetables"
        });
    });

    // category's products
    it("list a category products returns ProductObj[]", async () => {
        const result: ProductObj[] = await product.category_products("vegetables");

        expect(result).toEqual(
            [
                {
                    id: newProductId,
                    name: "tomato",
                    price: 15.25,
                    category: "vegetables"
                }
            ]
        );
    });


    // tearDown
    afterAll(async () => {
        await product.deleteAll();
    });
});