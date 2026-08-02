<template>
  <!-- 功能区域 -->
  <div class="function">
    <div class="left">
      <Hitokoto />
      <Music v-if="playerHasId" />
    </div>
  </div>
</template>

<script setup>
import Music from "@/components/Music.vue";
import Hitokoto from "@/components/Hitokoto.vue";

// 播放器 id
const playerHasId = import.meta.env.VITE_SONG_ID;
</script>

<style lang="scss" scoped>
.function {
  height: 165px;
  .left {
    width: 100%;
    height: 100%;
  }
  @media (max-width: 720px) {
    height: 104px;
  }
}
</style>
