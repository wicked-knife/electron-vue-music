<script>
import {getSongURL} from '@/API/song'
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
      activatedIndex: -1,
      renderItems: [] // 用于列表渲染的数据
    }
  },
  render(){
    return  ( <table class="music-table border-t border-b subtitle-3">
      <thead class="grey--text border-b">
        <tr>
          <th style="width: 50px" class="border-r"></th>
          <th style="width: 50px" class="border-r">操作</th>
          {this.$headers.map((head, index) => (
            <th key={index} class={`border-r ${head.sortable ? 'sortable ' : ' '}${head.sortType !== 0 ? 'active' : ''}`}
              {...{on: {click: this.__handleTheadClick.bind(this, head, index)}}}
              style={{width: head.width}}>
              <div class="d-flex align-center justify-space-between">
                {head.text}
                <i class={'iconfont ' + this.__dynamicIcon(head.sortType)}></i>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody class="border-t">
        {this.renderItems.map((item, index) => (
          <tr key={item.id} 
            {...{on: {click: this.__handleItemClick.bind(this, index)}}} class={this.activatedIndex === index ? 'active' : ''}
            {...{on: {dblclick: this.__handleItemDoubleClick.bind(this, item, index)}}}>
            <td class="text-center">{index + 1}</td>
            <td class="text-center">
              <div class="d-flex justify-space-around">
                <i class="iconfont icon-like"></i>
                <i class="iconfont icon-download"></i>
              </div>
            </td>
            {this.$headers.map(h => h.value).map(key => (
              <td key={key} class={key}>
                {this.__dynamicContent(item, key)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    )
  },
  created() {
    this.$headers = this.headers.map(h => ({ ...h, sortType: 0 }))
    this.renderItems = this.items.slice()
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
    __handleItemClick(index){
      this.activatedIndex = index
    },
    __handleItemDoubleClick(songItem, songIndex){
      if(songItem.fee === 1) {
        return getSongURL(songItem.id)
          .then(({data}) => {
            const [source] = data
            if(!source.url) {
              this.$alert({text:'请先充值Vip', color: 'blue'})
            }
          })
      }
      this.$emit('song-dblclick', songItem, songIndex, this.items)
    },
    __dynamicIcon(sortType) {
      return ['icon-sort', 'icon-sort-down', 'icon-sort-up'][sortType]
    },
    __dynamicContent(item, key){
      switch(key) {
      case 'artists':{
        const items = item[key].map(artist =>  <span {...{on: {click: this.handleArtistClick.bind(this, artist)}}}>{ artist.name }</span>)
        for(let i = 0; i < items.length; i++) {
          if(items[i + 1]) {
            i++
            items.splice(i, 0, ' / ')
          }
        }
        return items
      }
      case 'name':{
        // 根据图标数量预留出对应的padding
        // 一个图标预留20px
        // 目前有两种图标， mv图标和vip图标
        const iconPadding = [!!item.mv, item.fee === 1].reduce((prev, cur) => prev + (Number(cur) * 20), 0)
        return (<div class="name-wrapper" style={'padding-right:' + (iconPadding + 5) + 'px'}>
          {item[key][0]}
          {item[key][1] ? <span class="alia">{item[key][1]}</span> : ''}
          <div class="icon-wrapper d-flex justify-space-around align-center" style={'width:' + iconPadding + 'px'}>          
            {item.mv ? <i class="iconfont icon-mv"></i> : ''}
            {item.fee === 1 ? <i class="iconfont icon-vip"></i> : ''}
          </div>
        </div>)
      }
      case 'album':
        return (<span>{item[key].name}</span>)
      default:
        return item[key]
      }
    },
    search(keywords){
      const matchReg = new RegExp(keywords, 'i')
      if(!keywords) {
        this.renderItems = this.items
      } else {
        this.renderItems = this.items.filter(item => item.album.includes(keywords) || item.artists.some(_item => matchReg.test(_item) || item.name.some(_item => matchReg.test(_item))))
      }
    },
    handleArtistClick(artist) {
      this.$router.push('/main/singer/' + artist.id)
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
  .icon-like,
  .icon-download {
    cursor: pointer;
    &:hover {
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
    &.active {
      background-color: #2c2e32 !important;
      .artists,
      .duration,
      .album {
        color: #fff;
      }
      .name {
        .alia {
          color: #fff;
        }
      }
      td:first-child {
        color: #fff;
      }
    }
    &:nth-child(even) {
      background-color: #1a1c20;
    }
    &:hover {
      background-color: #232529;
      .artists,
      .duration,
      .album {
        color: #fff;
      }
    }
    td {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      max-width: 1px;
      &:first-child {
        color: #616161;
      }
      &:nth-child(2) {
        color: #616161;
      }
      &:nth-child(n + 3) {
        padding-left: 10px;
      }
      &.artists,
      &.duration,
      &.album {
        color: #9e9e9e;
      }
      &.artists,
      &.album {
        span {
          cursor: pointer;
        }
      }
      &.name {
        .name-wrapper {
          display: inline-block;
          max-width: 99%;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          box-sizing: border-box;
          position: relative;
        }
        .icon-wrapper{
          position: absolute;
          height: 100%;
          right: 0;
          top: 0;
        }
        .alia {
          position: relative;
          color: #616161;
          margin-left: 4px;
        }
        .icon-mv {
          color: $theme-color;
          cursor: pointer;
          &:hover {
            filter: brightness(1.3);
          }
        }
        .icon-vip{
          color: #d15400;
          cursor: pointer;
          &:hover {
            filter: brightness(1.3);
          }
        }
      }
    }
  }
}
</style>
