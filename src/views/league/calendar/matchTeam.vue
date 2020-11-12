<template>
  <div>
    <a-row>
      <a-col :span='4' class="centerFont">
        <SettingFilled /> {{ $t('default.153') }}
      </a-col>
    </a-row>

    <a-row class="rowStyle rowSearchBox">
      <a-col :span='3'>
        <a-select v-model:value="matchType" @change="matchTypeChange" style="width: 100px">
          <a-select-option v-for="item in matchTypeList" :key="item.value" :value='item.value'>{{ item.label }}</a-select-option>
        </a-select>
      </a-col>
      <a-col :span='3'>
        <a-select v-model:value="matchType" @change="matchTypeChange" style="width: 100px">
          <a-select-option v-for="item in matchTypeList" :key="item.value" :value='item.value'>{{ item.label }}</a-select-option>
        </a-select>
      </a-col>
      <a-col :span='2' class="titleStyle" :offset="8">
        <SearchOutlined class="fontIcon" />{{ $t('default.140') }}
      </a-col>
      <a-col :span='3'>
        <a-select v-model:value="matchType" @change="matchTypeChange" style="width: 100px">
          <a-select-option v-for="item in matchTypeList" :key="item.value" :value='item.value'>{{ item.label }}</a-select-option>
        </a-select>
      </a-col>
      <a-col :span='5'>
        <a-input-search v-model:value="currentValue" :enter-button="$t('default.16')" size="default" @search="onSearch" />
      </a-col>
    </a-row>
    <!-- 表格 -->
    <a-row>
      <a-table :pagination="false" :data-source="tableList" bordered>
        <a-table-column key="lastName" title="队名" data-index="awayName">
          <template v-slot="{ record:row }">
            <img class="tableImg" :src="row.img" alt="">
            <a @click="fastWay(row)">{{ row.homaName }}</a>
          </template>
        </a-table-column>
        <a-table-column key="lastName" title="对战地点" data-index="lastName" />
        <a-table-column key="lastName" title="队长管理" data-index="lastName" />
        <a-table-column key="lastName" title="玩家号码" data-index="lastName" />
        <a-table-column-group>
          <template v-slot:title>{{ $t('default.154') }}</template>
          <a-table-column key="firstName" title="RATING" data-index="firstName" />
          <a-table-column key="lastName" title="PPD" data-index="lastName" />
          <a-table-column key="lastName" title="MPR" data-index="lastName" />
        </a-table-column-group>
        <a-table-column key="lastName" title="Last Name" data-index="lastName" />
        <a-table-column key="lastName" title="比赛日程" data-index="awayName">
          <template v-slot="{ record:row }">
            <a-button class="tableBtn" size="small" @click="fastWay(row)">{{ $t('default.154') }}</a-button>
          </template>
        </a-table-column>
      </a-table>
    </a-row>
    <entryList :entryPath='entryPath' />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import entryList from '@/components/common/entryList.vue';
import { useRouter } from "vue-router";
import {
  SearchOutlined,
  SettingFilled,
} from "@ant-design/icons-vue";
// eslint-disable-next-line @typescript-eslint/class-name-casing
interface rowType {
  [x: string]: string | number;
}
export default defineComponent({
  name: "matchTeam",
  components: {
    SearchOutlined,
    SettingFilled,
    entryList
  },
  setup() {
    const Router = useRouter();
    const data = reactive({
      entryPath:'/league',
      monthList: [],
      stateList: [],
      currentValue: "",
      matchType: 2020,
      matchTypeList: [{ value: 2020, label: "2020" }],
      columns: [
        { title: "队名", dataIndex: "homaName", key: "homaName" },
        { title: "对战地点", dataIndex: "homaName", key: "homaName" },
        { title: "队长管理", dataIndex: "awayName", key: "homaName" },
        { title: "玩家号码", dataIndex: "homeScore", key: "homaName" },
        {
          title: "标准等级",
          children: [
            { title: "RATING", dataIndex: "state", key: "homaName" },
            { title: "PPD", dataIndex: "homeScore", key: "homaName" },
            { title: "MPR", dataIndex: "key", key: "homaName" },
          ],
        },
        { title: "分配信息", dataIndex: "data", key: "homaName" },
        { title: "比赛日程", dataIndex: "data", key: "homaName" },
      ],
      tableList: [
        {
          state: 1,
          type: 1,
          homaName: "张自然",
          homeScore: 10,
          awayName: "李逍遥",
          key: 1,
          img: require("@/assets/1.jpg"),
        },
        {
          state: 1,
          type: 1,
          homaName: "张自然",
          homeScore: 10,
          awayName: "李逍遥",
          key: 2,
        },
        {
          state: 1,
          type: 1,
          homaName: "张自然",
          homeScore: 10,
          awayName: "李逍遥",
          key: 3,
        },
      ],
      showMatchTable: () => {
        console.log("1111");
      },
      handleMenuClick: () => {
        console.log("1");
      },
      onSearch: () => {
        console.log("1");
      },
      Gohistory: () => {
        Router.push("/result");
      },
      fastWay: (row: rowType) => {
        console.log(row);
      },
      matchTypeChange:(value: number) =>{
        console.log(value)
      }
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped>
.tableBtn {
  border-color: red;
  border-radius: 15px;
}
.tableImg {
  width: 50px;
  margin: 0 10px 0 0;
}
</style>