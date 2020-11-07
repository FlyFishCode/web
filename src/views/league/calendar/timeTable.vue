<template>
  <div>
    <a-row>
      <a-col :span='2' class="centerFont">
        <SettingFilled /> {{ $t('default.13') }}
      </a-col>
    </a-row>
    <a-row>
      <a-col :span='3' class="dropdown">
        <a-select v-model:value="matchType" @change="matchTypeChange" style="width: 100px">
          <a-select-option v-for="item in matchTypeList" :key="item.value" :value='item.value'>{{ item.label }}</a-select-option>
        </a-select>
      </a-col>
      <a-col :span='3' class="dropdown">
        <a-select v-model:value="matchType" @change="matchTypeChange" style="width: 100px">
          <a-select-option v-for="item in matchTypeList" :key="item.value" :value='item.value'>{{ item.label }}</a-select-option>
        </a-select>
      </a-col>
      <a-col :span='3' :offset="15">
        <a-button type="danger" @click="showMatchTable">{{ $t('default.51') }}</a-button>
      </a-col>
    </a-row>
    <!-- 对战表 排阵-->
    <div v-if="ismatchTablePage">
      <a-row>
        <inMatchTable />
      </a-row>

      <a-row class="rowStyle">
        <!-- <div v-if="state === 1"> -->
        <a-tabs type="card">
          <a-tab-pane key="1" :tab="$t('default.62')">
            <matchResult />
          </a-tab-pane>
          <a-tab-pane key="2" :tab="$t('default.41')">
            <matchTable />
          </a-tab-pane>
        </a-tabs>
        <!-- </div> -->
        <!-- <div v-else>
        <a-tabs type="card">
          <a-tab-pane key="1" tab="比赛结果">
            Content of Tab Pane 1
          </a-tab-pane>
          <a-tab-pane key="2" tab="AWARD">
            Content of Tab Pane 2
          </a-tab-pane>
        </a-tabs>
      </div> -->
      </a-row>
    </div>
    <!-- 对战表列表 -->
    <div v-else>
      <a-row>
        <lunboGundong :topList="gundongInfoList" />
      </a-row>

      <a-row>
        <a-col :span='2' class="titleStyle">
          <PlusOutlined class="fontIcon" />{{ $t('default.140') }}
        </a-col>
        <a-col :span='2'>
          <a-select v-model:value="matchType" @change="matchTypeChange" style="width: 100px">
            <a-select-option v-for="item in matchTypeList" :key="item.value" :value='item.value'>{{ item.label }}</a-select-option>
          </a-select>
        </a-col>
        <a-col :span='2' class="titleStyle">{{ $t('default.141') }}</a-col>
        <a-col :span='3'>
          <a-select v-model:value="matchType" @change="matchTypeChange" style="width: 100px">
            <a-select-option v-for="item in matchTypeList" :key="item.value" :value='item.value'>{{ item.label }}</a-select-option>
          </a-select>
        </a-col>
        <a-col :span='2' class="titleStyle" :offset="5">
          <PlusOutlined class="fontIcon" />{{ $t('default.140') }}
        </a-col>
        <a-col :span='3' class="dropdown">
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
        <a-table :row-selection="rowSelection" :columns="columns" :data-source="tableList" :pagination="false" bordered rowKey='key' :customHeaderRow='customHeaderRow'>
          <template v-slot:date>
            <div>{{ $t('default.52') }}</div>
          </template>
          <template v-slot:time>
            <div>{{ $t('default.152') }}</div>
          </template>
          <template v-slot:type>
            <div>{{ $t('default.119') }}</div>
          </template>
          <template v-slot:homeTeam>
            <div>{{ $t('default.56') }}</div>
          </template>
          <template v-slot:homeTeamName>
            <div>{{ $t('default.55') }}</div>
          </template>
          <template v-slot:homeScore>
            <div>{{ $t('default.58') }}</div>
          </template>
          <template v-slot:awayScore>
            <div>{{ $t('default.58') }}</div>
          </template>
          <template v-slot:awayTeamName>
            <div>{{ $t('default.55') }}</div>
          </template>
          <template v-slot:awayTeam>
            <div>{{ $t('default.57') }}</div>
          </template>
          <template v-slot:inState>
            <div>{{ $t('default.59') }}</div>
          </template>
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
    <a-row class="rowStyle">
      <a-col :span='2' :offset="22">
        <a-button type="danger" size="small" @click="Gohistory">{{ $t('default.139') }}</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
// 排阵页面
import matchTable from "@/views/league/matchTable/matchTable.vue";
import matchResult from "@/views/league/matchResult/matchResult.vue";
// import { DOM } from "@/type/interface.d.ts";
import { SettingFilled, PlusOutlined } from "@ant-design/icons-vue";
import lunboGundong from "@/components/inCalendar.vue";
import inMatchTable from "@/components/inMatchTable.vue";
export default defineComponent({
  name: "timeTable",
  components: {
    SettingFilled,
    lunboGundong,
    PlusOutlined,
    inMatchTable,
    matchTable,
    matchResult,
  },
  setup() {
    const data = reactive({
      monthList: [],
      stateList: [],
      currentValue: "",
      ismatchTablePage: false,
      matchType: 2020,
      matchTypeList: [{ value: 2020, label: "2020" }],
      // customRow: (record: any) => {
      //   return {
      //     click: () => {
      //       debugger;
      //       console.log(record);
      //     },
      //   };
      // },
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
      gundongInfoList: [
        {
          matchId: 1,
          date: "2020-10-14",
          match: [
            {
              img: require("@/assets/1.jpg"),
              homeTeamName: "上海队",
              awayTeamName: "武汉队",
              homeMatch: 3,
              awayMatch: "4",
            },
            {
              img: require("@/assets/1.jpg"),
              homeTeamName: "广州队",
              awayTeamName: "香港队",
              homeMatch: 3,
              awayMatch: "4",
            },
            {
              img: require("@/assets/1.jpg"),
              homeTeamName: "青岛队",
              awayTeamName: "周口队",
              homeMatch: 3,
              awayMatch: "4",
            },
            {
              img: require("@/assets/1.jpg"),
              homeTeamName: "重庆队",
              awayTeamName: "天津队",
              homeMatch: 3,
              awayMatch: "4",
            },
          ],
        },
        {
          matchId: 2,
          date: "2020-10-14",
          match: [
            {
              img: require("@/assets/1.jpg"),
              homeTeamName: "上海队",
              awayTeamName: "武汉队",
              homeMatch: 3,
              awayMatch: "4",
            },
            {
              img: require("@/assets/1.jpg"),
              homeTeamName: "青岛队",
              awayTeamName: "周口队",
              homeMatch: 3,
              awayMatch: "4",
            },
          ],
        },
        {
          matchId: 3,
          img: require("@/assets/1.jpg"),
          homeTeamName: "上海队",
          homeMatch: 3,
          date: "2020-10-14",
          match: [],
        },
        {
          matchId: 4,
          date: "2020-10-14",
          match: [
            {
              img: require("@/assets/1.jpg"),
              homeTeamName: "上海队",
              awayTeamName: "武汉队",
              homeMatch: 3,
              awayMatch: "4",
            },
            {
              img: require("@/assets/1.jpg"),
              homeTeamName: "广州队",
              awayTeamName: "香港队",
              homeMatch: 3,
              awayMatch: "4",
            },
            {
              img: require("@/assets/1.jpg"),
              homeTeamName: "青岛队",
              awayTeamName: "周口队",
              homeMatch: 3,
              awayMatch: "4",
            },
            {
              img: require("@/assets/1.jpg"),
              homeTeamName: "重庆队",
              awayTeamName: "天津队",
              homeMatch: 3,
              awayMatch: "4",
            },
            {
              img: require("@/assets/1.jpg"),
              homeTeamName: "1",
              awayTeamName: "4",
              homeMatch: 3,
              awayMatch: "4",
              match: [],
            },
            {
              img: require("@/assets/1.jpg"),
              homeTeamName: "2",
              awayTeamName: "5",
              homeMatch: 3,
              awayMatch: "4",
              match: [],
            },
            {
              img: require("@/assets/1.jpg"),
              homeTeamName: "3",
              awayTeamName: "6",
              homeMatch: 3,
              awayMatch: "4",
              match: [],
            },
          ],
        },
        {
          matchId: 5,
          img: require("@/assets/1.jpg"),
          homeTeamName: "上海队",
          homeMatch: 3,
          date: "2020-10-14",
          match: [],
        },
        {
          matchId: 6,
          date: "2020-10-14",
          match: [
            {
              img: require("@/assets/1.jpg"),
              homeTeamName: "上海队",
              awayTeamName: "武汉队",
              homeMatch: 3,
              awayMatch: "4",
            },
            {
              img: require("@/assets/1.jpg"),
              homeTeamName: "广州队",
              awayTeamName: "香港队",
              homeMatch: 3,
              awayMatch: "4",
            },
            {
              img: require("@/assets/1.jpg"),
              homeTeamName: "青岛队",
              awayTeamName: "周口队",
              homeMatch: 3,
              awayMatch: "4",
            },
            {
              img: require("@/assets/1.jpg"),
              homeTeamName: "重庆队",
              awayTeamName: "天津队",
              homeMatch: 3,
              awayMatch: "4",
            },
          ],
        },
      ],
      columns: [
        {
          dataIndex: "data",
          key: "name",
          slots: { title: "date" },
        },
        { dataIndex: "data", key: "time", slots: { title: "time" } },
        { dataIndex: "data", key: "type", slots: { title: "type" } },
        {
          children: [
            {
              dataIndex: "homaName",
              key: "homaName",
              slots: { title: "homeTeamName" },
            },
            {
              dataIndex: "homeScore",
              key: "homeScore",
              slots: { title: "homeScore" },
            },
          ],
          slots: { title: "homeTeam" },
        },
        {
          children: [
            {
              dataIndex: "awayScore",
              key: "awayScore",
              slots: { title: "awayScore" },
            },
            {
              dataIndex: "awayName",
              key: "awayName",
              slots: { title: "awayTeamName" },
            },
          ],
          slots: { title: "awayTeam" },
        },
        {
          dataIndex: "state",
          key: "state",
          slots: { title: 'inState', customRender: "state" },
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
      showMatchTable: () => {
        console.log("1111");
      },
      handleMenuClick: () => {
        console.log("1");
      },
      onSearch: () => {
        console.log("1");
      },
      // changeDisabled:() =>{
      //   return {
      //     disabled
      //   }
      // },
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
      showPlan: () => {
        data.ismatchTablePage = true;
      },
      Gohistory: () => {
        console.log("111");
      },
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