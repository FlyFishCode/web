<template>
  <div>
    <a-row>
      <a-col :span='4' class="centerFont">
        <SettingFilled /> {{ msg }}
      </a-col>
    </a-row>
    <a-row>
      <a-col :span='3' class="dropdown">
        <a-dropdown>
          <template v-slot:overlay>
            <a-menu @click="handleMenuClick">
              <a-menu-item key="1">1st menu item</a-menu-item>
              <a-menu-item key="2">2nd menu item</a-menu-item>
              <a-menu-item key="3">3rd item</a-menu-item>
            </a-menu>
          </template>
          <a-button style="margin-left: 8px"> Button
            <DownOutlined />
          </a-button>
        </a-dropdown>
      </a-col>
      <a-col :span='3' class="dropdown">
        <a-dropdown>
          <template v-slot:overlay>
            <a-menu @click="handleMenuClick">
              <a-menu-item key="1">1st menu item</a-menu-item>
              <a-menu-item key="2">2nd menu item</a-menu-item>
              <a-menu-item key="3">3rd item</a-menu-item>
            </a-menu>
          </template>
          <a-button style="margin-left: 8px"> Button
            <DownOutlined />
          </a-button>
        </a-dropdown>
      </a-col>
      <a-col :span='3' :offset="15">
        <a-button type="danger" @click="showMatchTable">{{ '查看对阵表' }}</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { SettingFilled, DownOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  name: "calendar",
  components: {
    SettingFilled,
    DownOutlined,
  },
  setup() {
    const data = reactive({
      msg: "日程表/结果",
      showMatchTable:() => {
        console.log('1111')
      }
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style>
</style>