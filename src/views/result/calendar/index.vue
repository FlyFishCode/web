<template>
  <div class="content">
    <a-row class="imgBox">
      <img :src="img" alt="">
    </a-row>
    <a-row>
      <a-tabs>
        <a-tab-pane key="1" tab="比赛信息">
          <matchInfo />
        </a-tab-pane>
        <a-tab-pane key="2" tab="日程表/结果">
          <calendar />
        </a-tab-pane>
        <a-tab-pane key="3" tab="排名/记录">
          Content of Tab Pane 3
        </a-tab-pane>
        <a-tab-pane key="4" tab="参赛队伍">
          Content of Tab Pane 3
        </a-tab-pane>
      </a-tabs>
    </a-row>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import matchInfo from "@/views/result/calendar/matchInfo.vue";
import calendar from "@/views/result/calendar/calendar.vue";
// import {
//   DownOutlined,
//   BankFilled,
//   SearchOutlined,
//   SettingFilled,
// } from "@ant-design/icons-vue";
// interface HTMLInputEvent {
//   value: HTMLInputElement & EventTarget;
// }
// interface DataProp {
//   monthList: { id: number; value: number }[];
//   currentValue: string;
// }
export default defineComponent({
  name: "hearder",
  components: { matchInfo, calendar },
  setup() {
    const data = reactive({
      img: require("@/assets/21.jpg"),
      place: "地点",
      currentState: "当前状态",
    });
    onMounted(() => {
      console.log(1);
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>
<style scoped>
.imgBox {
  height: 160px;
}
.imgBox img {
  height: 100%;
  width: 100%;
}
</style>