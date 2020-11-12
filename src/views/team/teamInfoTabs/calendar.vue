<template>
  <div class="content">
    <a-row>
      <a-col :span='4' class="centerFont">
        <SettingFilled /> {{ $t('default.229') }}
      </a-col>
    </a-row>
    <a-row class="rowStyle">
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
      <a-col :span='3'>
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
          </template>{{ $t('default.87') }}
        </a-button>
      </a-col>
      <a-col :span='3'>
        <a-button @click="showCalendar">
          <template v-slot:icon>
            <CalendarOutlined />
          </template>{{ $t('default.228') }}
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
          </template>{{ $t('default.111') }}
        </a-button>
      </a-col>
      <a-col :span='2'>
        <a-button>
          <template v-slot:icon>
            <PrinterOutlined />
          </template>{{ $t('default.69') }}
        </a-button>
      </a-col>
    </a-row>

    <a-row v-show="isList">
      <a-table :columns="columns" :data-source="dataList" :pagination='false' bordered>
        <template v-slot:homeTeam="{ record }">
          <div class="btnClass">
            <a-button type="link" size="small">{{ record.homeTeam }}</a-button>
            <a-button type="link" size="small">{{ record.place }}</a-button>
          </div>
        </template>
        <template v-slot:awayTeam="{ record }">
          <div class="btnClass">
            <a-button type="link" size="small">{{ record.awayTeam }}</a-button>
            <a-button type="link" size="small">{{ record.place }}</a-button>
          </div>
        </template>
        <template v-slot:type="{ text }">
          <a-button v-if="text === 1" type="link" size="small">{{ '准备' }}</a-button>
          <a-button v-if="text === 2" type="link" size="small">{{ '进行' }}</a-button>
          <a-button v-if="text === 3" type="link" size="small">{{ '结束' }}</a-button>
        </template>
      </a-table>
    </a-row>

    <a-row v-show="isCalendar">
      <a-calendar v-model:value="calendarValue" @panelChange="calendarlChange" @select="onSelect" />
    </a-row>
    <entryList :entryPath='entryPath' />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import entryList from '@/components/common/entryList.vue';
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
  name: "calendar",
  components: {
    UnorderedListOutlined,
    CalendarOutlined,
    CloudDownloadOutlined,
    PrinterOutlined,
    SettingFilled,
    entryList
  },
  setup() {
    const Router = useRouter();
    const data = reactive({
      entryPath:'/team',
      colSpan: 5,
      isList: true,
      isCalendar: false,
      calendarValue: "",
      matchType: 2020,
      matchTypeList: [{ value: 2020, label: "2020" }],
      columns: [
        {
          title: "日期",
          width: 100,
          dataIndex: "key",
        },
        {
          title: "比赛时间",
          width: 100,
          dataIndex: "age",
        },
        {
          title: "比赛类型",
          width: 100,
          dataIndex: "age",
        },
        {
          title: "比赛队伍",
          colSpan: 4,
          dataIndex: "tel",
          slots: { customRender: "homeTeam" },
        },
        {
          colSpan: 0,
          width: 50,
          dataIndex: "age",
        },
        {
          colSpan: 0,
          width: 50,
          dataIndex: "age",
        },
        {
          colSpan: 0,
          dataIndex: "tel",
          slots: { customRender: "awayTeam" },
        },
        {
          title: "进行状态",
          width: 100,
          dataIndex: "age",
          slots: { customRender: "type" },
        },
      ],
      dataList: [
        {
          key: "1",
          homeTeam: "武汉上将怼",
          awayTeam: "撒打算呢队伍",
          place: "(Hea Darts（广州）)",
          age: 1,
          tel: "0571-22098909",
          phone: 18889898989,
        },
        {
          key: "2",
          homeTeam: "偶就嗯我队伍",
          awayTeam: "去年名称队伍",
          place: "(Hea Darts（广州）)",
          tel: "0571-22098333",
          phone: 18889898888,
          age: 2,
        },
        {
          key: "3",
          homeTeam: "阿松大色斑队伍",
          awayTeam: "哦抗衡队伍",
          place: "(Hea Darts（广州）)",
          age: 3,
          tel: "0575-22098909",
          phone: 18900010002,
        },
        {
          key: "4",
          homeTeam: "自行车队伍",
          awayTeam: "请问队伍",
          place: "(Hea Darts（广州）)",
          age: 3,
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
</style>
