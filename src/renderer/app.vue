<template>
  <router-view />
</template>

<script>
import {mapMutations, mapActions} from 'vuex'
import {refreshLogin} from '@/API/login.js'
export default {
  methods: {
    ...mapActions('user', {
      checkLoginState: 'checkLoginState'
    }),
    ...mapMutations('user', {
      setLoginState: 'setLoginState'
    })
  },
  created(){
    // 每次应用启动时检查登录状态，如果登录了就刷一下登录状态
    this.checkLoginState().then(loginState => {
      if(loginState) {
        this.setLoginState(loginState)
        refreshLogin()
      }
    })
  }
}
</script>
