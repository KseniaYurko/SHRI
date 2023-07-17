const { RuleTester } = require("eslint");

const rule = require("./sort-imports");

const ruleTester = new RuleTester({
    parser: require.resolve('@typescript-eslint/parser'),
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module"
    },
});

ruleTester.run("sort-imports", rule, {
    valid: [
        //EXAMPLE 1
        {
            code: `
                import fs from 'fs';
                import _ from 'lodash';
                import path from 'path';
            `,
        },

        //EXAMPLE 2
        {
            code: `
                import {selectDeliveryDate} from '../../selectors';

                import type {ExperimentFlag} from '.';`,
        },

        //EXAMPLE 3
        {
            code: `
                import { selectDeliveryDate} from '../../selectors';

                import type {ExperimentFlag} from '.';
                import {calcDeliveryDate} from './helpers';
            `,
        },

        //EXAMPLE 4
        {
            code: `
                import { ClientBus, subscribe } from "@yandex-nirvana/bus";

                import { call } from "typed-redux-saga";
            `,
        },

        //EXAMPLE 5
        {
            code: `
            import { ClientBus, subscribe } from "@yandex-nirvana/bus";

            import { call } from "typed-redux-saga";
            
            import {selectDeliveryDate} from '../../selectors';
            
            import {calcDeliveryDate} from './helpers';
            `,
        },

        //EXAMPLE 6
        {
            code: `
            import { call } from "typed-redux-saga";

            import { pluralize } from "../../../../lib/utils";
            `,
        },

        //EXAMPLE 7
        {
            code: `
            import fs from 'fs';
            import _ from 'lodash';
            import path from 'path';
            
            const dynamic = import("my-dynamic-import");
            `,
        },

        //EXAMPLE 8
        {
            code: `
            import {defaultConfig} from "@shri2023/config";

            import _ from 'lodash';
            
            import {pluralize} from "../../../../lib/utils";
            
            import {calcDeliveryDate} from './helpers';
            `,
        },

        //EXAMPLE 9
        {
            code: `
            import {serviceSlug} from "@abc";
            import {solutions} from "@shri2023/solutions";
            import {hermione} from "@yandex";
            `,
        },

        //EXAMPLE 10
        {
            code: `
            // This module is imported for commons good
            import * as lodash from "lodash";
            
            import {relative} from "../../relative-package";
            `,
        },

        //EXAMPLE 11
        {
            code: `
            /**
             * This module is imported
             * for commons good
             */
            import * as lodash from "lodash";
            
            import {relative} from "../../relative-package";
            `,
        },

        //EXAMPLE 12
        {
            code: `
            import * as lodash from "lodash";

            // This module is imported for commons good
            // This module is imported for commons good
            // This module is imported for commons good
            import {relative} from "../../relative-package";
            `,
        },

        //EXAMPLE 13
        {
            code: `
            import fs from 'fs';
            import _ from 'lodash';
            import path from 'path';
            
            if(true) {
                const dynamic = import("my-dynamic-import");
                const dynamic2 = import("my-dynamic-import2");
            }
            `,
        },
    ],

    invalid: [
        //EXAMPLE 1
        {
            code: `
                import fs from 'fs';
                import path from 'path';
                
                import _ from 'lodash';
            `,
            errors: [
                {
                    message: "Expected imports to be sorted.",
                },
            ]
        },
    
        //EXAMPLE 2
        {
            code: `
            import type {ExperimentFlag} from '.';
            import {selectDeliveryDate} from '../../selectors';
            `,
        },
    
        //EXAMPLE 3
        {
            code: `
            import {selectDeliveryDate} from '../../selectors';
            import {calcDeliveryDate} from './helpers';
            import type {ExperimentFlag} from '.';
            `,
        },
    
        // //EXAMPLE 4
        // {
        //     code: `
        //     import { call } from "typed-redux-saga";
        //     import { ClientBus, subscribe } from "@yandex-nirvana/bus";
        //     `,
        // },
    
        // //EXAMPLE 5
        // {
        //     code: `
        //     import { ClientBus, subscribe } from "@yandex-nirvana/bus";
    
        //     import { call } from "typed-redux-saga";
            
        //     import {selectDeliveryDate} from '../../selectors';
            
        //     import {calcDeliveryDate} from './helpers';
        //     `,
        // },
    
        // //EXAMPLE 6
        // {
        //     code: `
        //     import { pluralize } from "../../../../lib/utils";
    
        //     import { call } from "typed-redux-saga";
        //     `,
        // },
    
        // //EXAMPLE 7
        // {
        //     code: `
        //     import fs from 'fs';
        //     const dynamic = import("my-dynamic-import");
        //     import _ from 'lodash';
        //     import path from 'path';
        //     `,
        // },
    
        // //EXAMPLE 8
        // {
        //     code: `
        //     import {pluralize} from "../../../../lib/utils";
        //     import {calcDeliveryDate} from './helpers';
        //     import {defaultConfig} from "@shri2023/config";
        //     import _ from 'lodash';
        //     `,
        // },
    
        // //EXAMPLE 9
        // {
        //     code: `
        //     import {hermione} from "@yandex";
        //     import {solutions} from "@shri2023/solutions";
        //     import {serviceSlug} from "@abc";
        //     `,
        // },
    
        // //EXAMPLE 10
        // {
        //     code: `
        //     import {relative} from "../../relative-package";
    
        //     // This module is imported for commons good
        //     import * as lodash from "lodash";
        //     `,
        // },
    
        // //EXAMPLE 11
        // {
        //     code: `
        //     import {relative} from "../../relative-package";
    
        //     /**
        //      * This module is imported
        //      * for commons good
        //      */
        //     import * as lodash from "lodash";
        //     `,
        // },
    
        // //EXAMPLE 12
        // {
        //     code: `
        //     // This module is imported for commons good
        //     // This module is imported for commons good
        //     // This module is imported for commons good
        //     import {relative} from "../../relative-package";
        //     import * as lodash from "lodash";
        //     `,
        // },
    
        // //EXAMPLE 13
        // {
        //     code: `
        //     import _ from 'lodash';
    
        //     import fs from 'fs';
            
        //     import path from 'path';
            
        //     if(true) {
        //         const dynamic = import("my-dynamic-import");
        //         const dynamic2 = import("my-dynamic-import2");
        //     `,
        // },
    ]
});