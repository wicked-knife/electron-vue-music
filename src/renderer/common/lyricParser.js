class LyricParser {
  constructor(rawLyric, rawTranslatedLyric = ''){
    this.rawLyric = rawLyric
    this.rawTranslatedLyric = rawTranslatedLyric || ''
    this.parsedLyric = this._parseLyric(this.rawLyric, this.rawTranslatedLyric)
  }

  /**
   * 将原歌词解析为按照时间排序数组
   * 播放时间以秒为单位， 如： 播放到1分21秒时歌词对应的时间为: 81.000
   *
   * @param {*} lyricStr 原歌词
   * @param {*} translatedLyric 原翻译的歌词
   * @returns [{time: 12.036, lyric: 'hello world', tLyric: '你好,世界'}, ....]
   * @memberof LyricParser
   */
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
      const time = (+minutes) * 60 + (+seconds) + (+milliseconds) * 0.001
      const lyricStr = lyric.replace(timeStr, '').trim() 
      lyricMap[time] = lyricMap[time] || {time, lyric: lyricStr}
    }
    for(let lyric of splitTranslatedLyric) {
      const matchedTime =  lyric.match(timeReg)
      if(!matchedTime || matchedTime.length < 4) {
        continue
      }
      const [timeStr, minutes, seconds, milliseconds] = matchedTime
      const time = (+minutes) * 60 + (+seconds) + (+milliseconds) * 0.001
      const lyricStr = lyric.replace(timeStr, '').trim() 
      lyricMap[time] = lyricMap[time] ? {...lyricMap[time], tLyric: lyricStr} : {time, tLyric: lyricStr}
    }
    return Object.values(lyricMap).sort((a,b) => a.time - b.time)
  }

  getLyric(){
    return this.parsedLyric
  }

  /**
   * 根据播放时间搜寻对应的歌词
   *
   * @param {*} milliseconds
   * @returns
   * @memberof LyricParser
   */
  
  seek(milliseconds){
    for(let i = 0; i < this.parsedLyric.length; i++) {
      if(i === this.parsedLyric.length - 1) {
        if(i === this.parsedLyric.length - 1 && milliseconds >= this.parsedLyric[i].time) {
          return this.parsedLyric[i]
        }
      } else {
        if(milliseconds >= this.parsedLyric[i].time && milliseconds < this.parsedLyric[i + 1].time) {
          return this.parsedLyric[i]
        }
      }
    }
  }
}


export default LyricParser
