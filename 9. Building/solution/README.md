# Шаблон для выполнения домашнего задания по Webpack

## Что делать?

Любой проект нуждается в текстах, но хранить их в коде не удобно (и практически не возможно, если нам нужно перевести проект на несколько языков). В связи с этим фразы вынесены в отдельные файлы, и в процессе сборки вставляются в код.

Вам нужно добавить в свою сборку:

1. Настроить webpack-конфиг для проекта.
2. Написать свой собственный loader, который будет брать значения ключей из файла `i18n.json` и вставлять в итоговый bundle.

#### Примечания:
1. Файлы проекта трогать нельзя. Только webpack-конфиг и код loader'a.
2. Код loader'а нужно поместить в файл `loaders/i18n-loader.cjs`.
3. В качестве результата необходимо отправить весь архив с вашим кодом, без node_modules.
4. package.json менять нельзя

Полезные ссылки:
https://webpack.js.org/contribute/writing-a-plugin/
https://webpack.js.org/api/compiler-hooks

О чем нужно подумать:
- использование асинхронного/синхронного `fs`
- кастомизация и переиспользование плагина другими людьми
- модулей может быть много (10^3), нужно выбрать правильный алгоритм, лимит на сборку 10с