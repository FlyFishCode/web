<template>
  <div>
    <a-row>
      <a-col :span='3' class="centerFont">
        <SettingFilled /> {{ msg}}
      </a-col>
    </a-row>
    <a-row>
      <a-col :span='3' class="sencend">
        <SettingFilled /> {{ sencend }}
      </a-col>
    </a-row>
    <a-row class="tableStyle">
      <a-row>
        <a-col :span='4' class="tableContent">
          <div>{{ '比赛名称' }}</div>
        </a-col>
        <a-col :span='8' class="tableContentValue">
          <div>{{ matchName }}</div>
        </a-col>
        <a-col :span='4' class="tableContent">
          <div>{{ '负责人' }}</div>
        </a-col>
        <a-col :span='8' class="tableContentValue">
          <div>{{ matchName }}</div>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span='4' class="tableContent">
          <div>{{ '比赛期间' }}</div>
        </a-col>
        <a-col :span='8' class="tableContentValue">
          <div>{{ matchName }}</div>
        </a-col>
        <a-col :span='4' class="tableContent">
          <div>{{ '举办区域' }}</div>
        </a-col>
        <a-col :span='8' class="tableContentValue">
          <div>{{ matchName }}</div>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span='4' class="tableContent">
          <div>{{ '申请期间' }}</div>
        </a-col>
        <a-col :span='8' class="tableContentValue">
          <div>{{ matchName }}</div>
        </a-col>
        <a-col :span='4' class="tableContent">
          <div>{{ '举办店铺' }}</div>
        </a-col>
        <a-col :span='8' class="tableContentValue">
          <div>{{ matchName }}</div>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span='4' class="tableContent">
          <div>{{ '标准评级' }}</div>
        </a-col>
        <a-col :span='8' class="tableContentValue">
          <div>{{ matchName }}</div>
        </a-col>
        <a-col :span='4' class="tableContent">
          <div>{{ '报名费' }}</div>
        </a-col>
        <a-col :span='8' class="tableContentValue">
          <div>{{ matchName }}</div>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span='4' class="tableContent">
          <div>{{ '玩家更换' }}</div>
        </a-col>
        <a-col :span='8' class="tableContentValue">
          <div>{{ matchName }}</div>
        </a-col>
        <a-col :span='4' class="tableContent">
          <div>{{ '队伍玩家人数限制' }}</div>
        </a-col>
        <a-col :span='8' class="tableContentValue">
          <div>{{ matchName }}</div>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span='4' class="tableContent">
          <div>{{ '参赛资格' }}</div>
        </a-col>
        <a-col :span='20' class="tableContentValue">
          <div>{{ matchName }}</div>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span='4' class="tableContent">
          <div>{{ '奖励条件' }}</div>
        </a-col>
        <a-col :span='20' class="tableContentValue">
          <div>{{ matchName }}</div>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span='4' class="tableContent">
          <div>{{ '游戏类型描述' }}</div>
        </a-col>
        <a-col :span='20' class="tableContentValue">
          <div>{{ matchName }}</div>
        </a-col>
      </a-row>
    </a-row>
    <a-row class="rowStyle" type="flex" justify="space-around">
      <a-col :span='7' class="sencend">
        <div>
          <SettingFilled /> {{ '排名决定' }}
        </div>
        <div class="decision">
          <div class="decisionBox">
            <div>{{ '方法' }}</div>
            <div>{{ '胜' }}</div>
            <div>{{ '和' }}</div>
            <div>{{ '败' }}</div>
          </div>
          <div class="decisionBox">
            <div>{{ matchName }}</div>
            <div>{{ matchName }}</div>
            <div>{{ matchName }}</div>
            <div>{{ matchName }}</div>
          </div>
        </div>
      </a-col>
      <a-col :span='7' class="sencend">
        <div>
          <SettingFilled /> {{ '排阵' }}
        </div>
        <div class="decision">
          <div class="decisionBox">
            <div>{{ '排队方法' }}</div>
            <div>{{ '截止日期' }}</div>
          </div>
          <div class="decisionBox">
            <div>{{ matchName }}</div>
            <div>{{ matchName }}</div>
          </div>
        </div>
      </a-col>
      <a-col :span='7' class="sencend">
        <div>
          <SettingFilled /> {{ '先攻' }}
        </div>
        <div class="decision">
          <div class="decisionBox">
            <div>{{ 'SET' }}</div>
            <div>{{ 'LEG' }}</div>
          </div>
          <div class="decisionBox">
            <div>{{ matchName }}</div>
            <div>{{ matchName }}</div>
          </div>
        </div>
      </a-col>
    </a-row>
    <a-row class="rowStyle" id="dataListBox">
      <a-table :data-source="tableList" class="components-table-demo-nested" :pagination="false">
        <a-table-column key="name" title=" " data-index="name" />
        <a-table-column key="other" class="dataTimeStyle">
          <template v-slot="{ text: data }">
            <a-button type="primary" shape="round" size="small" @click="showDetail(data)">{{ data.other }}</a-button>
          </template>
        </a-table-column>
        <template #expandedRowRender="{}">
          <a-table :columns="innerColumns" :data-source="innerData" :pagination="false" bordered></a-table>
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
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import {useRouter} from 'vue-router'
import { SettingFilled } from "@ant-design/icons-vue";
interface HTMLInputEvent {
  e: HTMLInputElement & EventTarget;
}
export default defineComponent({
  name: "hearder",
  components: { SettingFilled },
  setup() {
    const router = useRouter()
    const data = reactive({
      msg: "比赛信息",
      sencend: "概述",
      matchName: "1",
      matchTime: "2",
      applyTime: "3",
      matchQualifications: "4",
      matchReward: "5",
      columns: [
        { title: " ", dataIndex: "name", key: "name",width: 150 },
        { title: " ", dataIndex: "age", key: "age",width: 150 },
        { title: " ", dataIndex: "other", key: "other",width: 150 },
      ],
      innerColumns: [
        { title: "Set", dataIndex: "name", key: "name",width: 150 },
        { title: "Set Point", dataIndex: "name", key: "name",width: 150 },
        { title: "局", dataIndex: "name", key: "name",width: 150 },
        { title: "游戏", dataIndex: "name", key: "name",width: 150 },
        {
          title: "游戏模式",
          dataIndex: "name",
          key: "name",
          width: 150
        },
        { title: "Round", dataIndex: "name", key: "name",width: 150 },
        { title: "IN", dataIndex: "name", key: "IN",width: 150 },
        { title: "OUT", dataIndex: "name", key: "OUT",width: 150 },
        { title: "牛眼", dataIndex: "name", key: "牛眼",width: 150 },
        { title: "Team Freeze", dataIndex: "name", key: "Team Freeze",width: 150 },
        {
          title: "Freeze Option",
          dataIndex: "name",
          key: "Freeze Option",
          width: 150
        },
        { title: "Overkill", dataIndex: "name", key: "Overkill",width: 150 },
        {
          title: "Team Cricket",
          dataIndex: "name",
          key: "Team Cricket",
          width: 150
        },
      ],
      innerData: [
        {
          key: 1,
          date: "2014-12-24 23:12:00",
          name: "production",
          upgradeNum: "Upgraded",
        },
        {
          key: 2,
          date: "2014-12-24 23:12:00",
          name: "production",
          upgradeNum: "Upgraded",
        },
        {
          key: 3,
          date: "2014-12-24 23:12:00",
          name: "production",
          upgradeNum: "Upgraded",
        },
      ],
      tableList: [
        {
          key: 1,
          name: "CLASS",
          other: "日程表视图",
        },
        {
          key: 2,
          name: "CLASS",
          other: "日程表视图",
        },
        {
          key: 3,
          name: "CLASS",
          other: "日程表视图",
        },
      ],
      showDetail:(e: HTMLInputEvent) => {
        console.log(e)
      },
      Gohistory:()=>{
        router.push('/')
      }
    });
    onMounted(() => {
      console.log(1);
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>
<style scoped>
.sencend {
  font-weight: bold;
  color: red;
  margin: 5px 0;
}
.tableStyle {
  border: 1px solid #333;
}
.tableContent div {
  height: 40px;
  line-height: 40px;
  border: 1px solid #d5d5d5;
  background: #eee;
  color: #000;
}
.tableContentValue div {
  height: 40px;
  line-height: 40px;
  border: 0.5px solid #d5d5d5;
}
.decision {
  display: flex;
  flex-direction: column;
  border-top: 1px solid #000;
}
.decisionBox {
  display: flex;
  justify-content: space-between;
}
.decisionBox div {
  border: 1px solid #eee;
  width: 100%;
}
#dataListBox>>>.dataTimeStyle{
  text-align: right;
}
</style>