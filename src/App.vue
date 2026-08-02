<template>
  <!-- 加载 -->
  <Loading />
  <!-- 壁纸 -->
  <Background @loadComplete="loadComplete" />
  <!-- 主界面 -->
  <Transition name="fade" mode="out-in">
    <main id="main" v-if="store.imgLoadStatus">
      <div class="container" v-show="!store.backgroundShow">
        <section class="all" v-show="!store.setOpenState">
          <MainLeft />
          <MainRight v-show="!store.boxOpenState" />
          <Box v-show="store.boxOpenState" />
        </section>
        <section class="more" v-show="store.setOpenState" @click="store.setOpenState = false">
          <MoreSet />
        </section>
      </div>
      <!-- 移动端页面切换 -->
      <button
        class="mobile-nav cards"
        type="button"
        v-show="!store.backgroundShow && !store.setOpenState"
        :aria-label="mobileNavLabel"
        :aria-pressed="store.mobileOpenState"
        @click="store.mobileOpenState = !store.mobileOpenState"
      >
        <Icon class="mobile-nav__icon" size="22">
          <component :is="store.mobileOpenState ? Home : AllApplication" />
        </Icon>
        <span class="mobile-nav__label">{{ mobileNavLabel }}</span>
      </button>
      <!-- 页脚 -->
      <Transition name="fade" mode="out-in">
        <Footer class="f-ter" v-show="!store.backgroundShow && !store.setOpenState" />
      </Transition>
    </main>
  </Transition>
</template>

<script setup>
import { helloInit, checkDays } from "@/utils/getTime.js";
import { AllApplication, Home } from "@icon-park/vue-next";
import { mainStore } from "@/store";
import { Icon } from "@vicons/utils";
import Loading from "@/components/Loading.vue";
import MainLeft from "@/views/Main/Left.vue";
import MainRight from "@/views/Main/Right.vue";
import Background from "@/components/Background.vue";
import Footer from "@/components/Footer.vue";
import Box from "@/views/Box/index.vue";
import MoreSet from "@/views/MoreSet/index.vue";
import cursorInit from "@/utils/cursor.js";
import config from "@/../package.json";

const store = mainStore();
const mobileNavLabel = computed(() => (store.mobileOpenState ? "返回主页" : "查看站点"));

// 页面宽度
const getWidth = () => {
  store.setInnerWidth(window.innerWidth);
};

// 加载完成事件
const loadComplete = () => {
  nextTick(() => {
    // 欢迎提示
    helloInit();
    // 默哀模式
    checkDays();
  });
};

// 监听宽度变化
watch(
  () => store.innerWidth,
  (value) => {
    if (value < 721) {
      store.boxOpenState = false;
      store.setOpenState = false;
    }
  },
);

onMounted(() => {
  // 自定义鼠标
  cursorInit();

  // 屏蔽右键
  document.oncontextmenu = () => {
    ElMessage({
      message: "为了浏览体验，本站禁用右键",
      grouping: true,
      duration: 2000,
    });
    return false;
  };

  // 鼠标中键事件
  window.addEventListener("mousedown", (event) => {
    if (event.button == 1) {
      store.backgroundShow = !store.backgroundShow;
      ElMessage({
        message: `已${store.backgroundShow ? "开启" : "退出"}壁纸展示状态`,
        grouping: true,
      });
    }
  });

  // 监听当前页面宽度
  getWidth();
  window.addEventListener("resize", getWidth);

  // 控制台输出
  const styleTitle1 = "font-size: 20px;font-weight: 600;color: rgb(244,167,89);";
  const styleTitle2 = "font-size:12px;color: rgb(244,167,89);";
  const styleContent = "color: rgb(30,152,255);";
  const title1 = "無名の主页";
  const title2 = `
 _____ __  __  _______     ____     __
|_   _|  \\/  |/ ____\\ \\   / /\\ \\   / /
  | | | \\  / | (___  \\ \\_/ /  \\ \\_/ /
  | | | |\\/| |\\___ \\  \\   /    \\   /
 _| |_| |  | |____) |  | |      | |
|_____|_|  |_|_____/   |_|      |_|`;
  const content = `\n\n版本: ${config.version}\n主页: ${config.home}\nGithub: ${config.github}`;
  console.info(`%c${title1} %c${title2} %c${content}`, styleTitle1, styleTitle2, styleContent);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", getWidth);
});
</script>

<style lang="scss" scoped>
#main {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: scale(1.2);
  transition: transform 0.3s;
  animation: fade-blur-main-in 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  animation-delay: 0.5s;
  .container {
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    padding: 0 0.5vw;
    .all {
      width: 100%;
      height: 100%;
      padding: 0 0.75rem;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
    .more {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #00000080;
      backdrop-filter: blur(20px);
      z-index: 2;
      animation: fade 0.5s;
    }
    @media (max-width: 1200px) {
      padding: 0 2vw;
    }
  }
  .mobile-nav {
    display: none;
  }
  @media (max-width: 720px) {
    width: 100%;
    height: 100vh;
    height: 100dvh;
    overflow: hidden;
    .container {
      width: 100%;
      height: 100vh;
      height: 100dvh;
      min-width: 0;
      max-width: none;
      padding: 0 20px;
      overflow: hidden;
      .all {
        width: 100%;
        max-width: 100%;
        min-width: 0;
        padding: 0;
        overflow: hidden;
        > * {
          min-width: 0;
          max-width: 100%;
        }
      }
      .more {
        width: 100%;
        height: 100%;
      }
    }
    .mobile-nav {
      position: absolute;
      display: grid;
      grid-template-columns: 24px 1fr 24px;
      align-items: center;
      left: 20px;
      right: 20px;
      bottom: calc(82px + env(safe-area-inset-bottom));
      width: auto;
      height: 56px;
      padding: 0 16px;
      border: 0;
      appearance: none;
      color: #fff;
      font: inherit;
      font-size: 16px;
      font-weight: 500;
      letter-spacing: 0;
      cursor: pointer;
      z-index: 3;
      animation: fade 0.5s;
      &:focus-visible {
        outline: 2px solid rgb(255 255 255 / 90%);
        outline-offset: 3px;
      }
      .mobile-nav__icon {
        grid-column: 1;
        justify-self: center;
        align-self: center;
        line-height: 1;
      }
      .mobile-nav__label {
        grid-column: 2;
        justify-self: center;
        align-self: center;
        line-height: 1;
        white-space: nowrap;
      }
      &::after {
        content: "";
        grid-column: 3;
        width: 24px;
        height: 1px;
      }
    }
  }
  @media (max-width: 720px) and (max-height: 680px) {
    .container {
      .all {
        align-items: flex-start;
        padding-top: max(16px, env(safe-area-inset-top));
        padding-bottom: calc(118px + env(safe-area-inset-bottom));
        overflow-x: hidden;
        overflow-y: auto;
        overscroll-behavior-y: contain;
        scrollbar-width: none;
        > * {
          flex-shrink: 0;
          margin-top: auto;
          margin-bottom: auto;
        }
        &::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }
      }
    }
    .mobile-nav {
      bottom: calc(58px + env(safe-area-inset-bottom));
      height: 52px;
    }
  }
  @media (min-width: 721px) and (max-height: 680px) {
    .container {
      height: 100vh;
      height: 100dvh;
      overflow: hidden;
      .all {
        align-items: flex-start;
        padding-top: 16px;
        padding-bottom: 62px;
        overflow-x: hidden;
        overflow-y: auto;
        scrollbar-width: none;
        > * {
          flex-shrink: 0;
          margin-top: auto;
          margin-bottom: auto;
        }
        &::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }
      }
    }
  }
}
</style>
