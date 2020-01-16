
class LyricParser {
  constructor(rawLyric, rawTranslatedLyric){
    this.rawLyric = rawLyric
    this.rawTranslatedLyric = rawTranslatedLyric
    this._parseLyric(this.rawLyric)
    this.rawTranslatedLyric && this._parseLyric(this.rawTranslatedLyric)
  }

  _parseLyric(lyricStr){
    const splitLyric = lyricStr.split(/[\r\n]/g)
    console.log(lyricStr,splitLyric)
    return splitLyric
  }

  getLyric(){

  }
}


export default LyricParser
