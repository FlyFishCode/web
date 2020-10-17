<template>
  <div class="content">
    <a-row>
      <divTitle :msg="title" :span="colSpan" :lastDate="getDate()" />
    </a-row>
    <a-row class="rowStyle">
      <a-col :span='2' class="dropdown">
        <a-dropdown>
          <template v-slot:overlay>
            <a-menu @click="handleMenuClick">
              <a-menu-item key="1">
                1st menu item
              </a-menu-item>
              <a-menu-item key="2">
                2nd menu item
              </a-menu-item>
              <a-menu-item key="3">
                3rd item
              </a-menu-item>
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
              <a-menu-item key="1">
                1st menu item
              </a-menu-item>
              <a-menu-item key="2">
                2nd menu item
              </a-menu-item>
              <a-menu-item key="3">
                3rd item
              </a-menu-item>
            </a-menu>
          </template>
          <a-button style="margin-left: 8px"> Button
            <DownOutlined />
          </a-button>
        </a-dropdown>
      </a-col>
      <a-col :span='4' class="dropdown">
        <a-dropdown>
          <template v-slot:overlay>
            <a-menu @click="handleMenuClick">
              <a-menu-item key="1">
                1st menu item
              </a-menu-item>
              <a-menu-item key="2">
                2nd menu item
              </a-menu-item>
              <a-menu-item key="3">
                3rd item
              </a-menu-item>
            </a-menu>
          </template>
          <a-button style="margin-left: 8px"> Button
            <DownOutlined />
          </a-button>
        </a-dropdown>
      </a-col>
    </a-row>

    <a-row class="rowSearchBox">
      <a-col :span='3'>
        <a-button>
          <template v-slot:icon>
            <UnorderedListOutlined />
          </template>{{ '查看列表' }}
        </a-button>
      </a-col>
      <a-col :span='3'>
        <a-button>
          <template v-slot:icon>
            <CalendarOutlined />
          </template>{{ '查看日历' }}
        </a-button>
      </a-col>
      <a-col :span='3' :offset='10'>
        <a-dropdown>
          <template v-slot:overlay>
            <a-menu @click="handleMenuClick">
              <a-menu-item key="1">
                1st menu item
              </a-menu-item>
              <a-menu-item key="2">
                2nd menu item
              </a-menu-item>
              <a-menu-item key="3">
                3rd item
              </a-menu-item>
            </a-menu>
          </template>
          <a-button style="margin-left: 8px">{{ '所有' }}
            <DownOutlined />
          </a-button>
        </a-dropdown>
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

    <a-row>
      <a-table :columns="columns" :data-source="data" :pagination='false' bordered>
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
    <a-row class="rowStyle">
      <a-col :span='2' :offset="22">
        <a-button type="danger" size="small" @click="Gohistory">{{ '列表' }}</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { useRouter } from 'vue-router'
import {
  DownOutlined,
  UnorderedListOutlined,
  CalendarOutlined,
  CloudDownloadOutlined,
  PrinterOutlined,
} from "@ant-design/icons-vue";
import divTitle from "@/components/DividingLine.vue";
// interface TableRenderProps {
//   text: string;
//   index: number;
// }
export default defineComponent({
  name: "templete",
  components: {
    divTitle,
    DownOutlined,
    UnorderedListOutlined,
    CalendarOutlined,
    CloudDownloadOutlined,
    PrinterOutlined,
  },
  setup () {
    const Router = useRouter()
    const data = reactive({
      title: "比赛日程表/结果",
      colSpan: 5,
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
          slots: { customRender: 'homeTeam' },
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
          slots: { customRender: 'awayTeam' },
        },
        {
          title: "进行状态",
          width: 100,
          dataIndex: "age",
          slots: { customRender: 'type' },
        },
      ],
      data: [
        {
          key: "1",
          homeTeam: "武汉上将怼",
          awayTeam: "撒打算呢队伍",
          place: '(Hea Darts（广州）)',
          age: 1,
          tel: "0571-22098909",
          phone: 18889898989,
        },
        {
          key: "2",
          homeTeam: "偶就嗯我队伍",
          awayTeam: "去年名称队伍",
          place: '(Hea Darts（广州）)',
          tel: "0571-22098333",
          phone: 18889898888,
          age: 2,
        },
        {
          key: "3",
          homeTeam: "阿松大色斑队伍",
          awayTeam: "哦抗衡队伍",
          place: '(Hea Darts（广州）)',
          age: 3,
          tel: "0575-22098909",
          phone: 18900010002,
        },
        {
          key: "4",
          homeTeam: "自行车队伍",
          awayTeam: "请问队伍",
          place: '(Hea Darts（广州）)',
          age: 3,
          tel: "0575-22098909",
          phone: 18900010002,
        },
      ],
      getDate: () => {
        return "2020-10-17";
      },
      handleMenuClick: () => {
        console.log(11)
      },
      Gohistory: () => {
        Router.push('/teamIndex')
      }
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped>
.btnClass{
  display: flex;
  justify-content: space-around;
  flex-direction: column;
}
</style>
