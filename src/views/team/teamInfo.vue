<template>
  <div class="content">
    <a-row>
      <divTitle :msg="title" :span="colSpan" :lastDate="getDate()" />
    </a-row>
    <inTeamTopOne />
    <a-row>
      <a-tabs type="card" class="tabsBox">
        <a-tab-pane key="1" tab="日程表/结果">
          <calendar />
        </a-tab-pane>
        <a-tab-pane key="2" tab="以前结果"></a-tab-pane>
        <a-tab-pane key="3" tab="会员"></a-tab-pane>
      </a-tabs>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import divTitle from "@/components/DividingLine.vue";
import inTeamTopOne from "@/components/inTeamTopOne.vue";
// tabs
import calendar from './teamInfoTabs/calendar.vue'
export default defineComponent({
  name: "templete",
  components: {
    divTitle,
    inTeamTopOne,
    calendar
  },
  setup() {
    const data = reactive({
      title: "队伍",
      colSpan:4,
      getDate: () => {
        return "2020-10-17";
      },
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped>
.rowStyle {
  margin: 10px;
}
.tabsBox >>> .ant-tabs-nav-scroll {
  display: flex;
}
</style>
