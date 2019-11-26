<template>
  <table class="music-table border-t border-b subtitle-3">
    <thead class="grey--text border-b">
      <tr>
        <th style="width: 50px" class="border-r"></th>
        <th style="width: 50px" class="border-r">操作</th>
        <th
          v-for="(head, index) in $headers"
          :key="index"
          :class="['border-r', head.sortable ? 'sortable' : '', head.sortType !== 0 ? 'active' : '']"
          @click="__handleTheadClick(head,index)"
          :style="{width: head.width}"
        >
          <div class="d-flex align-center justify-space-between">
            {{head.text}}
            <i :class="['iconfont', __dynamicIcon(head.sortType) ]"></i>
          </div>
        </th>
      </tr>
    </thead>
    <tbody class="border-t">
      <tr v-for="(item, index) in $items" :key="item.id" @click="activatedIndex = index" :class="activatedIndex === index ? 'active' : ''">
        <td class="text-center">{{index + 1}}</td>
        <td class="text-center">
          <i class="iconfont icon-like"></i>
          <i class="iconfont icon-download"></i>
        </td>
        <td v-for="key in $headers.map(h => h.value)" :key="key" v-html="item[key]" :class="key"></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      $headers: [],
      $items: [],
      activatedIndex: -1
    }
  },
  created() {
    this.$headers = this.headers.map(h => ({ ...h, sortType: 0 }))
    this.$items = this.items.map(i => {
      return {
        ...i,
        artists: i.artists.map(artist => `<span>${artist}</span>`).join('/'),
        name: `${i.name[0]}${i.name[1] ? `<span>${i.name[1]}</span>` : ''}`
      }
    })
  },
  methods: {
    __handleTheadClick(head, index) {
      if (!head.sortable) {
        return
      }
      this.$headers.forEach((h, _index) => {
        if (_index === index) return
        h.sortType !== 0 && (h.sortType = 0)
      })
      // sortType:  0:不排序    1:升序   2:降序
      if (this.$headers[index].sortType === 2) {
        this.$headers[index].sortType = 0
      } else {
        this.$headers[index].sortType++
      }
      this.$forceUpdate()
    },
    __dynamicIcon(sortType) {
      return ['icon-sort', 'icon-sort-down', 'icon-sort-up'][sortType]
    }
  }
}
</script>

<style lang="scss" scoped>
.music-table {
  width: 100%;
  border-spacing: 0px;
  border-collapse: collapse;
  .icon-sort {
    visibility: hidden;
  }
  .icon-sort-down,
  .icon-sort-up,
  .icon-sort {
    font-size: 9px;
  }
  .icon-like,.icon-download{
    cursor: pointer;
    &:hover{
      color: #fff !important;
    }
  }
  & > thead > tr {
    height: 30px;
    & > th {
      text-align: left;
      padding: 0 10px;
    }
    & > th:last-child {
      border-right: none;
    }
    & > th.sortable {
      cursor: pointer;
      &:hover {
        background-color: #23262c;
        i.icon-sort {
          visibility: visible;
        }
      }
    }
    & > th.active {
      background-color: #23262c;
    }
  }
  & > tbody > tr {
    height: 30px;
    &.active{
      background-color: #2c2e32 !important;
      .artists, .duration, .album{
        color: #fff;
      }
      .name{
        :first-child{
          color: #fff;
        }
      }
      td:first-child{
        color: #fff;
      }
    }
    &:nth-child(even){
      background-color: #1a1c20;
    }
    &:hover{
      background-color: #232529;
      .artists, .duration, .album{
        color: #fff;
      }
    }
    td {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      max-width: 1px;
      &:first-child{
        color: #616161;
      }
      &:nth-child(2){
        color: #616161;
      }
      &:nth-child(n + 3) {
        padding-left: 10px;
      }
      &.artists, &.duration,&.album{
        color: #9e9e9e;
      }
      &.name{
        :first-child{
          color: #616161;
          margin-left: 4px;
        }
      }
    }
  }
}

</style>
