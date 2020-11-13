<template>
  <a-row class="row">
    <a-col :span="4" class="imgBox">
      <img :src="img" alt="">
    </a-col>
    <a-col :span="17" class="center">
      <div class="other">
        <div class="firstBox">{{ $t('default.162') }}</div>|
        <div class="textBox">{{ $t('default.22') }}</div>|
        <div class="textBox">{{ $t('default.22') }}</div>
      </div>
      <div>asdasdasdsadsadasdsadasdsadadsadsadsadas</div>
    </a-col>
    <a-col :span="3" class="btnBG">
      <a-select v-model:value="value" class="selectBox" @change="valueChange">
        <a-select-option v-for="item in selectList" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
      </a-select>
    </a-col>
  </a-row>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "Afooter",
  components: {
  },
  setup() {
    const data = reactive({
      img: require("@/assets/logo.png"),
      value:1,
      selectList:[
        { value:1 , label: 1 },
        { value:2 , label: 2 },
        { value:3 , label: 3 }
      ],
      valueChange:(value: number) => {
        console.log(value)
      }
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