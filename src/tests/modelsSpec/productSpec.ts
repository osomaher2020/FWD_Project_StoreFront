import {Product, ProductObj} from "../../models/product.model";


describe("Product Model", () => {

    const product = new Product();

    // index
    it("Product: index is defined", () => {
        expect(product.index()).toBeDefined();
    });

    // create
    it("create Product", async () => {
        const result: ProductObj = await product.create({
            name: "tomato",
            price: 15.25,
            category: "vegetables"
        });

        expect(result).toEqual({
            id: 2,
            name: "tomato",
            price: 15.25,
            category: "vegetables"
        });
    });

    // show
    it("show Product:id", async () => {
        const result: (ProductObj | null) = await product.show(2);

        expect(result).toEqual({
            id: 2,
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
                    id: 2,
                    name: "tomato",
                    price: 15.25,
                    category: "vegetables"
                }
            ]
        );
    });
});