<template>
<transition name="fade">
  
  <div class="loading" v-if="loading">
    <div class="loading-content">
    <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
     width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
      <path fill="#000" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
      <animateTransform attributeType="xml"
        attributeName="transform"
        type="rotate"
        from="0 25 25"
        to="360 25 25"
        dur="0.6s"
        repeatCount="indefinite"/>
      </path>
    </svg>
    <span class="grey--text subtitle-3 ml-2">加载中...</span>
    </div>
  </div>

  
</transition>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.loading{
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 9;
  background-color: #16181c;
  display: flex;
  justify-content: center;
}
.loading-content{
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 5vw;
}
svg path,
svg rect{
  fill: #9e9e9e;
}
</style>
