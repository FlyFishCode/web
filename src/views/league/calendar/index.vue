<template>
  <div class="content">
    <a-row class="imgBox">
      <img :src="img" alt="">
    </a-row>
    <a-row>
      <a-tabs class="tabsBox">
        <a-tab-pane key="1" tab="比赛信息">
          <matchInfo />
        </a-tab-pane>
        <a-tab-pane key="2" tab="日程表/结果">
          <calendar />
        </a-tab-pane>
        <a-tab-pane key="3" tab="排名/记录">
          <ranking />
        </a-tab-pane>
        <a-tab-pane key="4" tab="参赛队伍">
          <matchTeam />
        </a-tab-pane>
      </a-tabs>
    </a-row>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import { useRoute } from 'vue-router'
import matchInfo from "@/views/league/calendar/matchInfo.vue";
import calendar from "@/views/league/calendar/calendar.vue";
import ranking from '@/views/league/calendar/ranking.vue'
import matchTeam from '@/views/league/calendar/matchTeam.vue'
export default defineComponent({
  name: "hearder",
  components: { matchInfo, calendar,matchTeam,ranking },
  setup() {
    const route = useRoute()
    const data = reactive({
      img: require("@/assets/21.jpg"),
      place: "地点",
      currentState: "当前状态",
    });
    onMounted(() => {
      console.log(route.query);
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
.tabsBox >>> .ant-tabs-nav-scroll {
  display: flex;
}
</style>