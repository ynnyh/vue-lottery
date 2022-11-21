<!--
 * @Author: 月魂
 * @Date: 2022-11-21 10:07:24
 * @LastEditTime: 2022-11-21 14:05:25
 * @LastEditors: 月魂
 * @Description: 
 * @FilePath: \zhuan\src\views\HomeView.vue
-->
<template>
  <div class="dial-container">
    <section>
      <DialWrap ref="dialWrap" :stateData="stateData" @draw_fin="handleClick"></DialWrap>
    </section>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import DialWrap from '@/components/dialGame.vue'
import prizeImg from '@/assets/dial.png'
const stateData = reactive({
  coin: 10,
  prize_img: prizeImg
})

function handleClick(type) {
  console.log(type, 'in finish');
  // 此处与后台请求确认结果及停止动画
}
</script>

<style lang="less" scoped>
.dial-container {
  width: 100%;
  height: 100%;
  background: url(../assets/home-bg.png) no-repeat, rgb(255,107,5);
  background-size: cover;
  display: inline-block;
  section{
    width: 100%;
    margin: 0 auto;
    margin-top: 200px;
  }
}
</style>
