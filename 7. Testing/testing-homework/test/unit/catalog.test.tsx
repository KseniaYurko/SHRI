import React from 'react'
import axios from 'axios'
import mockProducts from '../helpers/mocks/mockProductsAxios';
import renderTestApp from '../helpers/renderTestApp';
import '@testing-library/jest-dom'
import { queryAllByTestId, waitFor } from '@testing-library/react';
import { CartState, Product } from "../../src/common/types";
import { commerce } from "faker";
import { screen } from '@testing-library/dom'
import products from "../helpers/mocks/mockProducts";


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

// jest.mock('axios');

describe('Тестирование требований каталога', () => {
    test('Каталог должен отображать данные с сервера', async () => {
        // const products = initProducts();
        console.log(products);


        const { getAllByTestId } = renderTestApp({ initialRoute: "/catalog" });

        await waitFor(() => {
            for(const dataEl of products){
                const item = getAllByTestId(`${dataEl.id}`);
                expect(item.length).toBe(2);
                item.forEach((el) => {
                    expect(el).toBeInTheDocument();
                });
            }
        })  
    })

    test('Для каждого товара в каталоге отображается название, цена и ссылка на страницу с подробной информацией о товаре', async () => {
        // const products = initProducts();

        const { getAllByTestId } = renderTestApp({ initialRoute: "/catalog" });
        await waitFor(() => {
            for (const product of products) {
                
                const item = getAllByTestId(`${product.id}`);
                var re = new RegExp(
                    `<h5 class="ProductItem-Name card-title">${product.name}</h5>`
                );
                console.log(item[1].outerHTML);
                expect(item[1].outerHTML).toMatch(re);

                // expect(item.length).toBe(2);

                // item.forEach((el) => {
                //     const name = el.querySelector('.ProductItem-Name');
                //     const price = el.querySelector('.ProductItem-Price');
                //     const link = el.querySelector('.ProductItem-DetailsLink');
                //     console.log(name)
                //     expect(name).toHaveTextContent(product.name);
                //     expect(price).toHaveTextContent(`${product.price}`);
                //     expect(link).toHaveAttribute("href", `/catalog/${product.id}`);
                // });
            }
            
        
        });
    });
});
