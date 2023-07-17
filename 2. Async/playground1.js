"use strict";

((global) => {
  const addTimeout = (fn) => {
    return () => {
      setTimeout(() => {
        fn();
      }, 100 * Math.random());
    };
  };

  const addRandomError = (fn, result) => {
    return () => {
      const isError = Math.random() <= 0.2;

      if (isError) {
        fn(new Error("Something went wrong"), null);
      } else {
        fn(null, result);
      }
    };
  };

  const getModifiedCallback = (fn, result) => {
    return addTimeout(addRandomError(fn, result));
  };

  class Entity {
    constructor(name, isActive) {
      this.getName = (callback) => {
        getModifiedCallback(callback, name)();
      };

      this.checkIsActive = (callback) => {
        getModifiedCallback(callback, isActive)();
      };
    }
  }

  class Category extends Entity {
    constructor(name, status, children) {
      super(name, status);

      this.getChildren = (callback) => {
        getModifiedCallback(callback, children)();
      };
    }
  }

  class Product extends Entity {
    constructor(name, status, price) {
      super(name, status);

      this.getPrice = (callback) => {
        getModifiedCallback(callback, price)();
      };
    }
  }

  global.Product = Product;
  global.Category = Category;
})(typeof window === "undefined" ? global : window);

// SOLUTION ----------------------------------------------------------------------------//
async function solution({ minPrice, maxPrice, catalog }) {
  const getData = async (method) => {
    let result;

    while (!result) {
      try {
        result = await new Promise((resolve, reject) => {
          method((error, data) => {
            if (error) {
              reject(error);
            } else {
              resolve(data);
            }
          });
        });
        return result;
      } catch (error) {}
    }
  };

  async function retrieveProductData(product) {
    try {
      const isActive = await getData(product.checkIsActive);
      const productPrice = await getData(product.getPrice);
      const productName = await getData(product.getName);

      if (isActive && productPrice >= minPrice && productPrice <= maxPrice) {
        return await { name: productName, price: productPrice };
      }
    } catch (error) {
      console.log("error in retrieve prod");
    }
  }

  async function retrieveCategoryData(category) {
    try {
      const isActive = await getData(category.checkIsActive);
      const children = await getData(category.getChildren);

      if (isActive) {
        const childPromises = children.map((child) => {
          if (child instanceof Product) {
            return retrieveProductData(child);
          } else {
            return retrieveCategoryData(child);
          }
        });

        const settledPromises = await Promise.allSettled(childPromises);
        const filteredPromises = settledPromises
          .filter(
            (result) =>
              result.status === "fulfilled" &&
              result.value !== undefined &&
              Object.keys(result.value).length > 0
          )
          .map((result) => result.value);

        const flattenedResults = filteredPromises.flatMap((result) => result);
        const sortedResults = flattenedResults.sort((a, b) => {
          if (a.price === b.price) {
            return a.name.localeCompare(b.name);
          }
          return a.price - b.price;
        });

        return sortedResults;
      }
    } catch (error) {
      console.log("error in retrieve category");
    }
  }
  // ------------------------------------------------------------------------------------//
  return retrieveCategoryData(catalog);

}

module.exports = solution;

// проверка решения
const input = {
  minPrice: 300,
  maxPrice: 1500,
  catalog: new Category("Catalog", true, [
    new Category("Electronics", true, [
      new Category("Smartphones", true, [
        new Product("Smartphone 1", true, 1000),
        new Product("Smartphone 2", true, 900),
        new Product("Smartphone 3", false, 900),
        new Product("Smartphone 4", true, 900),
        new Product("Smartphone 5", true, 900),
      ]),
      new Category("Laptops", true, [
        new Product("Laptop 1", false, 1200),
        new Product("Laptop 2", true, 900),
        new Product("Laptop 3", true, 1500),
        new Product("Laptop 4", true, 1600),
      ]),
    ]),
    new Category("Books", true, [
      new Category("Fiction", false, [
        new Product("Fiction book 1", true, 350),
        new Product("Fiction book 2", false, 400),
      ]),
      new Category("Non-Fiction", true, [
        new Product("Non-Fiction book 1", true, 250),
        new Product("Non-Fiction book 2", true, 300),
        new Product("Non-Fiction book 3", true, 400),
      ]),
    ]),
  ]),
};

const answer = [
  { name: "Non-Fiction book 2", price: 300 },
  { name: "Non-Fiction book 3", price: 400 },
  { name: "Laptop 2", price: 900 },
  { name: "Smartphone 2", price: 900 },
  { name: "Smartphone 4", price: 900 },
  { name: "Smartphone 5", price: 900 },
  { name: "Smartphone 1", price: 1000 },
  { name: "Laptop 3", price: 1500 },
];

// solution(input).then((result) => {
//   console.log("FINAL", result);
// });

solution(input).then((result) => {
  const isAnswerCorrect = JSON.stringify(answer) === JSON.stringify(result);

  if (isAnswerCorrect) {
    console.log("OK");
  } else {
    console.log("WRONG");
  }
});
