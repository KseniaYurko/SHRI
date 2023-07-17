import { render } from "@testing-library/react";
import React from "react";

import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { CartApi, ExampleApi } from "../../src/client/api";
import { Application } from "../../src/client/Application";

import { initStore } from "../../src/client/store";

import mockProducts from "./mocks/mockProducts";
import { commerce } from "faker";
import { Product } from "../../src/common/types";
import products from "./mocks/mockProducts";


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

// const products: Product[] = initProducts();
interface renderTestAppProps {
  initialRoute?: string;
}

const renderTestApp = ({ initialRoute = "/" }: renderTestAppProps) => {
  const basename = "/hw/store";

  const api = new ExampleApi(basename);

  api.getProducts = (): any => {
    return Promise.resolve({ data: products})
  }
  api.getProductById = (): any => {
    return Promise.resolve({ data: { 
        id: 1,
        name: `${commerce.productAdjective()} ${commerce.product()}`,
        description: commerce.productDescription(),
        price: Number(commerce.price()),
        color: commerce.color(),
        material: commerce.productMaterial(),
    }});
  }
  api.checkout = (): any => {
    return Promise.resolve({});
  }

  const cart = new CartApi();
  const store = initStore(api, cart);

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <Application />
      </MemoryRouter>
    </Provider>
  );
};

export default renderTestApp;