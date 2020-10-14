<template>
  <a-row type="flex" justify="center">
    <a-col :span="14" class="bg">
      <hearder />
      <router-view />
      <afooter />
    </a-col>
  </a-row>
</template>

<script lang="ts">
import hearder from "@/components/hearder.vue";
import afooter from "@/components/footer.vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "app",
  components: {
    hearder,
    afooter,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.bg {
  border: 1px solid #eee;
}
.rowStyle {
  margin: 15px 0;
}
#title-g{
  height: 50px;
  border-radius: 20px 20px 0 0;
  border: 1px solid #2b2b2b;
  margin: 10px 0;
  font-size: 30px;
  line-height: 50px;
}
/*  字体标题 */
.centerFont {
  font-size: 20px;
  font-weight: bold;
  color: red;
  margin: 5px 0;
}
/* // 按钮宽度 */
.buttonBox button {
  width: 100%;
}
/* 下拉框按钮宽度 */
.dropdown button {
  width: 100%;
}
</style>
