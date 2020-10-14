<template>
  <div class="content">
    <a-row id="title-g">
      <a-col :span='3'>{{ title }}</a-col>
    </a-row>
    <a-row>
      <a-col :span='3'>
        <a-dropdown>
          <template v-slot:overlay>
            <a-menu>
              <a-menu-item v-for="item in newsSearch" :key="item.id" @click="handleMenuClick(item.value)">
                {{ item.value }}
              </a-menu-item>
            </a-menu>
          </template>
          <a-button class="btnStyle" style="margin-left: 8px">{{ currentValue }}
            <DownOutlined />
          </a-button>
        </a-dropdown>
      </a-col>
      <a-col :span='10'>
        <a-input-search v-model:value="value" style="width: 200px" @search="onSearch" />
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { DownOutlined } from "@ant-design/icons-vue";
interface HTMLInputEvent {
  value: HTMLInputElement & EventTarget;
}
export default defineComponent({
  name: "hearder",
  components: {  DownOutlined },
  setup() {
    const data = reactive({
      title: "新闻",
      currentValue: "新闻",
      value:'',
      newsSearch: [
        { id: 1, value: "新闻" },
        { id: 2, value: "标题" },
        { id: 3, value: "新闻+标题" },
      ],
      handleMenuClick: (e: string) => {
        data.currentValue = e;
      },
      onSearch:(e: string) => {
        console.log(e)
      }
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>
<style scoped>
.imgBox {
  height: 100px;
}
.imgBox img {
  height: 100%;
}
.tabsBox >>> .ant-tabs-nav-scroll {
  display: flex;
  margin: 10px;
}
.btnStyle {
  width: 100%;
}
.content{
  margin: 5px;;
}
</style>>