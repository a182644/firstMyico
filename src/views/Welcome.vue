<template>
  <div>
    <div class="wecbox">欢迎</div>
    <!-- <div class="wecbox center">!</div>
    <div class="wecbox footer">!</div> -->
    <div class="card">
      <h1>TiKi Platinum</h1>
      <h2>6228 8076 2232 8768</h2>
      <h3>van conf banck</h3>
      <h4>03 / 29</h4>
    </div>
    <div class="circle"></div>
    <div class="rect"></div>
  </div>
</template>

<script>
export default {
  name: "Welcome",
};
</script>

<style lang="less" scoped>
.wecbox {
  // width: 100%;
  height: 100px;
  width: 100%;
  background-color: rgb(250, 246, 246);
  font-size: 30px;
  text-align: center;
  line-height: 100px;
  margin-bottom: 50px;
}
.center {
  background-color: rgb(248, 217, 222);
}
.footer {
  background-color: rgb(221, 219, 219);
}

* {
  margin: 0;
  padding: 0;
}
.card {
  color: rgba(255, 255, 255, 0.8);
  position: absolute;
  right: 100px;
  bottom: 100px;
  z-index: 10;
  font-family: sans-serif;
  text-align: center;
  width: 300px;
  height: 500px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  border-left: 1px solid rgba(255, 255, 255, 0.4);
  background: linear-gradient(
    to top right,
    rgba(90, 149, 207, 0.5),
    rgba(58, 76, 99, 0.8)
  );
  box-shadow: 10px -10px 20px rgba(0, 0, 0, 0.2),
    -10px 10px 20px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 20px;
  transform: rotate(-15deg);
}
h1 {
  margin-top: 50px;
}
h2 {
  margin-top: 250px;
}
h3,
h4 {
  padding-left: 60px;
  text-align: left;
}
h3 {
  margin-top: 40px;
  text-transform: uppercase;
}
h4 {
  margin-top: 10px;
}
.circle {
  width: 160px;
  height: 160px;
  position: absolute;
  right: 240px;
  bottom: 20px;
  background: linear-gradient(to top left, rgb(135 116 249), rgb(75 162 237));
  border-radius: 80px;
}
.rect {
  width: 160px;
  height: 160px;
  position: absolute;
  right: 110px;
  bottom: 520px;
  background: linear-gradient(
    to top left,
    rgba(135, 116, 249, 0.9),
    rgba(75, 162, 237, 0.9)
  );
  border-radius: 20px;
}
body {
  height: 100vh;
  background: radial-gradient(
      circle at 60% 90%,
      rgba(46, 103, 161, 1),
      transparent 60%
    ),
    radial-gradient(
      circle at 20px 20px,
      rgba(46, 103, 161, 0.8),
      transparent 25%
    ),
    #182336;
}
</style>