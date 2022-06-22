<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="16"
        ><el-card style="height: 50%">
          <el-row :gutter="20" class="small">
            <el-col :span="24"
              ><el-card>
                <div class="demo-basic--circle">
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <el-avatar
                        shape="square"
                        :size="50"
                        :src="squareUrl"
                      ></el-avatar
                    ></el-col>
                    <el-col :span="2"> <span>阿杰</span></el-col>
                    <el-col :span="5">
                      <span
                        >woの博客：<a
                          href="http://a182644.github.io"
                          target="bank"
                          >冲冲冲！！！</a
                        ></span
                      ></el-col
                    >
                    <el-col :span="10">
                      <div class="dete">此刻时间：{{ dateFormat(date) }}</div>
                    </el-col>
                  </el-row>

                  <br />
                </div> </el-card
            ></el-col>
            <el-col :span="18"><el-card></el-card></el-col>
            <el-col :span="6"><el-card></el-card></el-col>
            <el-col :span="24"><el-card></el-card></el-col>
          </el-row> </el-card
      ></el-col>
      <el-col :span="8"><el-card></el-card></el-col>
    </el-row>

    <!-- <div class="card">
      <h1>牢记社会核心价值观</h1>
      <h2>富强 民主 文明 和谐</h2>
      <h3>自由 平等 公正 法制</h3>
      <h4>爱国 敬业 诚信 友善</h4>
    </div> -->
    <!-- <div class="circle"></div>
    <div class="rect"></div> -->
  </div>
</template>

<script>
export default {
  name: "Welcome",
  data() {
    return {
      squareUrl:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      ht: `woの博客:<a>a182644.github.io</a>`,

      date: new Date(),
    };
  },
  mounted() {
    let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(() => {
      _this.date = new Date(); // 修改数据date
    }, 1000);
  },

  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  },

  methods: {
    dateFormat(time) {
      var date = new Date(time);
      var year = date.getFullYear();
      /* 在日期格式中，月份是从0开始的，因此要加0
       * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
       * */
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      // 拼接
      const tim =
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds;
      return tim;
    },
  },
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
    rgba(245, 0, 0, 0.5),
    rgba(245, 0, 0, 0.8)
  );
  box-shadow: 10px -10px 20px rgba(255, 0, 0, 0.2),
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
  background: linear-gradient(to top left, rgb(255, 1, 1), rgb(255, 0, 0));
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
      rgba(4, 175, 132, 0.8),
      transparent 25%
    ),
    #182336;
}
a {
  text-decoration: none;
}
.small {
  .el-card {
    margin-top: 50px;
  }
}
.dete {
  backdrop-filter: blur(5px);
  background-color: #409eff;
  font-size: 20px;
  color: #fff;
  height: 50px;
  border-radius: 15px;
  text-align: center;
  line-height: 50px;
  box-shadow: 1px 1px 1px rgba(245, 0, 0, 0.8);
}
</style>