<template>
    <v-app-bar app clipped-left height="52px" flat class="app-top-bar">
        <v-row class="drag">
          <router-link class="logo-wrapper ml-3 no-drag" to='/main/recommend/index' tag='div'>
            <img src="./logo.png" class="logo">
          </router-link>
          <v-col>
            <v-row>
            <div class="route-control mr-4 ml-n4 no-drag">
              <i class="iconfont icon-return grey--text"></i>
              <i class="iconfont icon-enter grey--text"></i>
            </div>
            <BaseInput placeholder='搜索音乐、视频、歌词、电台' class="no-drag"/>
            </v-row>
          </v-col>
          <div class="user-wrapper grey--text no-drag" @click="login">
            <v-avatar width="26" height="26">
              <img src="http://p2.music.126.net/d5sAsDQf4yqq5bID-rDKXg==/2892815093234572.jpg?param=30y30" alt="">
            </v-avatar>
            <span class="username mr-2">、他们为何离去</span>
            <i class="iconfont icon-sort-down"></i>
          </div>
          <div class="tool-group grey--text mr-4 no-drag">
            <i class="iconfont icon-skin"></i>
            <i class="iconfont icon-mail"></i>
            <i class="iconfont icon-setup"></i>
          </div>
          <div class="window-btn-group grey--text mr-2 no-drag">
            <i class="iconfont icon-small-screen"></i>
            <i class="iconfont icon-minimize" @click="minimizeWindow"></i>
            <i class="iconfont icon-maximize" @click="maximizeWindow" v-show="!windowMaximized"></i>
            <i class="iconfont icon-unmaxisize" @click="restoreWindow" v-show="windowMaximized"></i>
            <i class="iconfont icon-close" @click="closeWindow"></i>
          </div>
        </v-row>
    </v-app-bar>
</template>

<script>
import { VAppBar, VAvatar } from 'vuetify/lib'
import BaseInput from '@/base/input/base-input.vue'
import {mapGetters, mapMutations} from 'vuex'
const {ipcRenderer} = require('electron')

export default {
  components: {
    VAppBar,
    VAvatar,
    BaseInput
  },
  data(){
    return {
    }
  },
  methods: {
    ...mapMutations('window', {
      setWindowMaximized: 'setWindowMaximized'
    }),
    minimizeWindow(){
      ipcRenderer.send('mainWindow:minimize')
    },
    maximizeWindow(){
      ipcRenderer.send('mainWindow:maximize')
    },
    restoreWindow(){
      ipcRenderer.send('mainWindow:restore')
    },
    closeWindow(){
      ipcRenderer.send('mainWindow:close')
    },
    login(){
      ipcRenderer.send('loginWindow:show')
    }
  },
  computed: {
    ...mapGetters('window',{
      windowMaximized: 'maximized'
    })
  },
  beforeCreate(){
    ipcRenderer.on('mainWindow:maximized', () => {
      this.setWindowMaximized(true)
    })
    ipcRenderer.on('mainWindow:restored', () => {
      this.setWindowMaximized(false)
    })
  }
} 
</script>

<style lang="scss" scoped>
.app-top-bar{
  background-color: #222225;
  &::after{
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 2.5px;
    bottom: 0px;
    left: 0px;
    background-image: linear-gradient(to right, #670404 , $theme-color, #670404);
  }
  .logo-wrapper{
    width: 200px;
    display: flex;
    align-items: center;
    .logo{
      cursor: pointer;
    }
  }
  .route-control{
    position: relative;
    border: 1px solid #181818;
    display: flex;
    border-radius: 3px;
    height: 24px;
    width: 54px;
    align-items: center;
    justify-content: space-around;
    box-sizing: border-box;
    &::before{
      content: '';
      position: absolute;
      height: 100%;
      top: 0;
      left: 50%;
      width: 1px;
      background-color: #181818;
    }
    i{
      cursor: pointer;
      &:hover{
        color: #fff !important;
      }
    }
  }
  .user-wrapper{
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover{
      .username,i{
        color: #fff;
      }
    }
    .username{
      width: 80px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: 13px;
    }
    i{
      font-size: 12px;
    }
  }
  .tool-group{
    display: flex;
    align-items: center;
    border-right: 1px solid $bg-dark;
    i{
      font-size: 20px;
      cursor: pointer;
      margin: 0 10px;
      &:hover{
        color: #fff;
      }
    }
  }
  .window-btn-group{
    display: flex;
    align-items: center;
    i{
      font-size: 20px;
      cursor: pointer;
      margin: 0 3px;
      &:hover{
        color: #fff;
      }
    }
  }
}
.drag{
  -webkit-app-region: drag
}
.no-drag{
  -webkit-app-region: no-drag;
}
</style>
