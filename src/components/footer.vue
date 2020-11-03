<template>
  <a-row class="row">
    <a-col :span="4" class="imgBox">
      <img :src="img" alt="">
    </a-col>
    <a-col :span="16" class="center">
      <div class="other">
        <div class="firstBox">{{ $t('default.162') }}</div>|
        <div class="textBox">{{ $t('default.22') }}</div>|
        <div class="textBox">{{ $t('default.22') }}</div>
      </div>
      <div>asdasdasdsadsadasdsadasdsadadsadsadsadas</div>
    </a-col>
    <a-col :span="4" class="btnBG">
      <a-select v-model:value="value" style="width: 120px" @change="valueChange">
        <a-select-option :value="1">
          Jack
        </a-select-option>
        <a-select-option :value="2">
          Lucy
        </a-select-option>
        <a-select-option :value="3">
          Disabled
        </a-select-option>
        <a-select-option :value="4">
          yiminghe
        </a-select-option>
      </a-select>
    </a-col>
  </a-row>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "afooter",
  components: {
  },
  setup() {
    const data = reactive({
      img: require("@/assets/logo.jpg"),
      value:1,
      valueChange:(value: number) => {
        console.log(value)
      },
      handleMenuClick: () => {
        console.log("handleMenuClick");
      },
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>
<style scoped>
.row {
  height: 100px;
  text-align: left;
  background: #f1f0ed;
}
.imgBox {
  height: 100px;
}
.row img {
  height: 100%;
}
.other {
  display: flex;
}
.firstBox {
  margin-right: 10px;
}
.textBox {
  margin: 0 10px;
}
.center {
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;
}
.btnBG {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btnBG button {
  width: 100%;
}
</style>