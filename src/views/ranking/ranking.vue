<template>
  <div class="content">
    <a-row>
      <divTitle :msg="title" :span='colSpan' :lastDate="getDate()" />
    </a-row>
    <a-tabs type="card" class="tabsBox">
      <a-tab-pane key="1" :tab="$t('default.67')">
        <teamRanking />
      </a-tab-pane>
      <a-tab-pane key="2" :tab="$t('default.181')">
        <teamHistory />
      </a-tab-pane>
      <a-tab-pane key="3" :tab="$t('default.68')">
        <plyaerRanking />
      </a-tab-pane>
      <a-tab-pane key="4" :tab="$t('default.182')">
        <playerHistory />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import divTitle from "@/components/DividingLine.vue";
import teamRanking from "@/views/ranking/tabs/teamRanking.vue";
import teamHistory from "@/views/ranking/tabs/teamHistory.vue";
import plyaerRanking from "@/views/ranking/tabs/plyaerRanking.vue";
import playerHistory from "@/views/ranking/tabs/playerHistory.vue";
export default defineComponent({
  name: "templete",
  components: {
    divTitle,
    teamRanking,
    teamHistory,
    plyaerRanking,
    playerHistory
  },
  setup() {
    const data = reactive({
      title: "default.180",
      colSpan: 5,
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
.tabsBox >>> .ant-tabs-nav-scroll {
  display: flex;
}
</style>
