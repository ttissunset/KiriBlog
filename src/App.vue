<script setup>
import Header from './components/Header.vue';
</script>

<template>
  <div class="app">
    <Header />
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  list-style: none;
  /* 自动换行 */
  word-break: break-all;
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar-track {
  background-color: #e4e4e4;
}
::-webkit-scrollbar-thumb {
  background-color: rgb(162, 170, 211);
  border-radius: 5px;
}

body {
  scroll-behavior: smooth;
  background-color: var(--white-a7);
}

a {
  color: var(--black);
  text-decoration: none;
  font-size: var(--fs-18);
}

button {
  border: none;
  background-color: transparent;
}

input {
  margin: 0;
  padding: 0;
}

input[type='checkbox'] {
  width: 16px;
  height: 16px;
}
:root {
  /* font-size */
  --fs-12: 12px;
  --fs-14: 14px;
  --fs-16: 16px;
  --fs-18: 18px;
  --fs-20: 20px;
  --fs-24: 24px;
  --fs-30: 30px;

  /* fonty-weight */
  --fw-800: 800;
  --fw-700: 700;
  --fw-600: 600;
  --fw-500: 500;

  /* font-family */
  --ff-llt: 'llt', llt;

  /* color */
  --info-dark: #7d8da1;
  --dark: #363949;
  --light: rgba(132, 139, 200, 0.18);
  --dark-variant: #677483;
  --light-white: #fff;
  --white: hsla(0, 0%, 100%, 0.6);
  --white_a3: hsla(0, 0%, 100%, 0.03);
  --white_a8: hsla(0, 0%, 100%, 0.08);
  --white_a12: hsla(0, 0%, 100%, 0.12);
  --white_a70: hsla(0, 0%, 100%, 0.7);
  --cultured: hsla(220, 20%, 97%, 1);
  --lavender-web: hsla(233, 52%, 94%, 1);
  --raisin-black: rgb(198, 200, 203);
  --black: rgb(0, 0, 0);
  --youth-green: rgb(112, 200, 152);
  --youth-green-2: rgb(98, 217, 151);
  --youth-green-3: rgb(52, 183, 110);
  --youth-green-4: rgb(225, 246, 234);
  --bg-green: rgb(229, 243, 229);
  --blackish-green: rgb(40, 72, 64);
  --blue-purple: rgb(153, 180, 222);
  --youth-blue: rgb(199, 206, 232);
  --youth-blue-dark: rgb(144, 162, 216);
  --youth-blue-purple: rgb(98, 125, 211);
  --red: rgb(255, 0, 0);
  --dark-pink: hsl(358, 91%, 70%);
  --light-gray: rgb(139, 128, 128);
  --dark-gray: rgb(146, 137, 137);
  --youth-blue-2: rgb(215, 223, 250);
  --youth-blue-3: rgb(244, 246, 252);
  --blue: rgb(83, 147, 194);
  --blue-crayola: hsla(219, 72%, 56%, 1);
  --purplr-crayola: #c471d6;
  --pink-crayola: #ff74b0;
  --orange-crayola: #ff9483;
  --orange-crayola-light: #ffcac2;

  /*border radius*/
  --radius-circle: 50%;
  --radius-50: 50px;
  --radius-40: 40px;
  --radius-30: 30px;
  --radius-20: 20px;
  --radius-10: 10px;
  --radius-8: 8px;
  --radius-6: 6px;

  /* 变化过程动画 */
  --transition-1: 0.25s ease;
  --transition-2: 0.5s ease;
  --transition-3: 0.3s ease-in-out;
  --transition-4: 0.5s ease-in-out;

  /*shadow*/
  --shadow-1: 0 0 20px hsla(216, 14%, 14%, 0.05);
  --shadow-2: 0 0 0 0.05rem hsla(214, 88%, 27%, 0.08),
    0 0 1.25rem hsla(216, 14%, 14%, 0.06);
  --shadow-3: 0 0 1.25rem hsla(216, 14%, 14%, 0.04);
  --shadow-4: 0 0 1.25rem hsla(226, 18%, 18%, 0.05);
  --shadow-5: 0.5rem 0.5rem 1.25rem hsla(250, 20%, 20%, 0.06);
  --shadow-6: 0.7rem 0.8rem 1.35rem hsla(270, 25%, 25%, 0.07),
    0 0 1.25rem hsla(216, 14%, 14%, 0.06);
  --box-shadow: 0 0.5em 1em rgba(208, 187, 208, 0.5);
  --box-shadow-1: 0 0.7em 2em rgba(208, 187, 208, 0.5);
  --box-shadow-2: 0 0.2em 1em rgba(202, 166, 243, 0.5);
}

@font-face {
  font-family: 'llt';
  src: url('./assets/fonts/萝莉体 第二版.ttc');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

.material-icons-sharp {
  font-family: 'Material Icons Sharp';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
}

.app {
  font-family: var(--ff-llt);
}
</style>
