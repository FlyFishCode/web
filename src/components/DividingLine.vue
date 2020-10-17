<template>
  <div>
    <a-row class="line">
      <a-col :span='span' class="fontStyle">{{ msg }}</a-col>
      <a-col v-if="lastDate" :span='8' class="timeStyle" :offset="24-8-span">{{ '最后更新：' + lastDate }}</a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String,
    span:Number,
    lastDate: String,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.line {
  height: 50px;
  border-radius: 20px 20px 0 0;
  border: 1px solid #2b2b2b;
  margin: 10px 0;
}
.fontStyle {
  font-size: 30px;
}
.timeStyle{
  color: red;
  height: 50px;
  line-height: 50px;
}
</style>
