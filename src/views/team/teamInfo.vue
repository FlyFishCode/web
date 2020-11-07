<template>
  <div class="content">
    <a-row>
      <divTitle :msg="title" :span="colSpan" :lastDate="getDate()" />
    </a-row>
    <inTeamTopOne />
    <a-row>
      <a-tabs type="card" class="tabsBox">
        <a-tab-pane key="1" :tab="$t('default.230')">
          <calendar />
        </a-tab-pane>
        <a-tab-pane key="2" :tab="$t('default.231')">
          <beforeResult />
        </a-tab-pane>
        <a-tab-pane key="3" :tab="$t('default.227')">
          <vip />
        </a-tab-pane>
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
import beforeResult from './teamInfoTabs/beforeResult.vue'
import vip from './teamInfoTabs/vip.vue'
export default defineComponent({
  name: "teamInfo",
  components: {
    divTitle,
    inTeamTopOne,
    calendar,
    beforeResult,
    vip
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
