// module.exports = {
//     meta: {
//         type: "suggestion",
//         docs: {
//             description: "sorting imports in the file",
//             recommended: true,
//         },
//         fixable: "code",
//         parser: require.resolve('@typescript-eslint/parser'),
        
//     },
    
//     create(context) {
//         return {
//             Program(node) {
//                 const imports = [];
        
//                 node.body.forEach(statement => {
//                     if (isImportDeclaration(statement)) {
//                         imports.push(statement);
//                     }
//                 });
           

//                 const groupedImports = groupImports(imports);
//                 const sortedImports = sortImports(groupedImports);
//                 const targetImports = [];

//                 const val = Object.values(sortedImports);
//                 for(let i = 0; i < val.length; i++){
//                     if(i%2 != 0){
//                         val.splice(i, 0, "\n");
//                     }
//                 }


//                 val.forEach((group) => {
//                     let stringImport;
//                     if(typeof group != 'string' && group.length != 0){
//                         group.forEach((element) => {
                            
//                             stringImport = `import ${element.specifiers[0].local.name} from '${element.source.value}'\n`;
//                             targetImports.push(stringImport);
                            
//                         }) 

//                     } else if(typeof group == 'string') {
//                         targetImports.push(group);
//                     }
//                 });

//                 targetImports.flat().join('');
//                 console.log(targetImports.join(''));
//                 const stringTargetImports = targetImports.join('');
               
//                 if(stringTargetImports == originalImports){
//                     context.report({
//                         node: program,
//                         message: "Imports should be sorted.",
//                         fix: (fixer) => {
//                             return fixer.replaceTextRange([imports[0].range[0], imports[imports.length - 1].range[1]], targetImports);
//                         }
//                     });
//                 }
                                
//             }
//         }
//         function isImportDeclaration(node) {
//             return node.type === 'ImportDeclaration'; 
//           }
  
//           function groupImports(imports) {
//               const groups = {
//                 scoped: [],
//                 npm: [],
//                 relative1: [],
//                 relative2: [],
//                 dynamic: []
//               };
            
//               imports.forEach(node => {
//               const source = node.source.value;
          
//               if (source.startsWith('@') || source.includes('/')) {
//                   if (source.startsWith('@')) {
//                   groups.scoped.push(node);
//                   } else if (source.startsWith('.')) {
//                   groups.relative2.push(node);
//                   } else {
//                   groups.relative1.push(node);
//                   }
//               } else if (source.startsWith('import(')) {
//                   groups.dynamic.push(node);
//               } else {
//                   groups.npm.push(node);
//               }
//               })
          
//               return groups;
//           }
  
//           function sortImports(groups) {
//               const sortedGroups = Object.keys(groups).reduce((result, key) => {
//                   const group = groups[key].sort((a, b) => {
//                       const sourceA = a.source.value.toLowerCase();
//                       const sourceB = b.source.value.toLowerCase();
//                       return sourceA.localeCompare(sourceB);
//                   });
            
//                   result.push(group);
//                   return result;
//               }, []);
            
//               return sortedGroups;
//           }
//     }
// }


'use strict';

module.exports = {
    meta: {
      type: "suggestion",
      docs: {
        description: "sorting imports in the file",
        recommended: true,
      },
      fixable: "code",
      parser: require.resolve('@typescript-eslint/parser'),
    },
  
    create(context) {
      function isImportDeclaration(node) {
        return node.type === 'ImportDeclaration';
      }
  
      function sortImports(imports) {
        const sortedImports = imports.slice().sort((a, b) => {
          const sourceA = a.source.value.toLowerCase();
          const sourceB = b.source.value.toLowerCase();
          return sourceA.localeCompare(sourceB);
        });
  
        return sortedImports;
      }
  
      return {
        Program(node) {
          const imports = [];
  
          node.body.forEach(statement => {
            if (isImportDeclaration(statement)) {
              imports.push(statement);
            }
          });
  
          const sortedImports = sortImports(imports);
          const targetImports = sortedImports.map(importNode => context.getSourceCode().getText(importNode));
  
          const originalImports = imports.map(importNode => context.getSourceCode().getText(importNode)).join('\n');
          console.log('ORIG', originalImports);

          if (targetImports.join('\n') !== originalImports) {
            context.report({
              node: node,
              message: "Imports should be sorted.",
              fix: (fixer) => {
                return fixer.replaceTextRange([imports[0].range[0], imports[imports.length - 1].range[1]], targetImports.join('\n'));
              }
            });
          }
        }
      }
    }
  };  