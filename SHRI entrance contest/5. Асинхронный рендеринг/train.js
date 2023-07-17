// async function temp(renderItems, n) {
//     // сортируем элементы по убыванию приоритета
//     renderItems.sort((a, b) => b.priority - a.priority);
  
//     const queue = []; // очередь с приоритетами
//     let res = []; // результат рендеринга
  
//     // добавляем элементы в очередь
//     for (let i = 0; i < renderItems.length; i++) {
//       if (!queue.length || queue[queue.length - 1].length >= n || queue[queue.length - 1][0].priority !== renderItems[i].priority) {
//         queue.push([renderItems[i]]);
//       } else {
//         queue[queue.length - 1].push(renderItems[i]);
//       }
//     }
  
//     // рендерим элементы из очереди
//     while (queue.length) {
//       const group = queue.shift();
//       const promises = [];
  
//       for (let i = 0; i < group.length; i++) {
//         promises.push(group[i].render());
//       }
  
//       await Promise.all(promises);
  
//       for (let i = 0; i < group.length; i++) {
//         res.push(group[i].id);
//       }
//     }
  
//     return res;
//   }



async(renderItems, n){
    let result  = [];
    const renderFunctions = renderItems
        .sort(({ priority }) => priority)
        .map(({ render }) => render);

    const groups = [];

    while (renderFunctions.length > 0) {
        const group = renderFunctions.splice(0, n)
        groups. push (group)
    }

    for (const group of groups) {
        await Promise.all(group).then((values) => {
            result = [... result, ... values]
        })
    }
    return result;
}

// console. log(renderAsync(renderItems));