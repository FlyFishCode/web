<template>
  <div class="content">
    <a-row>
      <divTitle :msg="title" :span='colSpan' />
    </a-row>
    <a-row>
      <myPageUI />
    </a-row>
    <a-row>
      <a-tabs class="tabsBox" type="card">
        <a-tab-pane key="1" :tab="$t('default.106')">
          <myMatchInfo />
        </a-tab-pane>
        <a-tab-pane key="2" :tab="$t('default.107')">
          <myBattle />
        </a-tab-pane>
        <a-tab-pane key="3" :tab="$t('default.108')">
          <message />
        </a-tab-pane>
        <a-tab-pane key="4" :tab="$t('default.109')">
          <myLevel />
        </a-tab-pane>
        <a-tab-pane key="5" :tab="$t('default.110')">
          <myTeam />
        </a-tab-pane>
      </a-tabs>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import divTitle from "@/components/DividingLine.vue";
import myPageUI from "@/components/common/myPageUI.vue";
import myMatchInfo from "@/views/myPage/tabs/myMatchInfo.vue";
import myBattle from "@/views/myPage/tabs/myBattle.vue";
import message from "@/views/myPage/tabs/message.vue";
import myTeam from "@/views/myPage/tabs/myTeam.vue";
import myLevel from "@/views/myPage/tabs/myLevel.vue";
export default defineComponent({
  name: "myPage",
  components: {
    divTitle,
    myPageUI,
    myMatchInfo,
    myBattle,
    message,
    myTeam,
    myLevel
  },
  setup() {
    const data = reactive({
      title: "default.2",
      colSpan: 10,
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
