<template>
  <div>
    <base-tab-bar v-model="currentTab">
      <base-tab-item text='新歌速递' />
      <base-tab-item text='新碟上架' />
    </base-tab-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import BaseTabBar from '@/base/tab-bar/base-tab-bar.vue'
import BaseTabItem from '@/base/tab-bar/base-tab-item.vue'
export default {
  components: {
    BaseTabBar,
    BaseTabItem
  },
  data(){
    return {
      currentTab: '新歌速递'
    }
  }
}
</script>
