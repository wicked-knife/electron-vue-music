<template>
  <v-container v-loading="loading" fluid class="pl-10 pr-10">
    <base-title v-if="radioList.length > 0" :text="radioList[0].category"/>
    <v-row class="d-flex flex-wrap">
      <base-radio-cover v-for="radio in radioList" :radio="radio" size="large" :key="radio.id"/>
    </v-row>
  </v-container>
</template>

<script>
import {getHotRadioListByCate} from '@/API/radio.js'
import BaseTitle from '@/base/title/base-title.vue'
import BaseRadioCover from '@/base/radio-cover/base-radio-cover.vue'
import bus from '@/common/bus.js'
export default {
  components: {
    BaseTitle,
    BaseRadioCover
  },
  data(){
    return {
      radioList: [],
      loading: true,
      page: 0
    }
  },
  methods: {
    getHotRadioListByCate(){
      this.page++
      getHotRadioListByCate({cateId: this.$route.params.id, page: this.page}).then(({djRadios}) => {
        this.radioList.push(...djRadios.filter(r => r.price === 0))
        this.loading && (this.loading = false)
      })
    }
  },
  created(){
    this.getHotRadioListByCate()
    bus.on('scroll:reachBottom', this.getHotRadioListByCate)
  },
  destroyed(){
    bus.off('scroll:reachBottom', this.getHotRadioListByCate)
  }
}
</script>
