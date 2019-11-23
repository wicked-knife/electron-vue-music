<template>
  <div :class="['wrapper', HQ ? 'HQ' : '']" :style="{width}">
    <div :class="['img-wrapper mb-2', songList.copywriter && songList.copywriter.length > 4 ? '__active-hover' : '', HQ ? 'HQ' : 'normal']"
      @click="handleSongListClick">
      <img
        :src="songList.picUrl + '?param=200y200'"
        class="cover"
        draggable="false"
      />
      <div class="desc" v-if="songList.copywriter && songList.copywriter.length > 4 && !HQ">{{songList.copywriter}}</div>
      <div class="play-count">
        <i class="iconfont icon-earphone"></i> {{_playCount}}
      </div>
      <div class="creator subtitle-3" v-if="showCreator">
        <i class="iconfont icon-user ml-2 mr-1" v-if="!HQ"></i>
        <span class="nickname mr-1" v-if="!HQ">
          {{songList.creator.nickname}}
        </span>
        <i class="iconfont icon-local-music" v-if="songList.creator.userType === 4 && !HQ"></i>
        <i class="iconfont icon-star yellow--text" v-if="songList.creator.userType === 200 && !HQ"></i>
        <i class="iconfont icon-V " v-if="songList.creator.userType === 3 && !HQ"></i>
      </div>
      <i class="iconfont icon-play_fill"></i>
    </div>
    <div class="name" v-if="!HQ"  @click="handleSongListClick">{{songList.name}}</div>
    <div class="HQ-info" v-if="HQ">
      <div class="name mb-2"><span class="HQ-tag" v-show="showTag">{{songList.tag}}</span>{{songList.name}}</div>
      <div class="creator subtitle-3 mb-4 grey--text text--darken-2">
        by <span class="nickname">{{songList.creator.nickname}}</span>      
        <i class="iconfont icon-local-music" v-if="songList.creator.userType === 4"></i>
        <i class="iconfont icon-star yellow--text" v-if="songList.creator.userType === 200"></i>
        <i class="iconfont icon-V " v-if="songList.creator.userType === 3"></i>
      </div>
      <div class="copywriter subtitle-3 grey--text">
        {{songList.copywriter}}
      </div>
    </div>  
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: '150px'
    },
    songList: {
      type: Object,
      required: true
    },
    showCreator: {
      type: Boolean,
      default: false
    },
    HQ: {
      type: Boolean,
      default: false
    },
    showTag: {
      type: Boolean,
      default: false
    }
  },
  computed:{
    _playCount(){
      let _count = this.songList.playCount || this.songList.playcount
      return _count < 100000 ? _count : Math.floor(_count / 10000) + '万'
    }
  },
  methods:{
    handleSongListClick(){
      this.$emit('songList:click', this.songList)
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-bottom: 36px;

  &.HQ{
    flex-direction: row;
    @media screen and (max-width: 1250px){
      width: 50% !important;
    }

    .HQ-info{
      box-sizing: border-box;
      padding: 10px;
      display: flex;
      flex-direction: column;
      width: calc(100% - 100px);
      .name{
        width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .nickname{
        cursor: pointer;
        &:hover{
          color: #757575 !important;
        }
      }
    }
    .HQ-tag{
      font-size: 12px;
      color: $theme-color;
      border: 1px solid $theme-color;
      padding: 0 2px;
      line-height: 0;
      margin-right: 4px;
    }
  }
  .img-wrapper {
    position: relative;
    cursor: pointer;
    font-size: 0px;
    &.normal{
     padding-top: 100%;
    .cover{
      position: absolute;
      left: 0;
      top: 0;
    }
  }
    &:hover {
      .desc {
        transform: translateY(0);
      }
      .icon-play_fill {
        opacity: 1;
      }
    }
    .desc {
      position: absolute;
      top: 0;
      left: 0;
      color: #fff;
      font-size: 12px;
      background-color: rgba(0, 0, 0, 0.44);
      padding: 4px 8px;
      transform: translateY(-100%);
      transition: transform 0.3s ease;
    }
    .creator{
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      background-image: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0, 0, 0, 0.44) 100%);
      padding: 5px 0;
      display: flex;
      align-items: center;
      .icon-user{
        font-size: 12px;
      }
      .nickname{
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        display: block;
        max-width: 50%;
      }
    }
    .play-count {
      width: 70%;
      position: absolute;
      top: 0;
      right: 0;
      color: #fff;
      font-size: 12px;
      background-image: linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0, 0, 0, 0.44) 100%);
      padding: 2px 8px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      opacity: 1;
      transition:  opacity ease 0.3s;
      .icon-earphone{
        font-size: 11px;
        margin-right: 4px;
      }
    }
    .icon-play_fill {
      position: absolute;
      font-size: 16px;
      right: 5px;
      bottom: 5px;
      width: 27px;
      height: 27px;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255, 255, 255, 0.9);
      border: 1px solid rgba(255, 255, 255, 0.7);
      opacity: 0;
      transition: opacity ease 0.3s;
    }
    &.HQ{
      display: flex;
      width: 100px;
      &::before{
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        left: -21px;
        top: -21px;
        border: 21px solid #e7aa5a;
        border-color: transparent  transparent #e7aa5a transparent ;
        transform: rotateZ(-45deg);
      }
      &::after{
        font-family: 'iconfont';
        content: '\e603';
        display: block;
        position: absolute;
        top: -2px;
        left: 2px;
        transform: rotateZ(-45deg);
        z-index: 1;
        font-size: 14px;
      }
      .cover{
        width: 100px;
        height: 100px;
      }
      .play-count{
        width: 100%;
      }
    }
  }
  .cover {
    width: 100%;
  }
  .name {
    font-size: 13px;
    cursor: pointer;
  }
}
.__active-hover{
  &:hover{
    .play-count{
      opacity: 0;
    }
  }
}

.icon-star, .icon-V{
  font-size: 12px;
}
.icon-V,.icon-local-music{
  color: $theme-color;
}
</style>
