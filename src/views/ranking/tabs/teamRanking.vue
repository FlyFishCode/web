<template>
  <div class="content">
    <a-row>
      <a-col :span='5' class="smallTitle">
        <SettingFilled /> {{ $t('default.67') }}
      </a-col>
    </a-row>
    <a-row class="rowStyle rowSearchBox">
      <a-col :span='3'>
        <a-select v-model:value="matchType" @change="matchTypeChange" class="selectBox">
          <a-select-option v-for="item in list" :key="item.value" :value='item.value'>{{ item.label }}</a-select-option>
        </a-select>
      </a-col>
      <a-col :span='3'>
        <a-select v-model:value="matchType" @change="matchTypeChange" class="selectBox">
          <a-select-option v-for="item in list" :key="item.value" :value='item.value'>{{ item.label }}</a-select-option>
        </a-select>
      </a-col>
      <a-col :span='2' :offset="2" class="titleStyle">
        <AimOutlined class="fontIcon" />{{ $t('default.27') }}
      </a-col>
      <a-col :span='3'>
        <a-select v-model:value="matchType" @change="matchTypeChange" class="selectBox">
          <a-select-option v-for="item in list" :key="item.value" :value='item.value'>{{ item.label }}</a-select-option>
        </a-select>
      </a-col>
      <a-col :span='3'>
        <a-select v-model:value="matchType" @change="matchTypeChange" class="selectBox">
          <a-select-option v-for="item in list" :key="item.value" :value='item.value'>{{ item.label }}</a-select-option>
        </a-select>
      </a-col>
      <a-col :span='3'>
        <a-select v-model:value="matchType" @change="matchTypeChange" class="selectBox">
          <a-select-option v-for="item in list" :key="item.value" :value='item.value'>{{ item.label }}</a-select-option>
        </a-select>
      </a-col>
    </a-row>

    <a-row>
      <tramRanking />
    </a-row>

    <!-- 表格 -->
    <a-row>
      <a-table :row-selection="rowSelection" :columns="columns" :data-source="tableList" :pagination="false" bordered rowKey='key' :customHeaderRow='customHeaderRow'>
        <template v-slot:index>{{ $t('default.70') }}</template>
        <template v-slot:date>{{ $t('default.55') }}</template>
        <template v-slot:Rating>{{ $t('default.168') }}</template>
        <template v-slot:PPD>{{ $t('default.169') }}</template>
        <template v-slot:MPR>{{ $t('default.170') }}</template>
        <template v-slot:homeTeam>{{ $t('default.134') }}</template>
        <template v-slot:homeWin>{{ $t('default.46') }}</template>
        <template v-slot:homeLose>{{ $t('default.47') }}</template>
        <template v-slot:homeDraw>{{ $t('default.48') }}</template>
        <template v-slot:homeChange>{{ $t('default.185') }}</template>
        <template v-slot:awayTeam>{{ $t('default.137') }}</template>
        <template v-slot:awayWin>{{ $t('default.46') }}</template>
        <template v-slot:awayLose>{{ $t('default.47') }}</template>
        <template v-slot:awayDraw>{{ $t('default.48') }}</template>
        <template v-slot:awayChange>{{ $t('default.185') }}</template>
        <template v-slot:state="{ text }">
          <div class="tableState">
            <div v-if="text === 1" class="plan" @click="showPlan">{{ $t('default.41') }}</div>
            <div v-if="text === 2">{{ 'Ready' }}</div>
            <div v-if="text === 3">{{ 'Finished' }}</div>
          </div>
        </template>
      </a-table>
    </a-row>

  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { SettingFilled, AimOutlined } from "@ant-design/icons-vue";
import tramRanking from "@/components/rankingTeam.vue";
export default defineComponent({
  name: "teamRanking",
  components: {
    SettingFilled,
    AimOutlined,
    tramRanking,
  },
  setup() {
    const data = reactive({
      colSpan: 5,
      getDate: () => {
        return "2020-10-17";
      },
      matchType: 1,
      list: [
        { value: 1, label: "sssssss" },
        { value: 2, label: "aaaaaaa" },
      ],
      customHeaderRow: (column: any) => {
        return {
          // on: {
          click: (event: any) => {
            debugger;
            console.log(event, column);
          },
          // },
        };
      },
      rowSelection: {
        columnWidth: 100,
        columnTitle: "对比",
        onChange: (selectedRowKeys: number[]) => {
          if (selectedRowKeys.length == 2) {
            selectedRowKeys.forEach((i) => {
              const index = data.tableList.findIndex((j) => j.key === i);
              data.tableList.forEach((k, kndex) => {
                if (index !== kndex) {
                  k.disabled = true;
                } else {
                  k.disabled = false;
                }
              });
              const list = data.tableList;
              data.tableList = [...list];
            });
          } else {
            data.tableList.forEach((i) => {
              i.disabled = false;
            });
            const list = data.tableList;
            data.tableList = [...list];
          }
        },
        getCheckboxProps: (record: { disabled: boolean }) => ({
          disabled: record.disabled, // Column configuration not to be checked
        }),
      },
      columns: [
        { dataIndex: "key", key: "time", slots: { title: "index" } },
        {
          dataIndex: "data",
          key: "name",
          slots: { title: "date" },
        },
        { dataIndex: "data", key: "time", slots: { title: "Rating" } },
        { dataIndex: "data", key: "type", slots: { title: "PPD" } },
        { dataIndex: "data", key: "type", slots: { title: "MPR" } },
        {
          children: [
            {
              dataIndex: "homaName",
              key: "homaName",
              slots: { title: "homeWin" },
            },
            {
              dataIndex: "homeScore",
              key: "homeScore",
              slots: { title: "homeLose" },
            },
            {
              dataIndex: "homeScore",
              key: "homeScore",
              slots: { title: "homeDraw" },
            },
            {
              dataIndex: "homeScore",
              key: "homeScore",
              slots: { title: "homeChange" },
            },
          ],
          slots: { title: "homeTeam" },
        },
        {
          children: [
            {
              dataIndex: "awayScore",
              key: "awayScore",
              slots: { title: "awayWin" },
            },
            {
              dataIndex: "homeScore",
              key: "awayName",
              slots: { title: "awayLose" },
            },
            {
              dataIndex: "homeScore",
              key: "homeScore",
              slots: { title: "awayDraw" },
            },
            {
              dataIndex: "homeScore",
              key: "homeScore",
              slots: { title: "awayChange" },
            },
          ],
          slots: { title: "awayTeam" },
        },
      ],
      tableList: [
        {
          data: "2020-10-1",
          time: "18:25",
          state: 1,
          type: 1,
          homaName: "张自然",
          homeScore: 10,
          awayName: "李逍遥",
          awayScore: 5,
          key: 1,
          disabled: false,
        },
        {
          data: "2020-10-2",
          time: "19:25",
          state: 2,
          type: 1,
          homaName: "张自然",
          homeScore: 10,
          awayName: "李逍遥",
          awayScore: 5,
          key: 2,
          disabled: false,
        },
        {
          data: "2020-10-3",
          time: "17:25",
          state: 3,
          type: 1,
          homaName: "张自然",
          homeScore: 10,
          awayName: "李逍遥",
          awayScore: 5,
          key: 3,
          disabled: false,
        },
        {
          data: "2020-10-3",
          time: "17:25",
          state: 3,
          type: 1,
          homaName: "张自然",
          homeScore: 10,
          awayName: "李逍遥",
          awayScore: 5,
          key: 4,
          disabled: false,
        },
        {
          data: "2020-10-3",
          time: "17:25",
          state: 3,
          type: 1,
          homaName: "张自然",
          homeScore: 10,
          awayName: "李逍遥",
          awayScore: 5,
          key: 5,
          disabled: false,
        },
      ],
      matchTypeChange: (value: number) => {
        console.log(value);
      },
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped>
.tableState {
  text-align: center;
}
.plan {
  background: red;
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
}
</style>
