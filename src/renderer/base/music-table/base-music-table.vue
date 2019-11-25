<template>
  <table class="music-table border-t border-b subtitle-3">
    <thead class="grey--text">
      <tr>
        <th style="width: 50px" class="border-r"></th>
        <th style="width: 50px" class="border-r">操作</th>
        <th v-for="(head, index) in $headers" :key="index" 
        :class="['border-r', head.sortable ? 'sortable' : '', head.sortType !== 0 ? 'active' : '']" 
        @click="__handleTheadClick(head,index)">
          <div class="d-flex align-center justify-space-between">
            {{head.text}}<i :class="['iconfont', __dynamicIcon(head.sortType) ]"></i>
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" :key="item.id">
        <td>{{index + 1}}</td>
        <td>{{['xxx','yyyy'].join('/')}}</td>
        <td v-for="key in $headers.map(h => h.value)" :key="key">
          {{item[key]}}
        </td>
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
  data(){
    return {
      $headers: []
    }
  },
  created(){
    this.$headers = this.headers.map(h => ({...h, sortType: 0}))
  },
  methods:{
    __handleTheadClick(head,index){
      if(!head.sortable) {
        return
      }
      this.$headers.forEach((h,_index) => {
        if(_index === index) return
        h.sortType !== 0 && (h.sortType = 0)
      })
      // sortType:  0:不排序    1:升序   2:降序
      if(this.$headers[index].sortType === 2) {
        this.$headers[index].sortType = 0
      } else {
        this.$headers[index].sortType ++
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
.music-table{
  width: 100%;
  border-spacing: 0px;
  .icon-sort{
    visibility: hidden;
  }
  .icon-sort-down,.icon-sort-up,.icon-sort{
    font-size: 9px;
  }
  & > thead > tr{
    & > th{
      text-align: left;
      height: 28px;
      padding: 0 10px;
    }
    & > th:last-child{
      border-right: none;
    }
    & > th.sortable{
      cursor: pointer;
      &:hover{
        background-color: #23262c;
        i.icon-sort{
          visibility: visible;
        }
      }
    }
    & > th.active{
      background-color: #23262c;
    }
  }
}
</style>
