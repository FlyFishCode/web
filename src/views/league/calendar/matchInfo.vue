<template>
  <div>
    <a-row>
      <a-col :span='3' class="centerFont">
        <SettingFilled /> {{ $t('default.24') }}
      </a-col>
    </a-row>
    <a-row>
      <a-col :span='3' class="smallTitle">
        <SettingFilled /> {{ $t('default.135') }}
      </a-col>
    </a-row>
    <a-row class="tableStyle">
      <a-row>
        <a-col :span='4' class="tableContent">
          <div>{{ $t('default.15') }}</div>
        </a-col>
        <a-col :span='8' class="tableContentValue">
          <div>{{ matchName }}</div>
        </a-col>
        <a-col :span='4' class="tableContent">
          <div>{{ $t('default.39') }}</div>
        </a-col>
        <a-col :span='8' class="tableContentValue">
          <div>{{ matchName }}</div>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span='4' class="tableContent">
          <div>{{ $t('default.17') }}</div>
        </a-col>
        <a-col :span='8' class="tableContentValue">
          <div>{{ matchName }}</div>
        </a-col>
        <a-col :span='4' class="tableContent">
          <div>{{ $t('default.30') }}</div>
        </a-col>
        <a-col :span='8' class="tableContentValue">
          <div>{{ matchName }}</div>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span='4' class="tableContent">
          <div>{{ $t('default.29') }}</div>
        </a-col>
        <a-col :span='8' class="tableContentValue">
          <div>{{ matchName }}</div>
        </a-col>
        <a-col :span='4' class="tableContent">
          <div>{{ $t('default.31') }}</div>
        </a-col>
        <a-col :span='8' class="tableContentValue">
          <div>{{ matchName }}</div>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span='4' class="tableContent">
          <div>{{ $t('default.38') }}</div>
        </a-col>
        <a-col :span='8' class="tableContentValue">
          <div>{{ matchName }}</div>
        </a-col>
        <a-col :span='4' class="tableContent">
          <div>{{ $t('default.32') }}</div>
        </a-col>
        <a-col :span='8' class="tableContentValue">
          <div>{{ matchName }}</div>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span='4' class="tableContent">
          <div>{{ $t('default.33') }}</div>
        </a-col>
        <a-col :span='8' class="tableContentValue">
          <div>{{ matchName }}</div>
        </a-col>
        <a-col :span='4' class="tableContent">
          <div>{{ $t('default.34') }}</div>
        </a-col>
        <a-col :span='8' class="tableContentValue">
          <div>{{ matchName }}</div>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span='4' class="tableContent">
          <div>{{ $t('default.35') }}</div>
        </a-col>
        <a-col :span='20' class="tableContentValue">
          <div>{{ matchName }}</div>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span='4' class="tableContent">
          <div>{{ $t('default.36') }}</div>
        </a-col>
        <a-col :span='20' class="tableContentValue">
          <div>{{ matchName }}</div>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span='4' class="tableContent">
          <div>{{ $t('default.37') }}</div>
        </a-col>
        <a-col :span='20' class="tableContentValue">
          <div>{{ matchName }}</div>
        </a-col>
      </a-row>
    </a-row>
    <a-row class="rowStyle" type="flex" justify="space-around">
      <a-col :span='7' class="sencend">
        <div>
          <SettingFilled /> {{ $t('default.40') }}
        </div>
        <div class="decision">
          <div class="decisionBox">
            <div>{{ $t('default.43') }}</div>
            <div>{{ $t('default.46') }}</div>
            <div>{{ $t('default.47') }}</div>
            <div>{{ $t('default.48') }}</div>
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
          <SettingFilled /> {{ $t('default.41') }}
        </div>
        <div class="decision">
          <div class="decisionBox">
            <div>{{ $t('default.136') }}</div>
            <div>{{ $t('default.45') }}</div>
          </div>
          <div class="decisionBox">
            <div>{{ matchName }}</div>
            <div>{{ matchName }}</div>
          </div>
        </div>
      </a-col>
      <a-col :span='7' class="sencend">
        <div>
          <SettingFilled /> {{ $t('default.42') }}
        </div>
        <div class="decision">
          <div class="decisionBox">
            <div>{{ $t('default.137') }}</div>
            <div>{{ $t('default.138') }}</div>
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
        <a-button type="danger" size="small" @click="Gohistory">{{ $t('default.139') }}</a-button>
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
  name: "matchInfo",
  components: { SettingFilled },
  setup() {
    const router = useRouter()
    const data = reactive({
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