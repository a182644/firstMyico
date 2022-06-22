<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <el-button
      circle
      @click="changeRains"
      icon="el-icon-heavy-rain"
      class="changebtn"
      v-show="!isRain"
      type="primary"
      style="background-color: #409eff; border-color: #409eff"
    ></el-button>
    <el-button
      circle
      @click="changeRains"
      icon="el-icon-sunrise"
      class="changebtn"
      v-show="isRain"
      type="warning"
    ></el-button>

    <el-button
      class="black"
      @click="black"
      icon="el-icon-s-home"
      circle
    ></el-button>

    <Rains v-if="showRains"></Rains>
  </div>
</template>

<script>
import Login from "./components/Login.vue";
import Rains from "./components/Conpoll/Rain/Rains.vue";

export default {
  name: "app",
  components: {
    Login,
    Rains,
  },
  data() {
    return {
      showRains: true,
      isRain: false,
    };
  },
  methods: {
    changeRains() {
      this.showRains = !this.showRains;
      this.isRain = !this.isRain;
      // alert("切换显示");
    },
    black() {
      this.$router.push("/welcome");
    },
  },
};
</script>

<style>
/*页面切换动画*/
/*进入过渡的结束状态，元素被插入时就生效，在过渡过程完成后移除*/
.fade-enter-active {
  transition: opacity 0.5s;
}
/*进入过渡的开始状态，元素被插入时生效，只应用一帧后立刻删除*/
.fade-enter {
  opacity: 0;
}
/*离开过渡的开始状态，元素被删除时触发，只应用一帧后立刻删除*/
.fade-leave {
  opacity: 1;
}
/*离开过渡的结束状态，元素被删除时生效，离开过渡完成后被删除*/
.fade-leave-active {
  opacity: 0;
  transition: opacity 0.5s;
}
.changebtn {
  position: absolute;
  right: 100px;
  top: 20px;
  /* z-index: 999; */
  border-radius: 50px;
}
.black {
  position: absolute;
  right: 300px;
  top: 15px;
}
</style>
