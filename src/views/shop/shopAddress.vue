<template>
  <div class="content">
    <a-row>
      <inShopInfo />
    </a-row>
    <a-row>
      <a-tabs type="card" class="tabsBox">
        <a-tab-pane key="1" :tab="$t('default.171')">
          <historyMatch />
        </a-tab-pane>
        <a-tab-pane key="2" :tab="$t('default.9')">
          <team />
        </a-tab-pane>
        <a-tab-pane key="3" :tab="$t('default.10')">
          <player />
        </a-tab-pane>
      </a-tabs>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import inShopInfo from "@/components/inShopInfo.vue";
import historyMatch from "@/views/shop/tabs/historyMatch.vue";
import team from "@/views/shop/tabs/team.vue";
import player from "@/views/shop/tabs/player.vue";
export default defineComponent({
  name: "shopAddress",
  components: {
    inShopInfo,
    historyMatch,
    team,
    player
  },
  setup() {
    const data = reactive({
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
