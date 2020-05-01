<template>
  <v-container fluid class="pl-7 pr-7">
    <v-row class="mb-2">
      <div class="daily-wrapper">
        <div class="inner">
          <div class="day grey--text text--darken-2">{{day}}</div>
          <div class="date">{{date}}</div>
        </div>
      </div>
      <div class="pt-2">
        <div class="title mb-3">每日歌曲推荐</div>
        <div class="caption grey--text lighten-4">
          <i class="iconfont icon-light mr-2"></i>根据你的音乐口味生成，每天6：00更新
        </div>
      </div>
    </v-row>

    <v-row justify="space-between" class="mb-1"> 
      <v-btn color="#b82525" height="26px" class="subtitle-3 pl-2 pr-2">
        <i class="iconfont icon-play_circle mr-1"></i>播放全部
      </v-btn>
      <v-btn color="#25272b" height="26px" class="subtitle-3 pl-2 pr-2">
        <i class="iconfont icon-addfile mr-1 grey--text " style="font-size: 18px"></i> 收藏全部
      </v-btn>
    </v-row>

    <v-row>
      <base-music-table :headers='tableHeaders' :items='songList' v-if="songList.length"/>
    </v-row>
  </v-container>
</template>


<script>
import dayjs from '@/common/day'
import {getRecommendSongWithLogin} from '@/API/recommend'
import BaseMusicTable from '@/base/music-table/base-music-table'
export default {
  components: {
    BaseMusicTable
  },
  data: () => ({
    day: dayjs().format('dddd'),
    date: dayjs().format('D'),
    tableHeaders: [
      {text: '音乐标题', sortable: true, value: 'name'},
      {text: '歌手', sortable: true, value: 'artists', width: '20%'},
      {text: '专辑', sortable: true, value: 'album', width: '20%'},
      {text: '时长', sortable: true, value: 'duration', width: '100px'}
    ],
    songList: []
  }),
  created(){
    getRecommendSongWithLogin()
      .then(({recommend}) => {
        /*
        
               let minutes = Math.floor(song.dt / 1000 / 60)
        let seconds = Math.floor(song.dt / 1000 % 60)
        song.duration = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
        song.name = [song.name, ...song.alia, ...(song.tns ? song.tns : [])]
        song.artists = song.ar.map(artist => artist.name)
        song.album = song.al.name
        */
        recommend.forEach(song => {

          let minutes = Math.floor(song.duration / 1000 / 60)
          let seconds = Math.floor(song.duration / 1000 % 60)
          song.duration = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
          song.name = [song.name, ...song.alias]
        })
        this.songList = recommend
      })
  }
}
</script>

<style lang="scss" scoped>
.daily-wrapper {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-right: 28px;
  width: 100px;
  .inner {
    width: 100%;
    padding-top: 100%;
    position: relative;
    cursor: pointer;
    margin-bottom: 8px;
    background-color: #fff;
    .day,
    .date {
      position: absolute;
    }
    .day {
      top: 10%;
      font-size: 14px;
      text-align: center;
      width: 100%;
    }
    .date {
      top: 15%;
      width: 100%;
      text-align: center;
      font-size: 60px;
      color: #b82525;
      font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
        "Lucida Sans", Arial, sans-serif;
      @media screen and (max-width: 1066px) {
        font-size: 60px;
      }
    }
  }
}
</style>

