import { 
    ProductShortInfo,
    Product,
    CheckoutFormData,
    CartState,
    CheckoutResponse,
} from "../../../src/common/types";
import { commerce } from "faker";
import mockProducts from "./mockProducts";
import { ExampleApi } from "../../../src/client/api";

function initProducts(): Product[] {
    const products: Product[] = []

    for(let id = 0; id < 10; id++) {
        products.push({
            id,
            name: `${commerce.productAdjective()} ${commerce.product()}`,
            description: commerce.productDescription(),
            price: Number(commerce.price()),
            color: commerce.color(),
            material: commerce.productMaterial(),
        });
    }

    return products;
}


export class mockExampleApi{
    constructor(private readonly basename: string) {
    }

    async getProducts() {
        // const products: ProductShortInfo[] = initProducts();
        return Promise.resolve({data: initProducts()});
    }

    async getProductById(id: number) {
        const product: Product = { 
            id,
            name: `${commerce.productAdjective()} ${commerce.product()}`,
            description: commerce.productDescription(),
            price: Number(commerce.price()),
            color: commerce.color(),
            material: commerce.productMaterial(),
        }
        return Promise.resolve(product);
    }

    async checkout(form: CheckoutFormData, cart: CartState) {
        const checkoutResponse: CheckoutResponse = { id: 1 };
        return checkoutResponse;    }
}

