<template>
  <div v-if="siteLinks[0]" class="links">
    <div class="line">
      <Icon size="20">
        <Link />
      </Icon>
      <span class="title"> 网站列表<span class="swipe-hint">-可以左右滑动翻页</span> </span>
    </div>
    <!-- 网站列表 -->
    <Swiper
      :key="linksPerPage"
      v-if="siteLinks[0]"
      :modules="[Pagination, Mousewheel]"
      :slides-per-view="1"
      :space-between="40"
      :pagination="{
        el: '.swiper-pagination',
        clickable: true,
        bulletElement: 'div',
      }"
      :mousewheel="true"
    >
      <SwiperSlide v-for="site in siteLinksList" :key="site">
        <el-row class="link-all" :gutter="20">
          <el-col v-for="(item, index) in site" :span="8" :key="item.link">
            <div
              class="item cards"
              :style="index < 3 ? 'margin-bottom: 20px' : null"
              @click="jumpLink(item)"
            >
              <Icon size="26">
                <component :is="siteIcon[item.icon]" />
              </Icon>
              <span class="name text-hidden">{{ item.name }}</span>
            </div>
          </el-col>
        </el-row>
      </SwiperSlide>
      <div class="swiper-pagination" />
    </Swiper>
  </div>
</template>

<script setup>
import { Icon } from "@vicons/utils";
// 可前往 https://www.xicons.org 自行挑选并在此处引入
import {
  Link,
  Blog,
  CompactDisc,
  Cloud,
  Compass,
  Book,
  Fire,
  Film,
  Image as ImageIcon,
  LaptopCode,
  FileArchive,
} from "@vicons/fa"; // 注意使用正确的类别
import { mainStore } from "@/store";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Mousewheel } from "swiper/modules";
import siteLinks from "@/assets/siteLinks.json";

const store = mainStore();

// 计算网站链接
const linksPerPage = computed(() => 6);

const siteLinksList = computed(() => {
  const result = [];
  for (let i = 0; i < siteLinks.length; i += linksPerPage.value) {
    const subArr = siteLinks.slice(i, i + linksPerPage.value);
    result.push(subArr);
  }
  return result;
});

// 网站链接图标
const siteIcon = {
  Blog,
  Cloud,
  CompactDisc,
  Compass,
  Book,
  Fire,
  Film,
  Image: ImageIcon,
  LaptopCode,
  FileArchive,
};

// 链接跳转
const jumpLink = (data) => {
  if (data.name === "音乐" && store.musicClick) {
    if (typeof $openList === "function") $openList();
  } else {
    window.open(data.link, "_blank");
  }
};

onMounted(() => {
  console.log(siteLinks);
});
</script>

<style lang="scss" scoped>
.links {
  .line {
    margin: 2rem 0.25rem 1rem;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    animation: fade 0.5s;
    .title {
      margin-left: 8px;
      font-size: 1.15rem;
      white-space: nowrap;
      text-shadow: 0 0 5px #00000050;
      .swipe-hint {
        display: none;
      }
    }
    @media (max-width: 720px) {
      margin: 1rem 0.25rem 0.75rem;
      .title {
        .swipe-hint {
          display: inline;
          font-size: 0.85rem;
          font-weight: 400;
          opacity: 0.75;
        }
      }
    }
  }
  .swiper {
    left: -10px;
    width: calc(100% + 20px);
    padding: 5px 10px 0;
    z-index: 0;
    .swiper-slide {
      height: 100%;
    }
    .swiper-pagination {
      margin-top: 12px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      :deep(.swiper-pagination-bullet) {
        background-color: #fff;
        width: 20px;
        height: 4px;
        margin: 0 4px;
        border-radius: 4px;
        opacity: 0.2;
        transition: opacity 0.3s;
        &.swiper-pagination-bullet-active {
          opacity: 1;
        }
        &:hover {
          opacity: 1;
        }
      }
      @media (max-width: 720px) {
        margin-top: 8px;
      }
    }
  }
  .link-all {
    height: 220px;
    .item {
      height: 100px;
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: center;
      padding: 0 10px;
      animation: fade 0.5s;

      &:hover {
        transform: scale(1.02);
        background: rgb(0 0 0 / 40%);
        transition: 0.3s;
      }

      &:active {
        transform: scale(1);
      }

      .name {
        font-size: 1.1rem;
        margin-left: 8px;
      }
      @media (min-width: 721px) and (max-width: 820px) {
        .name {
          display: none;
        }
      }
      @media (max-width: 720px) {
        height: 56px;
        margin-bottom: 0 !important;
        display: grid;
        grid-template-columns: 32px minmax(0, 1fr) 32px;
        padding: 0 16px;
        > :deep(.xicon) {
          grid-column: 1;
          justify-self: start;
        }
        .name {
          grid-column: 2;
          width: 100%;
          font-size: 1rem;
          margin-left: 0;
          margin-top: 0;
          text-align: center;
        }
      }
    }
    @media (max-width: 720px) {
      height: 386px;
      margin-right: 0 !important;
      margin-left: 0 !important;
      align-content: flex-start;
      row-gap: 10px;
      :deep(.el-col) {
        flex: 0 0 100%;
        max-width: 100%;
        padding-right: 0 !important;
        padding-left: 0 !important;
      }
    }
  }
}
</style>
