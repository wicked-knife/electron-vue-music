<template>
  <v-row class="input-wrapper flex-column">
    <textarea rows="3" class="comment-input beautify-scrollbar" maxlength="140" v-model="value" ref="input"></textarea>
    <div :class="['input-count subtitle-3', restInputCount === 0 ? 'red--text' : '']">{{restInputCount}}</div>
    <div class="d-flex justify-space-between align-center mt-2">
      <div class="d-flex justify-space-between align-center">
        <i class="iconfont icon-emoji" @click.self="loadEmoji">
          <attached-dialog position="bottom" :value="emojiVisibility" bottom class="position__fix">
            <div class="emoji-wrapper border-box pt-5 pl-4 pr-4 " @click="handleClickEmoji">
              <i class="iconfont icon-close" @click="emojiVisibility = false"></i>
              <span v-for="(emoji, index) in emojiList" :key="index" class="emoji">{{emoji.char}}</span>
            </div>
            <div class="emoji-pagination d-flex align-center justify-center">
              <i class="iconfont icon-return mr-4" @click="slidePage(-1)"></i>
              <i class="iconfont icon-enter" @click="slidePage(1)"></i>
            </div>
          </attached-dialog>
        </i>
        <i class="iconfont icon-eit">
        </i>
        <i class="iconfont icon-topic"></i>
      </div>
      <v-btn height="26px" min-width="42px" width="42px" class="subtitle-3" color="#2b2c31" @click="handleSubmit">评论</v-btn>
    </div>
  </v-row>
</template>

<script>
import attachedDialog from '@/base/attached-dialog/base-attached-dialog.vue'
export default {
  components: {
    attachedDialog
  },
  data(){
    return {
      value: '',
      comment: null,
      chunkedEmojiList: [],
      emojiVisibility: false,
      emojiPage: 0
    }
  },
  computed:{
    restInputCount(){
      return this.comment ? 140 - this.value.replace(this.comment.replyFlag, '').length : 140 - this.value.length
    },
    emojiList(){
      return this.chunkedEmojiList.length ? this.chunkedEmojiList[this.emojiPage] : []
    }
  },
  methods:{
    handleSubmit(){
      if(!this.value) {
        return
      }
      if(!this.comment) {
        this.$emit('submit-comment', this.value)
      } else  {
        if(this.value.indexOf(this.comment.replyFlag) === 0) {
          const content = this.value.replace(this.comment.replyFlag, '')
          content && this.$emit('submit-reply-comment', {...this.comment, content})
        }
      }
    },
    clearInput(){
      this.value = ''
    },
    setReplyContent(comment){
      if(!comment) return
      this.comment = {...comment, replyFlag: '回复' + comment.user.nickname + '：'}
      this.value = this.comment.replyFlag
      this.$refs['input'].focus()
    },
    slidePage(n){
      if(n > 0 && this.emojiPage === this.chunkedEmojiList.length - 1) {
        return this.emojiPage = 0
      }
      if(n < 0 && this.emojiPage === 0 ) {
        return this.emojiPage = this.chunkedEmojiList.length - 1
      }
      this.emojiPage += n
    },
    handleClickEmoji(ev){
      if(ev.target.classList.contains('emoji')) {
        this.value += ev.target.innerText
      }
    },
    loadEmoji(){
      this.emojiVisibility = true
      if(!this.emojiList.length) {
        import(/* webpackChunkName: 'emoji' */ './emoji.json').then(emoji => {
          const rawEmojiList = Object.values(emoji.default) 
          const chunkedEmojiList = []
          for(let i = 0; i < rawEmojiList.length; i += 32) {
            chunkedEmojiList.push(rawEmojiList.slice(i, i + 32))
          }
          this.chunkedEmojiList = chunkedEmojiList
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.input-wrapper {
  box-sizing: border-box;
  background-color: #1c1e23;
  padding: 12px 12px 8px 12px;
  .comment-input {
    width: 100%;
    background-color: #2b2c31;
    box-sizing: border-box;
    padding: 4px 8px;
    font-size: 14px;
    resize: none;
    margin-bottom: -6px;
    &:focus {
      outline: transparent auto 0px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #1c1e23;
    }
  }
  .input-count {
    background-color: #2b2c31;
    text-align: right;
    padding: 4px 8px 4px 0;
  }
  .icon-emoji,.icon-topic,.icon-eit{
    color: #757575;
    cursor: pointer;
    &:hover{
      &::before{
        color: #fff;
      }
    }
  }
  .icon-emoji{
    font-size: 24px;
  }
  .icon-eit{
    font-size: 24px;
    margin: 0 6px;
  }
  .icon-topic{
    font-size: 18px;
    font-weight: bolder;
  }
}
.emoji-wrapper{
  width: 264px;
  min-height: 144px;
  font-size: 21px;
  position: relative;
  .icon-close{
    position: absolute;
    right: 3px;
    top: 1px;
    &:hover{
      color: #fff
    }
  }
  .emoji{
    transition: all 0.3s ease;
    display: inline-block;
    width: 29px;
    text-align: center;
    &:hover{
      transform: translateY(-3px);
    }
  }
}
.emoji-pagination{
  .icon-return,.icon-enter{
    &:hover{
      color: #fff
    }
  }
}

.position__fix{
  left: -5px !important;
  transform:  translateY(100%) !important;
  &::before{
    left: 5px !important;
  }
}
</style>
