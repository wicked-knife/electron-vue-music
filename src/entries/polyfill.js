const p = new Promise((resolve, reject) => {
  if(DEV) {
    resolve(true)
  } else {
    reject(false)
  }
})


console.log(p)
