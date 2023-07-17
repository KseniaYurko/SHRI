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
          return node.type === 'ImportDeclaration'; // Проверяем, является ли узел импортом
        }

        function groupImports(imports) {
            const groups = {
              scoped: [],
              npm: [],
              relative1: [],
              relative2: [],
              dynamic: []
            };
          
            imports.forEach(node => {
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
            })
        
            return groups;
        };

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
    
        // function getImportSource(node) {
        //   return node.source.value; // Получаем значение источника импорта
        // }
    
        // function isDynamicImport(importSource) {
        //   return importSource.startsWith('import('); // Проверяем, является ли импорт динамическим
        // }
    
        // function getImportGroup(importSource) {
        //   for (const group of importGroups) {
        //     if (group.pattern.test(importSource)) {
        //         // console.log(group.pattern.test(importSource));
        //       return group; // Возвращаем группу импорта, соответствующую паттерну
        //     }
        //   }
        //   return null; // Возвращаем null, если группа импорта не найдена
        // }
    
        // function isSorted(arr) {
        //   for (let i = 1; i < arr.length; i++) {
        //     if (arr[i] < arr[i - 1]) {
        //       return false; // Проверяем, отсортирован ли массив
        //     }
        //   }
        //   return true; // Возвращаем true, если массив отсортирован
        // }
    
        // function fixImports(node, imports) {
        //   if (!isSorted(imports)) {
        //     const sourceCode = context.getSourceCode();
        //     // console.log(sourceCode)
        //     const comments = sourceCode.getCommentsBefore(node);
        //     console.log(commrnts);
    
        //     const sortedImports = [...imports].sort(); // Сортируем импорты
        //     const sortedImportNodes = sortedImports.map(importName => {
        //       const specifier = node.specifiers.find(specifier => specifier.local.name === importName);
        //       if (specifier) {
        //         return sourceCode.getText(specifier); // Получаем текст спецификатора импорта
        //       }
        //       return null;
        //     });
    
            // context.report({
            //   node,
            //   message: 'Imports are not sorted.', // Сообщение об ошибке
            //   fix(fixer) {
            //     const importStatements = imports.map(importName => {
            //       const specifier = node.specifiers.find(specifier => specifier.local.name === importName);
            //       if (specifier) {
            //         return sourceCode.getText(specifier); // Получаем текст спецификатора импорта
            //       }
            //       return null;
            //     });
    
            //     const newImportStatement = `import {\n  ${sortedImportNodes.filter(Boolean).join(',\n  ')}\n} from '${getImportSource(node)}';`;
    
            //     return [
            //       fixer.replaceText(node, newImportStatement), // Заменяем импорт на новый отсортированный импорт
            //       fixer.insertTextBefore(node, comments.map(comment => comment.value).join('\n') + '\n') // Вставляем комментарии перед импортом
            //     ];
            //   }
            // });
        //   }
        // }
    
        return {
          Program(node) {
            const imports = [];
    
            node.body.forEach(statement => {
              if (isImportDeclaration(statement)) {
                imports.push(statement);
              }
            });
            console.log(imports);

            const groupedImports = groupImports(imports);
            const sortedImports = sortImports(groupedImports);
            console.log('SORTED', sortedImports);

            sortedImports.forEach((element) => {
                if (element[0]){
                    console.log('hi', element[0]);
                }
                
            })
    
            // if (imports.length > 0) {
            //   const importGrouped = imports.reduce((groups, importSource) => {
            //     const importGroup = getImportGroup(importSource);
            //     if (importGroup) {
            //       const groupIndex = groups.findIndex(group => group.name === importGroup.name);
            //       if (groupIndex !== -1) {
            //         groups[groupIndex].imports.push(importSource); // Добавляем импорт в группу
            //       } else {
            //         groups.push({
            //           name: importGroup.name,
            //           imports: [importSource]
            //         }); // Создаем новую группу с импортом
            //       }
            //     }
            //     return groups;
            //   }, []);
    
            //   importGrouped.forEach(group => fixImports(node, group.imports.flat())); // Исправляем импорты в каждой группе
            // }
          }
        };
      }
    };