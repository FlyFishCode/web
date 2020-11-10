<template>
  <div class="content">
    <a-row>
      <a-col :span='3' class="centerFont">
        <SettingFilled /> {{ $t('default.231') }}
      </a-col>
    </a-row>
    <a-row class="rowStyle">
      <a-col :span='2' class="dropdown">
        <a-select v-model:value="matchType" @change="matchTypeChange" style="width: 100px">
          <a-select-option v-for="item in matchTypeList" :key="item.value" :value='item.value'>{{ item.label }}</a-select-option>
        </a-select>
      </a-col>
      <a-col :span='3' class="dropdown">
        <a-select v-model:value="matchType" @change="matchTypeChange" style="width: 100px">
          <a-select-option v-for="item in matchTypeList" :key="item.value" :value='item.value'>{{ item.label }}</a-select-option>
        </a-select>
      </a-col>
    </a-row>

    <a-row>
      <a-table :columns="columns" :data-source="tableList" :pagination='false' bordered >
        <template #action="{ text,record }">
          <u class="tableMatch" @click="showMatchInfo(record.age)">{{ text }}</u>
        </template>
      </a-table>
    </a-row>
    <entryList :entryPath='entryPath' />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import entryList from '@/components/common/entryList.vue';
import { SettingFilled } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "beforeResult",
  components: {
    SettingFilled,
    entryList
  },
  setup() {
    const Router = useRouter();
    const data = reactive({
      entryPath:'/team',
      matchType: 2020,
      matchTypeList: [{ value: 2020, label: "2020" }],
      columns: [
        {
          title: "年",
          width: 50,
          dataIndex: "name",
          key: 1,
          // fixed: "left",
        },
        {
          title: "比赛",
          dataIndex: "address",
          width: 100,
          key: 2,
          slots: { customRender: "action" },
          // fixed: "left",
        },
        {
          title: "排行",
          dataIndex: "address",
          key: 3,
          // fixed: "left",
          width: 60,
        },
        {
          title: "队伍",
          dataIndex: "address",
          key: 4,
          // fixed: "left",
          children: [
            { title: "Rating", dataIndex: "address", key: 9, width: 70 },
            { title: "PPD", dataIndex: "address", key: 10, width: 60 },
            { title: "MPR", dataIndex: "address", key: 11, width: 60 },
          ],
        },
        {
          title: "总积分",
          dataIndex: "address",
          key: 5,
          // fixed: "left",
          width: 80,
        },
        {
          title: "Match",
          dataIndex: "address",
          key: 6,
          children: [
            { title: "胜", dataIndex: "address", key: 12, width: 60 },
            { title: "败", dataIndex: "address", key: 13, width: 60 },
            { title: "和", dataIndex: "address", key: 14, width: 60 },
            { title: "胜率", dataIndex: "address", key: 15, width: 60 },
          ],
        },
        {
          title: "Set",
          dataIndex: "address",
          key: 7,
          children: [
            { title: "胜", dataIndex: "address", key: "2", width: 60 },
            { title: "败", dataIndex: "address", key: "2", width: 60 },
            { title: "和", dataIndex: "address", key: "2", width: 60 },
            { title: "胜率", dataIndex: "address", key: "2", width: 60 },
          ],
        },
        {
          title: "罚分",
          dataIndex: "address",
          key: 8,
          width: 60,
        },
      ],
      tableList: [
        {
          key: "1",
          name: "John Brown",
          age: 32,
          address: "New York Park",
        },
        {
          key: "2",
          name: "Jim Green",
          age: 40,
          address: "London Park",
        },
      ],
      handleMenuClick: () => {
        console.log(1);
      },
      Gohistory: () => {
        Router.push("/teamIndex");
      },
      showMatchInfo: (id: number) => {
        Router.push({
          path: "/calendar",
          params: { id },
        });
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
.tableMatch {
  cursor: pointer;
  color: #1890ff;
}
</style>
