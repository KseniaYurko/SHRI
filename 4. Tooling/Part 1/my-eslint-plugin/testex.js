import fs from 'fs';
import path from 'path';

import _ from 'lodash';


// function groupImports(imports) {
//     const groups = {
//       scoped: [],
//       npm: [],
//       relative1: [],
//       relative2: [],
//       dynamic: []
//     };
  
//     imports.forEach(node => {
//     const source = node.source.value;

//     if (source.startsWith('@') || source.includes('/')) {
//         if (source.startsWith('@')) {
//         groups.scoped.push(node);
//         } else if (source.startsWith('.')) {
//         groups.relative2.push(node);
//         } else {
//         groups.relative1.push(node);
//         }
//     } else if (source.startsWith('import(')) {
//         groups.dynamic.push(node);
//     } else {
//         groups.npm.push(node);
//     }
//     })

//     return groups;
// };

// function sortImports(groups) {
//     const sortedGroups = Object.keys(groups).reduce((result, key) => {
//         const group = groups[key].sort((a, b) => {
//             const sourceA = a.source.value.toLowerCase();
//             const sourceB = b.source.value.toLowerCase();
//             return sourceA.localeCompare(sourceB);
//         });
  
//         result.push(group);
//         return result;
//     }, []);
  
//     return sortedGroups;
// }

// function isSameOrder(originalImports, sortedImports) {
//     const originalOrder = originalImports.map(importNode => importNode.range[0]);
//     const groupedOrder = sortedImports.flat().map(importNode => importNode.range[0]);
//     return JSON.stringify(originalOrder) === JSON.stringify(groupedOrder);
// }

// function getNumberOfLinesBetween(left, right) {
//     return Math.max(right.loc.start.line - left.loc.end.line - 1, 0);
// }