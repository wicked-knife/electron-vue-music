<template>
    <v-navigation-drawer app permanent clipped class="app-side-bar" width="200px">
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
</template>


<script>
import baseListMixin from '@/mixins/baseList.js'
import { VNavigationDrawer} from 'vuetify/lib'
export default {
  mixins: [baseListMixin],
  components: {
    VNavigationDrawer
  }
}
</script>

<style lang="scss" scoped>
.app-side-bar{
  background-color: #191b1f;
}
</style>
