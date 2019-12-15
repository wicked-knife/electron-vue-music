export const isObject = o => Object.prototype.toString.call(o) === '[object Object]'

export const throttle = (fn, delay = 100) => {
  let timer = null
  return function(...args){
    if(timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn(...args)
      timer = null
    }, delay)
  }
}

export const formatMusicDuration = (duration) => {
  const minutes = Math.floor(duration / 1000 / 60)
  const seconds = Math.floor(duration / 1000 % 60)
  return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
}
