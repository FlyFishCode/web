<template>
  <div class="content">
    <a-row>
      <a-col :span='2' class="centerFont">
        <SettingFilled /> {{ $t('default.227') }}
      </a-col>
    </a-row>
    <a-row>
      <a-table :columns="columns" :data-source="tableList" :pagination='false' bordered>
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
  name: "vip",
  components: {
    SettingFilled,
    entryList,
  },
  setup() {
    const Router = useRouter();
    const data = reactive({
      entryPath:'/team',
      columns: [
        {
          title: "玩家",
          width: 100,
          dataIndex: "name",
          key: "name",
          slots: { customRender: "action" },
        },
        {
          title: "性别",
          dataIndex: "address",
          width: 10,
          key: "1",
        },
        {
          title: "主店",
          dataIndex: "address",
          key: "2",
          width: 10,
        },
        {
          title: "一般等级",
          dataIndex: "address",
          key: "3",
          children: [
            { title: "Rating", dataIndex: "address", key: "2", width: 60 },
            { title: "PPD", dataIndex: "address", key: "2", width: 50 },
            { title: "MPR", dataIndex: "address", key: "2", width: 50 },
          ],
        },
        {
          title: "比赛等级",
          dataIndex: "address",
          key: "3",
          children: [
            { title: "Rating", dataIndex: "address", key: "2", width: 60 },
            { title: "PPD", dataIndex: "address", key: "2", width: 50 },
            { title: "MPR", dataIndex: "address", key: "2", width: 50 },
          ],
        },
        {
          title: "比赛等级 ( 4Q )",
          dataIndex: "address",
          key: "5",
          children: [
            { title: "Rating", dataIndex: "address", key: "2", width: 30 },
            { title: "PPD", dataIndex: "address", key: "2", width: 30 },
            { title: "MPR", dataIndex: "address", key: "2", width: 30 },
          ],
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
