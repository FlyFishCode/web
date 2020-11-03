<template>
  <div class="content">
    <a-row>
      <a-col :span='4' class="centerFont">
        <SettingFilled /> {{ $t('default.106') }}
      </a-col>
    </a-row>
    <a-row class="rowSearchBox">
      <a-col :span='3'>
        <a-select v-model:value="year" @change="yearChange" style="width: 100px">
          <a-select-option v-for="item in yearList" :key="item.value" :value='item.value'>{{ item.label }}</a-select-option>
        </a-select>
      </a-col>
      <a-col :span='3'>
        <a-select v-model:value="matchType" @change="matchTypeChange" style="width: 100px">
          <a-select-option v-for="item in matchTypeList" :key="item.value" :value='item.value'>{{ item.label }}</a-select-option>
        </a-select>
      </a-col>
    </a-row>

    <a-row v-for="(item,index) in teamList" :key="item.id">
      <a-row class="eveyTeam">
        <a-col :span='3' class="imgColStyle">
          <div>
            <img class="matchImg" :src="item.img" alt="">
          </div>
        </a-col>
        <a-col :span='4' class="infoClass">
          <div class="teamStyle">{{ item.teamName }}</div>
          <div class="placeStyle">
            <div>{{ item.place }}</div>
            <div v-for="div in item.division" :key="div.id" class="divisiBox">{{ div.divisiName }}</div>
          </div>
        </a-col>
        <a-col :span='4' :offset='4' class="vipBox">
          <div class="disableFont">{{ $t('default.27') }}</div>
          <div>-{{ item.vipCount }}</div>
        </a-col>
        <a-col :span='5' :offset='1' class="topBox">
          <div class="stateClass">
            <div class="disableFont">{{ $t('default.17') }}</div>
            <div v-if="item.state === 1" class="stateBox I">{{ $t('default.104') }}</div>
            <div v-if="item.state === 2" class="stateBox F">{{ $t('default.105') }}</div>
            <div v-if="item.state === 3" class="stateBox">{{ '准备中' }}</div>
          </div>
          <div class="infoStyle">{{ item.time }}</div>
        </a-col>
        <a-col :span='2' :offset='1' class="iconFont">
          <div v-if="item.record.length">
            <div v-if="item.flag" @click="changeFlag(index)">
              <DownCircleOutlined />
            </div>
            <div v-else @click="changeFlag(index)">
              <UpCircleOutlined />
            </div>
          </div>
        </a-col>
      </a-row>
      <transition enter-active-class="animate__animated animate__bounceInUp">
        <a-row v-show="item.flag" class="recordBox">
          <a-row class="title">
            <a-col :span=12>{{ $t('default.156') }}</a-col>
            <a-col :span=12>{{ $t('default.157') }}</a-col>
          </a-row>
          <a-row v-for="recordInfo in item.record" :key="recordInfo.index" class="msgBox">
            <a-col :span='12' class="teamBox">
              <div class="teamName">{{ recordInfo.matchName }}</div>
            </a-col>
            <a-col :span='12' class="countBox">
              <div class="tableBox Header">
                <div>{{ $t('default.70') }}</div>
                <div>{{ 'Rating' }}</div>
                <div>{{ 'PPD' }}</div>
                <div>{{ 'MPR' }}</div>
                <div>{{ 'Set 胜' }}</div>
                <div>{{ 'Set 和' }}</div>
                <div>{{ 'Set 败' }}</div>
              </div>
              <div class="tableBox Content">
                <div>{{ recordInfo.ranking }}</div>
                <div>{{ recordInfo.Rating }}</div>
                <div>{{ recordInfo.PPD }}</div>
                <div>{{ recordInfo.MPR }}</div>
                <div>{{ recordInfo.SetWin }}</div>
                <div>{{ recordInfo.SetRraw }}</div>
                <div>{{ recordInfo.SetLose }}</div>
              </div>
            </a-col>
          </a-row>
        </a-row>
      </transition>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import {
  SettingFilled,
  DownCircleOutlined,
  UpCircleOutlined,
} from "@ant-design/icons-vue";
export default defineComponent({
  name: "templete",
  components: {
    SettingFilled,
    DownCircleOutlined,
    UpCircleOutlined,
  },
  setup() {
    const data = reactive({
      title: "队伍",
      colSpan: 5,
      year: 2020,
      matchType: 2020,
      yearList: [{ value: 2020, label: "2020" }],
      matchTypeList: [{ value: 2020, label: "2020" }],
      teamList: [
        {
          id: 1,
          img: require("@/assets/1.jpg"),
          teamName: "上海队",
          couny: "北京",
          vipCount: 8,
          flag: false,
          state: 1,
          time: "2020-9-52",
          division: [
            { id: 1, divisiName: "xxxx" },
            { id: 2, divisiName: "xxxx" },
          ],
          record: [
            {
              matchName: "Demo_A_Team",
              img: require("@/assets/1.jpg"),
              date: "2020-5-40 ~ 2020-6-10",
              place: "广州",
              ranking: 1,
              Rating: 2,
              PPD: 3,
              MPR: 4,
              SetWin: 5,
              SetRraw: 6,
              SetLose: 7,
            },
            {
              matchName: "Demo_A_Team",
              img: require("@/assets/1.jpg"),
              date: "2020-5-40 ~ 2020-6-10",
              place: "广州",
              ranking: 1,
              Rating: 2,
              PPD: 3,
              MPR: 4,
              SetWin: 5,
              SetRraw: 6,
              SetLose: 7,
            },
          ],
        },
        {
          id: 1,
          img: require("@/assets/1.jpg"),
          teamName: "上海队",
          couny: "北京",
          vipCount: 8,
          flag: false,
          state: 2,
          time: "2020-9-52",
          division: [],
          record: [],
        },
      ],
      changeFlag: (index: number) => {
        data.teamList[index].flag = !data.teamList[index].flag;
      },
      yearChange: (value: number) => {
        console.log(value);
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
.centerFont {
  font-size: 20px;
  font-weight: bold;
  color: red;
  margin: 5px 0;
}
.imgColStyle {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.matchImg {
  height: 60px;
}
.infoClass {
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}
.teamStyle {
  cursor: pointer;
  font-weight: bold;
}
.placeStyle {
  display: flex;
  justify-content: flex-start;
}
.placeStyle span {
  cursor: pointer;
}
.counyStyle {
  color: #999;
  margin: 0 5px;
}
.vipBox {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.eveyTeam {
  height: 80px;
  margin: 15px 0;
  border: 1px solid #eee;
}
.topBox {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.infoStyle {
  text-align: left;
}
.iconFont {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 25px;
  cursor: pointer;
}
.iconFont:hover {
  color: #1890ff;
}
.msgBox {
  margin: 10px 0;
  height: 80px;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
  display: flex;
}
.recordBox {
  padding: 10px;
}
.matchTitle {
  font-size: 20px;
  border-bottom: 1px dashed #000;
}
.title {
  text-align: left;
  color: #999;
}
.teamName {
  text-align: left;
  font-size: 20px;
  font-weight: bold;
}
.countBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.tableBox {
  display: flex;
  justify-content: space-between;
  text-align: center;
}
.tableBox div {
  width: 75px;
  border: 1px solid #000;
}
.teamBox {
  display: flex;
  align-items: center;
}
.Header {
  background: #f1f0ed;
  color: #5a5a5a;
}
.stateClass {
  display: flex;
  justify-content: space-between;
}
.disableFont {
  color: #999;
}
.stateBox {
  border-radius: 10px;
  width: 70px;
}
.I {
  background: red;
  color: #fff;
}
.F {
  background: #d9d9d9;
  color: #797878;
}
.divisiBox{
  border: 1px solid #000;
  padding: 5px;
  margin: 4px 5px;
}
</style>
