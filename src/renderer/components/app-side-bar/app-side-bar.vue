<template>
    <v-navigation-drawer app permanent clipped class="app-side-bar" width="200px">
      <v-list class="mt-n2">
        <v-subheader dark class="subheader grey--text text--darken-1">
          推荐
        </v-subheader>
        <v-list-item-group >
          <v-list-item to="/main/recommend" active-class="route-active" class="nav-item" >
            <i class="iconfont icon-music mr-2"></i> 发现音乐
          </v-list-item>
          <v-list-item to='/main/personalFM' active-class="route-active" class="nav-item" >
            <i class="iconfont icon-FM mr-2"></i> 私人FM
          </v-list-item>
          <v-list-item to='/main/video' active-class="route-active" class="nav-item" >
            <i class="iconfont icon-video mr-2"></i> 视频
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
</template>


<script>
import { VNavigationDrawer, VSubheader} from 'vuetify/lib'
export default {
  components: {
    VNavigationDrawer,
    VSubheader
  }
}
</script>

<style lang="scss" scoped>
.app-side-bar{
  background-color: #191b1f;
}
.route-active{
  &::after{
    position: absolute;
    content: '';
    display: block;
    width: 3px;
    height: 100%;
    left: 0;
    top: 0;
    background-color: $theme-color;
  }
}
.nav-item{
  min-height: 32px;
  font-size: 13px;
}
.subheader{
  font-size: 13px;
  height: 32px;
}
</style>
