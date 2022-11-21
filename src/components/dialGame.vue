<template>
  <div class="dial-animate-wrap">
    <div class="dial-bg" :style="rotateStyle"><img :src="stateData.prize_img" alt=""></div>
    <div class="dial-run" @click="run">
      <div>点击抽奖</div>
      <p>10超级币/次</p>
    </div>
    <div class="dial-mork-wrap" @touchmove.prevent.stop v-if="isrun"></div>
    <!-- 抽奖进行中，禁用页面所有操作 z-index: 99; -->
  </div>
</template>

<script setup>
import { ref, reactive, computed, defineProps, defineEmits } from 'vue'
const emit = defineEmits(['draw_fin'])
const isrun = ref(false)
const rotateAngle = ref(0)
const config = reactive({
  duration: 4000,
  circle: 8,
  mode: 'ease-in-out'
})
const circleAdd = ref(1)
const drawIndex = ref(0)

const rotateStyle = computed(() => {
  const _c = config
  return `
        -webkit-transition: transform ${_c.duration}ms ${_c.mode};
        transition: transform ${_c.duration}ms ${_c.mode};
        -webkit-transform: rotate(${rotateAngle.value}deg);
            transform: rotate(${rotateAngle.value}deg);`
})

const props = defineProps({
  httpData: Object,
  stateData: {
    type: Object,
    default: () => {
      return {
        coin: 0, // 超级币数量
        prize_img: '' // 转盘图片
      }
    }
  }
})

async function run() {
  if (props.stateData.coin < 10) {
    console.log('超级币不足')
    return
  }

  if (isrun.value) return
  const data = await goDraw()
  console.log(data, 'data');
  // 可以作为弹窗等信息展示
  emit('draw_fin', 'start')
  isrun.value = true
  // drawIndex.value = 3 // 通过调整drawIndex改变奖品
  rotateAngle.value = config.circle * 360 * circleAdd.value - (22.5 + drawIndex.value * 45)
  // 圈数位置解析
  // this.config.circle * 360 * this.cricleAdd 顺时针总圈数/累积总圈数
  // 22.5 + this.drawIndex * 45 ===> (奖品位置 === this.drawIndex * 45) (指针中间位置 === 22.5)

  circleAdd.value++
  setTimeout(() => {
    emit('draw_fin', 'fin')
    isrun.value = false
  }, config.duration)
}

async function goDraw () {
  // 请求接口拿到中奖商品
  await wait()
  // 加下自己项目的样式 loading 用户体验
  return new Promise((resolve) => {
    // await 奖品接口
    resolve({
      msg: '抽奖明细'
    })
  }).catch(err => {
    console.log(err);
  })
}

function wait() {
  setTimeout(() => {
    return
  }, 0);
}
</script>

<style scoped lang="less">
.dial-mork-wrap{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
}
.dial-animate-wrap{
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .dial-bg{
    img{
      width: 100%;
      height: 100%;
    }
  }
  .dial-run{
    width: 300px;
    height: 300px;
    background: url('../assets/dial-center-icon.png') no-repeat;
    background-size: contain;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    text-align: center;
    display: flex;
    align-content: center;
    flex-wrap: wrap;
    div{
      width: 100%;
      font-size: 24px;
      font-weight: bold;
      color: #FF1717;
      line-height: 2;
    }
    p{
      width: 100%;
      font-size: 12px;
      font-weight: bold;
      color: #834F36;
      line-height: 1.5;
    }
  }
}
</style>
