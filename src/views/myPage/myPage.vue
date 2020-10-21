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
        <a-tab-pane key="1" tab="我的比赛信息">
          <myMatchInfo />
        </a-tab-pane>
        <a-tab-pane key="2" tab="我的对战">
          <myBattle />
        </a-tab-pane>
        <a-tab-pane key="3" tab="消息">
          <message />
        </a-tab-pane>
        <a-tab-pane key="4" tab="我的等级"></a-tab-pane>
        <a-tab-pane key="5" tab="我的队伍"></a-tab-pane>
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
export default defineComponent({
  name: "myPage",
  components: {
    divTitle,
    myPageUI,
    myMatchInfo,
    myBattle,
    message
  },
  setup() {
    const data = reactive({
      title: "我的页面",
      colSpan: 4,
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
