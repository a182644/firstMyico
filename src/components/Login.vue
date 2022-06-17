<template>
  <div class="box">
    <h1 class="toplg">登录</h1>

    <div class="formbox">
      <el-form
        ref="refLoginform"
        :model="Loginform"
        label-width="80px"
        @keyup.enter.native="loginNext"
      >
        <el-form-item label="账户">
          <el-input v-model="Loginform.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="Loginform.password"></el-input>
        </el-form-item>
        <div class="btn">
          <el-button type="primary" @click="loginNext">登录 </el-button>
          <el-button type="info" @click="loginRest">重置</el-button>
        </div>
      </el-form>
    </div>
    <canvas id="canvas" class="login-anim"></canvas>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      Loginform: {
        username: "admin",
        password: "123456",
      },
    };
  },
  mounted() {
    // 实现页面底部波纹特效
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = canvas.parentNode.offsetWidth;
    canvas.height = canvas.parentNode.offsetHeight;
    // console.log(canvas.width, canvas.height);

    // 如果浏览器支持requestAnimFrame则使用requestAnimFrame否则使用setTimeout
    window.requestAnimFrame = (function () {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
          window.setTimeout(callback, 1000 / 60);
        }
      );
    })();

    // 波浪大小
    let boHeight = 40; // canvas.height / 10;
    let posHeight = canvas.height - 150; // canvas.height / 1.2;

    // 初始角度为0
    let step = 0;
    // 定义三条不同波浪的颜色
    let lines = [
      "rgba(27,131,238 0.1)",

      "rgba(64,158,255, 0.6)",
      "rgba(4,90,178, 0.4)",
    ];

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      step++;
      // 画3个不同颜色的矩形
      for (let j = lines.length - 1; j >= 0; j--) {
        ctx.fillStyle = lines[j];

        //每个矩形的角度都不同，每个之间相差45度
        let angle = ((step + j * 70) * Math.PI) / 180; // 50
        let deltaHeight = Math.sin(angle) * boHeight;
        let deltaHeightRight = Math.cos(angle) * boHeight;
        ctx.beginPath();
        ctx.moveTo(0, posHeight + deltaHeight);
        ctx.moveTo(0, posHeight + deltaHeight);
        ctx.bezierCurveTo(
          canvas.width / 2,
          posHeight + deltaHeight - boHeight,
          canvas.width / 2,
          posHeight + deltaHeightRight - boHeight,
          canvas.width,
          posHeight + deltaHeightRight
        );
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.lineTo(0, posHeight + deltaHeight);
        ctx.closePath();
        ctx.fill();
      }
      requestAnimFrame(loop);
    }
    loop();
  },
  methods: {
    loginNext() {
      this.$refs.refLoginform.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post("login", this.Loginform);
        if (res.meta.status !== 200) {
          return this.$message.error("登录失败");
        }
        this.$message.success("登录成功");
        window.sessionStorage.setItem("token", res.data.token);
        this.$router.push("/home");
      });
    },
    loginRest() {
      this.$refs.refLoginform.resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  height: 100%;
  background-color: #fff;
}
.formbox {
  width: 25%;
  height: 25%;
  background-color: rgba(240, 240, 240, 0.5);
  position: absolute;
  border-radius: 25px;
  top: 50%;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
  .el-form-item {
    width: 60%;
    height: 40%;
    transform: translate(30%, 70%);
  }
  .btn {
    margin-top: 70px;
  }
}

#canvas {
  width: 100%;
}
.toplg {
  position: absolute;
  top: 25%;
  left: 48%;
  z-index: 11;
}
</style>