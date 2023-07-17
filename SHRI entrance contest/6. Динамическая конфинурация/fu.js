const renderAsync = async (renderItems, n = 2) => {
    let result = []
    /* Получаем задачи в удобном формате без вложенности в порядке их перечисления */
    const getTasks = (renderItems = []) => {
      let res = []
      renderItems.forEach(val => {
        res.push(val)
        if (val.children || val.children?.length > 0) res = [...res, ...getTasks(val.children)]
      })
      return res
    }
  
    /* Сортируем и получаем только render-функции */
    const renderFunctions = getTasks(renderItems)
      .sort((a, b) => a.priority - b.priority)
      .map(({ render }) => render)
    
    /* Завязываемся на промисы, когда они срабатывают пушим в result id */
    renderFunctions.forEach((render) => {
      render().then(({ id }) => {
        console.log(id)
        result.push(id)
      })
    })
    
    /* Счетчик задач в работе <3 */
    let taskInProgress = 0
    /* Группируем в зависимости от того, сколько задач в работе :0 */
    const prepareTasks = () => {
      const currentTaskInProgress = n - taskInProgress
      const chunk = renderFunctions.splice(0, currentTaskInProgress)
      for (task of chunk) {
        taskInProgress += 1
        task()
      }
      return chunk
    }
    /* Сам движок, splice удаляет задачи */
    while (renderFunctions.length > 0) {
      const tasks = prepareTasks()
      /* Promise.race срабатывает тогда, когда в переданном массиве промисов 
        выполняется хоть один промисс. Если промис выполнен, тогда меняем наш счетчик, 
        а дальше проходимся дальше по циклу, запуская новые задачи
      */
      await Promise.race(tasks).then(() => {
        taskInProgress -= 1
      })
    }
    return result
  }
  
  renderAsync(renderItems, 5).then((val) => {
    console.log(val)
  })