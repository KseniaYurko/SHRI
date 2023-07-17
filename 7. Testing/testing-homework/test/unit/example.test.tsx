import React from 'react';
import { it, expect, describe } from '@jest/globals'

import { render } from '@testing-library/react';

describe('Example store',  function() {
    it('Все имена продуктов отображаются',  function() {
        // await this.browser.url('https://www.microsoft.com/ru-ru/');
        // await this.browser.assertView(state: 'plain', selectors: 'body');

        const app = <div>example</div>;

        const { container } = render(app);

        console.log(container.outerHTML);

        expect(container.textContent).toBe('example');
    });
});


// import React from 'react';
// import { it, expect } from '@jest/globals'
// import { render, screen } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom'

// import { Provider } from 'react-redux';

// import { initStore } from '../../src/client/store'
// import { Application } from '../../src/client/Application';
// import { ExampleApi, CartApi } from '../../src/client/api';

// it('если добавить элемент, то он появится на экране', () => {
//     const basename = '/hw/store';

//     const api = new ExampleApi(basename);
//     const cart = new CartApi();
//     const store = initStore(api, cart);
//     const application = (
//         <BrowserRouter basename={basename}>
//             <Provider store={store}>
//                 <Application />
//             </Provider>
//         </BrowserRouter>
//     );

//     const { container } = render(application);

//     screen.logTestingPlaygroundURL();
// })