<template>
  <div>
    <a-row>
      <a-col :span='2' class="centerFont">
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
        <a-button type="danger" @click="showMatchTable">{{ '查看对战表' }}</a-button>
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
          <a-tab-pane key="1" tab="比赛结果">
            Content of Tab Pane 1
          </a-tab-pane>
          <a-tab-pane key="2" tab="排阵">
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
        <a-table :row-selection="rowSelection" :columns="columns" :data-source="tableList" :pagination="false" bordered>
          <template v-slot:state="{ text }">
            <div class="tableState">
              <div v-if="text === 1" class="plan" @click="showPlan">{{ '排阵' }}</div>
              <div v-if="text === 2">{{ 'Ready' }}</div>
              <div v-if="text === 3">{{ 'Finished' }}</div>
            </div>
          </template>
        </a-table>
      </a-row>
    </div>
    <a-row class="rowStyle">
      <a-col :span='2' :offset="22">
        <a-button type="danger" size="small" @click="Gohistory">{{ '列表' }}</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
// 排阵页面
import matchTable from '@/views/league/matchTable/matchTable.vue'
// import { DOM } from "@/type/interface.d.ts";
import {
  SettingFilled,
  DownOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";
import lunboGundong from "@/components/inCalendar.vue";
import inMatchTable from "@/components/inMatchTable.vue";
export default defineComponent({
  name: "calendar",
  components: {
    SettingFilled,
    DownOutlined,
    lunboGundong,
    PlusOutlined,
    inMatchTable,
    matchTable
  },
  setup() {
    const data = reactive({
      msg: "时间表",
      monthList: [],
      stateList: [],
      currentValue: "所有玩家",
      ismatchTablePage: false,
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
        {
          title: "进行状态",
          dataIndex: "state",
          key: "state",
          slots: { customRender: "state" },
        },
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
          disabled: true,
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
        columnWidth: 100,
        columnTitle: "对比",
        onChange: (selectedRowKeys: number[]) => {
          data.tableList[1].disabled = true;
          // if (selectedRowKeys.length === 2) {
          //   data.tableList.forEach((i, index) => {
          //     selectedRowKeys.forEach(j => {
          //       if(index !== j-1){
          //         i.disabled = true
          //       }else{
          //         return
          //       }
          //     })
          //   });
          // }
          console.log(selectedRowKeys);
          console.log(data.tableList);
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getCheckboxProps: (record: { disabled: any }) => ({
          disabled: record.disabled, // Column configuration not to be checked
        }),
      },
      showPlan: () => {
        data.ismatchTablePage = true;
      },
      Gohistory: () => {
        console.log("111");
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