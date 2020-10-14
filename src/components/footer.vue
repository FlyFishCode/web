<template>
  <a-row class="row">
    <a-col :span="4" class="imgBox">
      <img :src="img" alt="">
    </a-col>
    <a-col :span="16" class="center">
      <div class="other">
        <div class="firstBox">服务条款</div>|
        <div class="textBox">隐私声明</div>|
        <div class="textBox">公司介绍</div>
      </div>
      <div>asdasdasdsadsadasdsadasdsadadsadsadsadas</div>
    </a-col>
    <a-col :span="4" class="btnBG">
      <a-dropdown>
        <template v-slot:overlay>
          <a-menu @click="handleMenuClick">
            <a-menu-item key="1">
              <UserOutlined />1st menu item
            </a-menu-item>
            <a-menu-item key="2">
              <UserOutlined />2nd menu item
            </a-menu-item>
            <a-menu-item key="3">
              <UserOutlined />3rd item
            </a-menu-item>
          </a-menu>
        </template>
        <a-button style="margin-left: 8px"> Button
          <DownOutlined />
        </a-button>
      </a-dropdown>
    </a-col>
  </a-row>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { DownOutlined,UserOutlined  } from "@ant-design/icons-vue";

export default defineComponent({
  name: "afooter",
  components:{
    DownOutlined,
    UserOutlined 
  },
  setup() {
    const data = reactive({
      img: require("@/assets/logo.jpg"),
      handleMenuClick:() => {
        console.log('handleMenuClick')
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
.btnBG{
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btnBG button{
  width: 100%;
}
</style>