<template>
  <div class="content">
    <a-row>
      <a-col :span='3' class="centerFont">
        <SettingFilled /> {{ title }}
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
      <a-table :columns="columns" :data-source="tableList" :pagination='false' bordered :scroll="{ x: 1300 }">
        <template #action="{ text,record }">
          <u class="tableMatch" @click="showMatchInfo(record.age)">{{ text }}</u>
        </template>
      </a-table>
    </a-row>
    <a-row class="rowStyle">
      <a-col :span='2' :offset="22">
        <a-button type="danger" size="small" @click="Gohistory">{{ '列表' }}</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { SettingFilled } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "templete",
  components: {
    SettingFilled,
  },
  setup() {
    const Router = useRouter();
    const data = reactive({
      title: "以前结果",
      matchType: 2020,
      matchTypeList: [{ value: 2020, label: "2020" }],
      columns: [
        {
          title: "年",
          width: 10,
          dataIndex: "name",
          key: "name",
          fixed: "left",
        },
        {
          title: "比赛",
          dataIndex: "address",
          width: 90,
          key: "1",
          slots: { customRender: "action" },
          fixed: "left",
        },
        {
          title: "排行",
          dataIndex: "address",
          key: "2",
          fixed: "left",
          width: 10,
        },
        {
          title: "队伍",
          dataIndex: "address",
          key: "3",
          fixed: "left",
          children: [
            { title: "Rating", dataIndex: "address", key: "2", width: 60 },
            { title: "PPD", dataIndex: "address", key: "2", width: 50 },
            { title: "MPR", dataIndex: "address", key: "2", width: 50 },
          ],
        },
        {
          title: "总积分",
          dataIndex: "address",
          key: "4",
          fixed: "left",
          width: 20,
        },
        {
          title: "Match",
          dataIndex: "address",
          key: "5",
          children: [
            { title: "胜", dataIndex: "address", key: "2", width: 30 },
            { title: "败", dataIndex: "address", key: "2", width: 30 },
            { title: "和", dataIndex: "address", key: "2", width: 30 },
            { title: "胜率", dataIndex: "address", key: "2", width: 40 },
          ],
        },
        {
          title: "Set",
          dataIndex: "address",
          key: "6",
          children: [
            { title: "胜", dataIndex: "address", key: "2", width: 40 },
            { title: "败", dataIndex: "address", key: "2", width: 40 },
            { title: "和", dataIndex: "address", key: "2", width: 40 },
            { title: "胜率", dataIndex: "address", key: "2", width: 40 },
          ],
        },
        {
          title: "罚分",
          dataIndex: "address",
          key: "7",
          width: 40,
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
