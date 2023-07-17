'use strict';

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'sorting imports in the file',
      recommended: true,
    },
    fixable: 'code',
    parser: require.resolve('@typescript-eslint/parser'),
  },

  create(context) {
    function isImportDeclaration(node) {
      return node.type === 'ImportDeclaration';
    }

    function groupImports(imports) {
      const groups = {
        scoped: [],
        npm: [],
        relative1: [],
        relative2: [],
        dynamic: [],
      };

      imports.forEach((node) => {
        const source = node.source.value;

        if (source.startsWith('@') || source.includes('/')) {
          if (source.startsWith('@')) {
            groups.scoped.push(node);
          } else if (source.startsWith('.')) {
            groups.relative2.push(node);
          } else {
            groups.relative1.push(node);
          }
        } else if (source.startsWith('import(')) {
          groups.dynamic.push(node);
        } else {
          groups.npm.push(node);
        }
      });

      return groups;
    }

    function sortImports(groups) {
      const sortedGroups = Object.keys(groups).reduce((result, key) => {
        const group = groups[key].sort((a, b) => {
          const sourceA = a.source.value.toLowerCase();
          const sourceB = b.source.value.toLowerCase();
          return sourceA.localeCompare(sourceB);
        });

        result.push(group);
        return result;
      }, []);

      return sortedGroups;
    }

    return {
      Program(node) {
        const imports = [];

        node.body.forEach((statement) => {
          if (isImportDeclaration(statement)) {
            imports.push(statement);
          }
        });

        const groupedImports = groupImports(imports);
        const sortedImports = sortImports(groupedImports);
        const targetImports = [];

        sortedImports.forEach((group, index) => {
          if (index > 0) {
            targetImports.push('\n');
          }

          group.forEach((element) => {
            const sourceCode = context.getSourceCode();
            const leadingComments = sourceCode.getCommentsBefore(element);

            const importString = `${leadingComments.map((comment) => comment.value).join('\n')}${sourceCode.getText(element)}\n`;
            targetImports.push(importString);
          });
        });

        const originalImports = imports.map((element) => context.getSourceCode().getText(element)).join('');
        const stringTargetImports = targetImports.join('');
        console.log('stringTarget', stringTargetImports);
        console.log('ORIGINAL', originalImports);

        if (stringTargetImports === originalImports) {
          context.report({
            node: node,
            message: 'Imports should be sorted.',
            fix: (fixer) => {
              return fixer.replaceTextRange([imports[0].range[0], imports[imports.length - 1].range[1]], stringTargetImports);
            },
          });
        }
      },
    };
  },
};