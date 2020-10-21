<template>
  <div>
    <a-row>
      <a-col :span='4' class="centerFont">
        <SettingFilled /> {{ msg }}
      </a-col>
    </a-row>
    <a-row>
      <a-col :span='3' class="dropdown">
        <a-dropdown>
          <template v-slot:overlay>
            <a-menu @click="handleMenuClick">
              <a-menu-item key="1">1st menu item</a-menu-item>
              <a-menu-item key="2">2nd menu item</a-menu-item>
              <a-menu-item key="3">3rd item</a-menu-item>
            </a-menu>
          </template>
          <a-button style="margin-left: 8px"> Button
            <DownOutlined />
          </a-button>
        </a-dropdown>
      </a-col>
      <a-col :span='3' class="dropdown">
        <a-dropdown>
          <template v-slot:overlay>
            <a-menu @click="handleMenuClick">
              <a-menu-item key="1">1st menu item</a-menu-item>
              <a-menu-item key="2">2nd menu item</a-menu-item>
              <a-menu-item key="3">3rd item</a-menu-item>
            </a-menu>
          </template>
          <a-button style="margin-left: 8px"> Button
            <DownOutlined />
          </a-button>
        </a-dropdown>
      </a-col>
      <a-col :span='3' :offset="15">
        <a-button type="danger" @click="showMatchTable">{{ '查看对阵表' }}</a-button>
      </a-col>
    </a-row>

    <a-row>
      <lunboGundong :topList="gundongInfoList" />
    </a-row>

    <a-row>
      <a-col :span='2' class="titleStyle">
        <PlusOutlined class="fontIcon" />{{ '选择队伍' }}
      </a-col>
      <a-col :span='2'>
        <a-dropdown>
          <template v-slot:overlay>
            <a-menu>
              <a-menu-item v-for="item in monthList" :key="item.id" @click="handleMenuClick(item.value)">
                {{ item.value }}
              </a-menu-item>
            </a-menu>
          </template>
          <a-button class="btnStyle" style="margin-left: 8px">{{ currentValue }}
            <DownOutlined />
          </a-button>
        </a-dropdown>
      </a-col>
      <a-col :span='3' class="titleStyle">{{ '对战状态' }}</a-col>
      <a-col :span='2'>
        <a-dropdown>
          <template v-slot:overlay>
            <a-menu>
              <a-menu-item v-for="item in stateList" :key="item.id" @click="handleMenuClick(item.value)">
                {{ item.value }}
              </a-menu-item>
            </a-menu>
          </template>
          <a-button class="btnStyle" style="margin-left: 8px">{{ currentValue }}
            <DownOutlined />
          </a-button>
        </a-dropdown>
      </a-col>
      <a-col :span='2' class="titleStyle" :offset="5">
        <PlusOutlined class="fontIcon" />{{ '选择队伍' }}
      </a-col>
      <a-col :span='3' class="dropdown">
        <a-dropdown>
          <template v-slot:overlay>
            <a-menu>
              <a-menu-item v-for="item in monthList" :key="item.id" @click="handleMenuClick(item.value)">
                {{ item.value }}
              </a-menu-item>
            </a-menu>
          </template>
          <a-button class="btnStyle" style="margin-left: 8px">{{ currentValue }}
            <DownOutlined />
          </a-button>
        </a-dropdown>
      </a-col>
      <a-col :span='5'>
        <a-input-search v-model:value="currentValue" enter-button="Search" size="default" @search="onSearch" />
      </a-col>
    </a-row>
    <!-- 表格 -->
    <a-row>
      <a-table :row-selection="rowSelection" :columns="columns" :pagination="false" :data-source="tableList" bordered>
        <template v-slot:name>
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
import { DOM } from "@/type/interface.d.ts";
import {
  SettingFilled,
  DownOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";
import lunboGundong from "@/components/inCalendar.vue";
export default defineComponent({
  name: "calendar",
  components: {
    SettingFilled,
    DownOutlined,
    lunboGundong,
    PlusOutlined,
  },
  setup() {
    const data = reactive({
      msg: "日程表/结果",
      monthList: [],
      stateList: [],
      currentValue: "所有玩家",
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
        { title: "日期", dataIndex: "data", key: "name" },
        { title: "比赛时间", dataIndex: "data", key: "time" },
        { title: "比赛类型", dataIndex: "data", key: "type" },
        {
          title: "主队",
          children: [
            { title: "队名", dataIndex: "homaName", key: "homaName" },
            { title: "得分", dataIndex: "homeScore", key: "homeScore" },
          ],
        },
        {
          title: "客队",
          children: [
            { title: "得分", dataIndex: "awayScore", key: "awayScore" },
            { title: "队名", dataIndex: "awayName", key: "awayName" },
          ],
        },
        { title: "进行状态", dataIndex: "data", key: "state" },
        { title: "Name", dataIndex: "data", key: "name" },
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
        },
        {
          data: "2020-10-2",
          time: "19:25",
          state: 1,
          type: 1,
          homaName: "张自然",
          homeScore: 10,
          awayName: "李逍遥",
          awayScore: 5,
          key: 2,
        },
        {
          data: "2020-10-3",
          time: "17:25",
          state: 1,
          type: 1,
          homaName: "张自然",
          homeScore: 10,
          awayName: "李逍遥",
          awayScore: 5,
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
      rowSelection: {
        onChange: (selectedRowKeys: DOM, selectedRows: DOM) => {
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
          );
        },
        // onSelect: (record, selected, selectedRows) => {
        //   console.log(record, selected, selectedRows);
        // },
        // onSelectAll: (selected, selectedRows, changeRows) => {
        //   console.log(selected, selectedRows, changeRows);
        // },
      },
      Gohistory:() => {
        console.log('111')
      }
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped>
</style>