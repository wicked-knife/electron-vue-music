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
          <div class="login-wrapper grey--text no-drag mr-4" v-if="!loginState" @click="showLoginWindow">
            <i class="iconfont icon-user"></i>
            <span class="tip ml-2 mr-2">请登录</span>
          </div>
          <div class="user-wrapper grey--text no-drag mr-4"  v-if="loginState" @click="userInfoVisiable = !userInfoVisiable">
            <v-avatar width="26" height="26" class="avatar">
              <img :src="userInfo.avatarUrl" >
            </v-avatar>
            <span class="username mr-2">{{userInfo.nickname}}</span>
            <i class="iconfont icon-sort-down"></i>
            <base-attached-dialog position='bottom' :value='userInfoVisiable'>
            <div class="info-wrapper">
              <v-container fluid class="mt-2 border-b">
                <v-row align="center">
                  <v-avatar width="42" height="42" class="ml-3 mr-3">
                    <img :src="userInfo.avatarUrl" >
                  </v-avatar>
                  <v-col>
                    <span class="subtitle-2 grey--text text--lighten-2">{{userInfo.nickname}}</span>
                  </v-col>
                  <v-btn class="mr-3 grey--text caption" width="60" height="22" depressed outlined @click="handleDailySign" :disabled="dailySigned">
                    <i class="iconfont icon-coin mr-1" v-if='!dailySigned'></i>
                  {{dailySigned ? '已' : ''}}签到</v-btn>
                </v-row>
                <v-row>
                  <v-col class="text-center d-flex flex-md-column">
                    <span class="white--text font-weight-bold">{{userInfo.eventCount}}</span>
                    <span class="caption">动态</span>
                  </v-col>
                  <v-col class="text-center d-flex flex-md-column">
                    <span class="white--text font-weight-bold">{{userInfo.follows}}</span>
                    <span class="caption">关注</span>
                  </v-col>
                  <v-col class="text-center d-flex flex-md-column">
                    <span class="white--text font-weight-bold">{{userInfo.followeds}}</span>
                    <span class="caption">粉丝</span>
                  </v-col>
                </v-row>
              </v-container>
              <v-btn block height="40" color='rgb(45,47,51)' tile @click="handleLogout">
                <i class="iconfont icon-logout grey--text text--darken-1 mr-2"></i> <span class="caption">注销登录</span>
              </v-btn>
            </div>
            </base-attached-dialog>
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
import BaseAttachedDialog from '@/base/attached-dialog/base-attached-dialog.vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'
const { ipcRenderer } = require('electron')
import { getPersistUserInfo } from '@/store/persist/userInfo.js'
import { logout } from '@/API/login.js'
import { dailySign } from '@/API/user.js'

export default {
  components: {
    VAppBar,
    VAvatar,
    BaseInput,
    BaseAttachedDialog
  },
  data() {
    return {
      userInfoVisiable: false
    }
  },
  methods: {
    ...mapMutations('window', {
      setWindowMaximized: 'setWindowMaximized'
    }),
    ...mapMutations('user', {
      dailySign: 'dailySign'
    }),
    ...mapActions('user', {
      login: 'login',
      logout: 'logout'
    }),
    minimizeWindow() {
      ipcRenderer.send('mainWindow:minimize')
    },
    maximizeWindow() {
      ipcRenderer.send('mainWindow:maximize')
    },
    restoreWindow() {
      ipcRenderer.send('mainWindow:restore')
    },
    closeWindow() {
      ipcRenderer.send('mainWindow:close')
    },
    showLoginWindow() {
      ipcRenderer.send('loginWindow:show')
    },
    handleLogout() {
      logout().then(res => {
        if (res.code === 200) {
          this.logout()
          this.$alert({ text: '注销成功', color: 'success' })
        }
      })
    },
    handleDailySign(){
      dailySign().then(() => {
        this.$alert({text: '签到成功', color: 'success'})
        this.dailySign()
      }).catch(() => {
        this.$alert({text: '重复签到', color: 'red'})
        this.dailySign()
      })
    }
  },
  computed: {
    ...mapGetters('window', {
      windowMaximized: 'maximized'
    }),
    ...mapGetters('user', {
      loginState: 'loginState',
      userInfo: 'userInfo',
      dailySigned: 'dailySigned'
    })
  },
  beforeCreate() {
    ipcRenderer.on('mainWindow:maximized', () => {
      this.setWindowMaximized(true)
    })
    ipcRenderer.on('mainWindow:restored', () => {
      this.setWindowMaximized(false)
    })
    ipcRenderer.on('loginWindow:loginSuccess', () => {
      //登录成功逻辑，登录成功后会服务器会setCookie
      this.login(getPersistUserInfo())
      this.$alert({ text: '登录成功', color: 'success' })
    })
  }
}
</script>

<style lang="scss" scoped>
.app-top-bar {
  background-color: #222225;
  &::after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 2.5px;
    bottom: 0px;
    left: 0px;
    background-image: linear-gradient(to right, #670404, $theme-color, #670404);
    z-index: -1;
  }
  .logo-wrapper {
    width: 200px;
    display: flex;
    align-items: center;
    .logo {
      cursor: pointer;
    }
  }
  .route-control {
    position: relative;
    border: 1px solid #181818;
    display: flex;
    border-radius: 3px;
    height: 24px;
    width: 54px;
    align-items: center;
    justify-content: space-around;
    box-sizing: border-box;
    &::before {
      content: "";
      position: absolute;
      height: 100%;
      top: 0;
      left: 50%;
      width: 1px;
      background-color: #181818;
    }
    i {
      cursor: pointer;
      &:hover {
        color: #fff !important;
      }
    }
  }
  .user-wrapper,
  .login-wrapper {
    display: flex;
    align-items: center;
    .username {
      max-width: 80px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: 13px;
      cursor: pointer;
    }
    .avatar {
      cursor: pointer;
    }
    .tip {
      width: 40px;
      font-size: 13px;
      cursor: pointer;
      &:hover {
        color: #fff;
      }
    }
    .icon-sort-down {
      font-size: 12px;
    }
    .icon-user {
      font-size: 20px;
      cursor: pointer;
      &:hover {
        color: #fff;
      }
    }
    .info-wrapper {
      min-width: 275px;
    }
  }
  .tool-group {
    display: flex;
    align-items: center;
    border-right: 1px solid $bg-dark;
    i {
      font-size: 20px;
      cursor: pointer;
      margin: 0 10px;
      &:hover {
        color: #fff;
      }
    }
  }
  .window-btn-group {
    display: flex;
    align-items: center;
    i {
      font-size: 20px;
      cursor: pointer;
      margin: 0 3px;
      &:hover {
        color: #fff;
      }
    }
  }
}
.drag {
  -webkit-app-region: drag;
}
.no-drag {
  -webkit-app-region: no-drag;
}
</style>
