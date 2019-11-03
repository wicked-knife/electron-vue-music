<template>
  <v-app>
    <v-navigation-drawer app permanent clipped>
      <v-list>
        <v-list-item-group>
          <v-list-item>
            <router-link to="/foo">Go to Foo</router-link>
          </v-list-item>
          <v-list-item>
            <router-link to="/bar">Go to Bar</router-link>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app clipped-left>
      <v-container>
        <v-row>
          title
        </v-row>
      </v-container>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios'
import baseLayoutMixins from '@/mixins/baseLayout.js'
import {VApp,  VAppBar, VContent, VNavigationDrawer, VList, VListItemGroup, VListItem} from 'vuetify/lib'
export default {
  data() {
    return {}
  },
  mixins: [baseLayoutMixins],
  components: {
    VApp,
    VAppBar,
    VContent,
    VNavigationDrawer,
    VList,
    VListItemGroup,
    VListItem
  },
  mounted() {
    axios
      .get('http://localhost:3000/search?keywords=海阔天空')
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style lang="scss" scoped>
</style>
