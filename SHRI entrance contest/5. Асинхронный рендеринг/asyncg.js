const mockRender = (val) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(val)
      }, Math.floor(Math.random() * 100))
    })
  }
  
  const renderItems = [
    {
      'id': 'A',
      'priority': 1,
      'children': [
        {
          'id': 'A.1',
          'priority': 2,
          'children': [
            {
              'id': 'A.1.1',
              'priority': 2,
              'children': null,
            },
          ],
        },
      ],
    },
    {
      'id': 'B',
      'priority': 2,
      'children': [
        {
          'id': 'B.1',
          'priority': 3,
          'children': null,
        },
        {
          'id': 'B.2',
          'priority': 3,
          'children': null,
        },
        {
          'id': 'B.3',
          'priority': 3,
          'children': null,
        },
        {
          'id': 'B.4',
          'priority': 1,
          'children': null,
        },
        {
          'id': 'B.5',
          'priority': 1,
          'children': null,
        },
        {
          'id': 'B.6',
          'priority': 1,
          'children': null,
        },
      ],
    },
  ]
  
  renderItems[0].render = mockRender(renderItems[0])
  renderItems[0].children[0].render = mockRender(renderItems[0].children[0])
  renderItems[0].children[0].children[0].render = mockRender(renderItems[0].children[0].children[0])
  renderItems[1].render = mockRender(renderItems[1])
  renderItems[1].children[0].render = mockRender(renderItems[1].children[0])
  renderItems[1].children[1].render = mockRender(renderItems[1].children[1])
  renderItems[1].children[2].render = mockRender(renderItems[1].children[2])
  renderItems[1].children[3].render = mockRender(renderItems[1].children[3])
  renderItems[1].children[4].render = mockRender(renderItems[1].children[4])
  renderItems[1].children[5].render = mockRender(renderItems[1].children[5])


const renderAsync = async (renderItems, n) => {
    let result = []

    const getTasks = (renderItems = []) => {
        let res = []
        renderItems.forEach (val => {
            res.push (val)
            if (val.children || val.children?.length > 0) res = [...res, ...getTasks (val.children)]
        })
        return res
    }

    const renderFunctions = getTasks(renderItems)
        .sort((a, b) => a.priority - b.priority) 
        .map (({ render }) => render)

    const groups = []

    while (renderFunctions. length > 0) {
        const group = renderFunctions.splice(0, n)
        groups.push(group)
    }

    for (const group of groups) {
        await Promise.all(group).then((values) => {
            const ids = values.map(({ id }) => id)
            result = [... result, ...ids]
        })
    }

    return result
}

renderAsync (renderItems, 5).then((val) => {
    console.log(val)
})