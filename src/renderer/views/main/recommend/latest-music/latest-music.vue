<template>
  <div>
    <base-tab-bar v-model="currentTab">
      <base-tab-item text='新歌速递' />
      <base-tab-item text='新碟上架' />
    </base-tab-bar>
    <keep-alive :include="['new-song', 'new-disc']">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import BaseTabBar from '@/base/tab-bar/base-tab-bar.vue'
import BaseTabItem from '@/base/tab-bar/base-tab-item.vue'
export default {
  name: 'recommend-latest-music',
  components: {
    BaseTabBar,
    BaseTabItem
  },
  data(){
    return {
      currentTab: '新歌速递'
    }
  },
  watch:{
    currentTab(val){
      val === '新歌速递' ? this.$router.push('/main/recommend/latest-music/new-song') : this.$router.push('/main/recommend/latest-music/new-disc')
    }
  },
  activated(){
    this.currentTab === '新歌速递' ? this.$router.push('/main/recommend/latest-music/new-song') : this.$router.push('/main/recommend/latest-music/new-disc')
  }
}
</script>
