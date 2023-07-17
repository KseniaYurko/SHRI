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