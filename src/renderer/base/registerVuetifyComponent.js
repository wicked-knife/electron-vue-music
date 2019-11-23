
import {VContainer, VRow, VCol, VList, VListItemGroup, VListItem, VTabs, VTab, VBtn, VDivider, VAvatar} from 'vuetify/lib'

function registerVuetifyComponent(_Vue) {
// 常用组件注册为全局组件
  _Vue.component('v-container', VContainer)
  _Vue.component('v-row', VRow)
  _Vue.component('v-col', VCol)
  _Vue.component('v-list', VList)
  _Vue.component('v-list-item-group', VListItemGroup)
  _Vue.component('v-list-item', VListItem)
  _Vue.component('v-tabs', VTabs)
  _Vue.component('v-tab', VTab)
  _Vue.component('v-btn', VBtn)
  _Vue.component('v-divider', VDivider)
  _Vue.component('v-avatar', VAvatar)
}

export default registerVuetifyComponent
