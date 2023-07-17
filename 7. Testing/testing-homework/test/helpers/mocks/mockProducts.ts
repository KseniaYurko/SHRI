import { render } from "@testing-library/react";
import React from "react";

import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import { commerce } from "faker";
import { Product } from "../../../src/common/types";

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

  const products = initProducts();
  export default products;