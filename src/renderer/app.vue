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
        // TODO: 每次热更新都会调用这个刷新登录接口，调用多了会被限制
        // 等开发完毕后在解除注释
        // refreshLogin()
      }
    })
  }
}
</script>
