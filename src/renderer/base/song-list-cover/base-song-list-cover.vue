<template>
  <div class="wrapper">
    <div class="img-wrapper">
      <img src="https://p2.music.126.net/Rh8JO50ZbU8NVYK9h-G8YQ==/109951164221820704.jpg" class="cover">
      <div class="desc">编辑推荐：优雅从容，享受生活。</div>
      <i class="iconfont icon-play_fill"></i>
    </div>
    <div class="name">
      法语爵士|红酒与玫瑰浪漫邂逅
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.wrapper{
  display: flex;
  flex-direction: column;
  width: 20%;
  overflow: hidden;
  .img-wrapper{
    position: relative;
    cursor: pointer;
    margin-block: 8px;
    &:hover{
      .desc{
        transform: translateY(0);
      }
      .icon-play_fill{
        opacity: 1;
      }
    }
    .desc{
      position: absolute;
      top: 0;
      left: 0;
      color:#fff;
      font-size: 12px;
      background-color: rgba(0,0,0,0.44);
      padding: 4px 8px;
      transform: translateY(-100%);
      transition: transform 0.3s ease;
    }
    .icon-play_fill{
      position: absolute;
      font-size: 16px;
      right: 8px;
      bottom: 14px;
      width: 27px;
      height: 27px;
      border-radius: 50%;
      background-color: rgba(0,0,0,0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255,255,255,0.9);
      border: 1px solid rgba(255,255,255,0.7);
      opacity: 0;
      transition: opacity ease 0.3s;
    }
  }
  .cover{
    width: 100%;
  }
  .name{
    font-size: 12px;
  }
}
</style>
