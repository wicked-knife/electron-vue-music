
class LyricParser {
  constructor(rawLyric, rawTranslatedLyric){
    this.rawLyric = rawLyric
    this.rawTranslatedLyric = rawTranslatedLyric || ''
    this.parsedLyric = this._parseLyric(this.rawLyric, this.rawTranslatedLyric)
  }

  _parseLyric(lyricStr, translatedLyric){
    const splitLyric = lyricStr.split(/[\r\n]/g)
    const splitTranslatedLyric = translatedLyric.split(/[\r\n]/g)
    const lyricMap = {}
    const timeReg = /\[(\d+):(\d+)\.(\d+)\]/
    for(let lyric of splitLyric) {
      const matchedTime =  lyric.match(timeReg)
      if(!matchedTime || matchedTime.length < 4) {
        continue
      }
      const [timeStr, minutes, seconds, milliseconds] = matchedTime
      const time = (+minutes) * 60 * 1000 + (+seconds) * 1000 + (+milliseconds)
      const lyricStr = lyric.replace(timeStr, '').trim() 
      lyricMap[time] = lyricMap[time] || {time, lyric: lyricStr}
    }
    for(let lyric of splitTranslatedLyric) {
      const matchedTime =  lyric.match(timeReg)
      if(!matchedTime || matchedTime.length < 4) {
        continue
      }
      const [timeStr, minutes, seconds, milliseconds] = matchedTime
      const time = (+minutes) * 60 * 1000 + (+seconds) * 1000 + (+milliseconds)
      const lyricStr = lyric.replace(timeStr, '').trim() 
      lyricMap[time] = lyricMap[time] ? {...lyricMap[time], tLyric: lyricStr} : {time, tLyric: lyricStr}
    }
    return Object.values(lyricMap)
  }

  getLyric(){
    return this.parsedLyric
  }
}


export default LyricParser
