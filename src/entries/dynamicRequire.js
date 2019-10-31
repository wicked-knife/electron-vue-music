setTimeout(() => {
  
  import(/* webpackChunkName: 'bigFile' */ '../modules/bigFile').then(({default: str}) => {
    document.body.innerText = str
  })

}, 1000)
