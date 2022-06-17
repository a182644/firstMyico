<template>
  <div class="content">
    <div id="rainBox"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    const box = document.getElementById("rainBox");
    let boxHeight = box.clientHeight;
    let boxWidth = box.clientWidth;
    window.onresize = function () {
      boxHeight = box.clientHeight;
      boxWidth = box.clientWidth;
    };
    function rainDot() {
      let rain = document.createElement("div");
      rain.classList.add("rain");
      rain.style.top = 0;
      rain.style.left = `${Math.random() * boxWidth}px`;
      rain.style.opacity = Math.random();
      box.appendChild(rain);

      let gap = 10;
      const loop = setInterval(() => {
        if (parseInt(rain.style.top) > boxHeight) {
          clearInterval(loop);
          box.removeChild(rain);
        }
        gap++;
        rain.style.top = `${parseInt(rain.style.top) + gap}px`;
      }, 10);
    }
    setInterval(() => {
      rainDot();
    }, 10);
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.content {
  height: 100%;
}

#rainBox {
  height: 100%;
  /* z-index: 1111; */
}

.rain {
  position: absolute;
  width: 1px;
  height: 30px;
  background: linear-gradient(rgba(36, 14, 238, 0.3), rgba(93, 65, 250, 0.66));
  z-index: 1111;
}
</style>