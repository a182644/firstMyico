<template>
  <div>
    <Header name1="商品管理" name2="分类参数"></Header>
    <el-card>
      <div class="topMessage">
        <i class="el-icon-warning-outline"></i>
        <span style="font-size: 10px"
          >注意: 只允许为第三级分类设置相关参数！</span
        >
      </div>
      <span style="font-size: 12px">请选择商品分类：</span>
      <el-cascader
        v-model="valueList"
        :options="options"
        @change="handleChange"
      ></el-cascader>
      <div class="content">
        <div class="fs">
          <div class="body">
            <div class="gears">
              <input hidden id="gears1" name="gears" type="radio" /><label
                for="gears1"
                >LOW</label
              >
              <input hidden id="gears2" name="gears" type="radio" /><label
                for="gears2"
                >MEDI</label
              >
              <input hidden id="gears3" name="gears" type="radio" /><label
                for="gears3"
                >HIGHT</label
              >
              <input hidden id="fly" name="gears" type="radio" /><label
                for="fly"
                >FLY</label
              >
              <div class="head">
                <div class="flabellum"></div>
                <div class="flabellum f2"></div>
              </div>
            </div>
          </div>
          <div class="foot"></div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valueList: [],
      options: [],
    };
  },
  methods: {
    async handleChange() {
      const { data: res } = await this.$http.get(`categories/${id}/attributes`);
      if (res.meta.status !== 200) {
        return this.$message.error("获取分类参数失败");
      }
      this.options = res.data;
    },
  },
};
</script>

<style scoped>
.topMessage {
  background-color: #fdf6ec;
  width: 100%;
  height: 40px;
  line-height: 40px;
  color: red;
}

* {
  margin: 0;
  padding: 0;
}

body {
  background: darkgoldenrod;
}

.content {
  width: 600px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  margin: 200px auto 0;
}

.fs {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.head {
  top: -190px;
  left: -146px;
  position: absolute;
}

.head:hover {
  transform: rotate(666turn);
  transition-delay: 1s;
  transition-property: all;
  transition-duration: 59s;
  transition-timing-function: cubic-bezier(0.34, 0, 0.84, 1);
}

.flabellum {
  width: 350px;
  height: 10px;
  position: relative;
  background-color: #008000;
}

.f2 {
  transform: rotate(90deg);
}

.flabellum:before {
  content: "";
  top: -100px;
  right: 0;
  position: absolute;
  border-top: 50px solid transparent;
  border-left: 60px solid transparent;
  border-bottom: 50px solid chartreuse;
  border-right: 80px solid transparent;
}
.f2:before {
  border-bottom: 50px solid dodgerblue;
}

.flabellum:after {
  content: "";
  position: absolute;
  top: 10px;
  border-top: 50px solid #00b894;
  border-left: 60px solid transparent;
  border-bottom: 50px solid transparent;
  border-right: 80px solid transparent;
}
.f2:after {
  border-top: 50px solid brown;
}
.body {
  height: 400px;
  width: 50px;
  background-color: #fff;
}

.foot {
  width: 300px;
  height: 20px;
  background-color: #fff;
}

.gears {
  position: relative;
  margin-top: 180px;
}

label {
  width: 100%;
  display: inline-block;
  cursor: pointer;
  margin-top: 20px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background-color: silver;
}

input:checked + label {
  background-color: aquamarine;
}

input[id="gears1"]:checked ~ .head {
  animation-name: rotate;
  animation-direction: normal;
  animation-duration: 0.6s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-fill-mode: backwards;
}

input[id="gears2"]:checked ~ .head {
  animation-name: rotate;
  animation-direction: normal;
  animation-duration: 0.5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-fill-mode: backwards;
}

input[id="gears3"]:checked ~ .head {
  animation-name: rotate;
  animation-direction: normal;
  animation-duration: 0.2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-fill-mode: backwards;
}

input[id="fly"]:checked ~ .head {
  animation-name: rotate;
  animation-direction: normal;
  animation-duration: 0.01s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-fill-mode: backwards;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
</style>