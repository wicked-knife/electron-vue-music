<template>
  <keep-alive :include="['song-list-index']">
    <router-view />
  </keep-alive>
</template>


<script>
export default {
  name: 'recommend-song-list'
}
</script>
