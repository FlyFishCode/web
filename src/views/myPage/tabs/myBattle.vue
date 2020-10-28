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
      <a-col :span='2' class="dropdown">
        <a-select v-model:value="matchType" @change="matchTypeChange" style="width: 100px">
          <a-select-option v-for="item in matchTypeList" :key="item.value" :value='item.value'>{{ item.label }}</a-select-option>
        </a-select>
      </a-col>
    </a-row>

    <a-row class="rowSearchBox">
      <a-col :span='3'>
        <a-button @click="showList">
          <template v-slot:icon>
            <UnorderedListOutlined />
          </template>{{ '查看列表' }}
        </a-button>
      </a-col>
      <a-col :span='3'>
        <a-button @click="showCalendar">
          <template v-slot:icon>
            <CalendarOutlined />
          </template>{{ '查看日历' }}
        </a-button>
      </a-col>
      <a-col :span='3' :offset='10'>
        <a-select v-model:value="matchType" @change="matchTypeChange" style="width: 100px">
          <a-select-option v-for="item in matchTypeList" :key="item.value" :value='item.value'>{{ item.label }}</a-select-option>
        </a-select>
      </a-col>
      <a-col :span='3'>
        <a-button>
          <template v-slot:icon>
            <CloudDownloadOutlined />
          </template>{{ 'CSV下载' }}
        </a-button>
      </a-col>
      <a-col :span='2'>
        <a-button>
          <template v-slot:icon>
            <PrinterOutlined />
          </template>{{ '打印' }}
        </a-button>
      </a-col>
    </a-row>

    <a-row v-show="isList">
      <a-table :columns="columns" :data-source="dataList" :pagination='false' bordered>
        <template v-slot:home="{ text }">
          <a-button type="link" size="small">{{ text }}</a-button>
        </template>
        <template v-slot:away="{ text }">
          <a-button type="link" size="small">{{ text }}</a-button>
        </template>
        <template v-slot:state="{ text }">
          <div class="stateBox">
            <div v-if="text === 1" class="inPlay" @click="goPlay">{{ '排阵' }}</div>
            <div v-if="text === 2">{{ '准备' }}</div>
          </div>
        </template>
      </a-table>
    </a-row>

    <a-row v-show="isCalendar">
      <a-calendar v-model:value="calendarValue" @panelChange="calendarlChange" @select="onSelect" />
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
import { useRouter } from "vue-router";
import {
  UnorderedListOutlined,
  CalendarOutlined,
  CloudDownloadOutlined,
  PrinterOutlined,
  SettingFilled,
} from "@ant-design/icons-vue";
// interface TableRenderProps {
//   text: string;
//   index: number;
// }
export default defineComponent({
  name: "templete",
  components: {
    UnorderedListOutlined,
    CalendarOutlined,
    CloudDownloadOutlined,
    PrinterOutlined,
    SettingFilled,
  },
  setup() {
    const Router = useRouter();
    const data = reactive({
      title: "我的对战",
      colSpan: 5,
      isList: true,
      isCalendar: false,
      calendarValue: "",
      matchType:2020,
      matchTypeList:[
        { value:2020,label:'2020' }
      ],
      columns: [
        {
          title: "日期",
          width: 100,
          dataIndex: "key",
        },
        {
          title: "对战类型",
          width: 100,
          dataIndex: "age",
        },
        {
          title: "HOME TEAM",
          children: [
            {
              title: "队名",
              width: 100,
              dataIndex: "awayTeam",
              slots: { customRender: "home" },
            },
            { title: "Score", width: 10, dataIndex: "homeScore" },
          ],
        },
        {
          title: "AWAY TEAM",
          children: [
            { title: "Score", width: 10, dataIndex: "awayScore" },
            {
              title: "队名",
              width: 100,
              dataIndex: "awayTeam",
              slots: { customRender: "away" },
            },
          ],
        },
        {
          title: "状态",
          width: 100,
          dataIndex: "state",
          slots: { customRender: "state" },
        },
        {
          title: "移动",
          width: 100,
          dataIndex: "age",
        },
      ],
      dataList: [
        {
          key: "1",
          homeTeam: "武汉上将怼",
          awayTeam: "撒打算呢队伍",
          place: "(Hea Darts（广州）)",
          age: 1,
          state: 1,
          tel: "0571-22098909",
          phone: 18889898989,
          homeScore: 10,
          awayScore: 51,
        },
        {
          key: "2",
          homeTeam: "偶就嗯我队伍",
          awayTeam: "去年名称队伍",
          place: "(Hea Darts（广州）)",
          tel: "0571-22098333",
          phone: 18889898888,
          age: 2,
          state: 2,
          homeScore: 10,
          awayScore: 51,
        },
        {
          key: "3",
          homeTeam: "阿松大色斑队伍",
          awayTeam: "哦抗衡队伍",
          place: "(Hea Darts（广州）)",
          age: 3,
          state: 2,
          tel: "0575-22098909",
          phone: 18900010002,
          homeScore: 10,
          awayScore: 51,
        },
        {
          key: "4",
          homeTeam: "自行车队伍",
          awayTeam: "请问队伍",
          place: "(Hea Darts（广州）)",
          age: 3,
          state: 1,
          tel: "0575-22098909",
          phone: 18900010002,
        },
      ],
      getDate: () => {
        return "2020-10-17";
      },
      handleMenuClick: () => {
        console.log(11);
      },
      showList: () => {
        data.isCalendar = false;
        data.isList = true;
      },
      showCalendar: () => {
        data.isList = false;
        data.isCalendar = true;
      },
      calendarlChange: (value: string) => {
        console.log(value);
      },
      onSelect: (value: string) => {
        console.log(value);
      },
      Gohistory: () => {
        Router.push("/teamIndex");
      },
      goPlay:() => {
        Router.push("/teamIndex");
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
.btnClass {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
}
.stateBox{
  text-align: center;
}
.inPlay{
  background: red;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
}
</style>
