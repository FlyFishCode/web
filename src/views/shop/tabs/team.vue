<template>
  <div class="content">
    <a-row>
      <a-col :span='4' class="smallTitle">
        <SettingFilled /> {{ `${$t('default.9')} (${teamList.length})` }}
      </a-col>
    </a-row>

    <a-row v-for="item in teamList" :key="item.id">
      <a-row class="eveyTeam">
        <a-col :span='3' class="imgColStyle">
          <div>
            <img class="matchImg" :src="item.img" alt="">
          </div>
        </a-col>
        <a-col :span='4' class="infoClass">
          <div class="teamStyle">{{ item.teamName }}</div>
          <div class="placeStyle">
            <div>{{ item.place }}</div>/
            <div class="counyStyle">{{ item.couny }}</div><span @click="showDetail">
              <InfoCircleFilled />
            </span>
          </div>
          <div>{{ item.captain }}</div>
        </a-col>
        <a-col :span='3' :offset='5' class="vipBox">
          <div>{{ $t('default.77') }}</div>
          <div>
            <UserOutlined />{{ item.vipCount }}
          </div>
        </a-col>
        <a-col :span='8' class="topBox">
          <div>{{ $t('default.178') }}</div>
          <div class="infoStyle">
            <div>{{ `Rating  ${item.ranting}` }}</div>|
            <div>{{ `PPD  ${item.PPD}` }}</div>|
            <div>{{ `MPR  ${item.MPR}` }}</div>
          </div>
        </a-col>
      </a-row>
    </a-row>
    <a-row type="flex" justify="end">
      <a-pagination show-size-changer v-model:current="currentPage" :pageSize="10" :total="500" @showSizeChange="onShowSizeChange" />
    </a-row>
    <a-row class="rowStyle">
      <a-col :span='2' :offset="22">
        <a-button type="danger" size="small" @click="goHistory">{{ $t('default.139') }}</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import {
  SettingFilled,
  InfoCircleFilled,
  UserOutlined,
} from "@ant-design/icons-vue";
export default defineComponent({
  name: "team",
  components: {
    SettingFilled,
    InfoCircleFilled,
    UserOutlined,
  },
  setup() {
    const Router = useRouter();
    const data = reactive({
      currentPage: 1,
      value: 201,
      current: 1,
      pageSize: 1,
      colSpan: 4,
      matchType: 2020,
      matchTypeList: [{ value: 2020, label: "2020" }],
      monthList: [],
      stateList: [],
      teamList: [
        {
          id: 1,
          img: require("@/assets/1.jpg"),
          teamName: "上海队",
          couny: "北京",
          place: "汉庭会所",
          captain: "刘半仙",
          vipCount: 8,
          ranting: 2.15,
          PPD: 25.0,
          MPR: 19.5,
          count: 0,
          enroll: 10,
          flag: false,
          record: [
            {
              matchName: "第三届DARTS WORLD（广州联赛）",
              img: require("@/assets/1.jpg"),
              date: "2020-5-40 ~ 2020-6-10",
              place: "广州",
              class: [
                { className: "class1" },
                { className: "class2" },
                { className: "class3" },
              ],
            },
            {
              matchName: "第三届DARTS WORLD（广州联赛）",
              img: require("@/assets/1.jpg"),
              date: "2020-5-40 ~ 2020-6-10",
              place: "广州",
              class: [
                { className: "class1" },
                { className: "class2" },
                { className: "class3" },
              ],
            },
          ],
        },
        {
          id: 1,
          img: require("@/assets/1.jpg"),
          teamName: "上海队",
          couny: "北京",
          place: "汉庭会所",
          captain: "刘半仙",
          vipCount: 8,
          ranting: 2.15,
          PPD: 25.0,
          MPR: 19.5,
          count: 0,
          enroll: 10,
          flag: false,
          record: [],
        },
        {
          id: 1,
          img: require("@/assets/1.jpg"),
          teamName: "上海队",
          couny: "北京",
          place: "汉庭会所",
          captain: "刘半仙",
          vipCount: 8,
          ranting: 2.15,
          PPD: 25.0,
          MPR: 19.5,
          count: 0,
          enroll: 10,
          flag: false,
          record: [
            {
              matchName: "第三届DARTS WORLD（广州联赛）",
              img: require("@/assets/1.jpg"),
              date: "2020-5-40 ~ 2020-6-10",
              place: "广州",
              class: [
                { className: "class1" },
                { className: "class2" },
                { className: "class3" },
              ],
            },
            {
              matchName: "第三届DARTS WORLD（广州联赛）",
              img: require("@/assets/1.jpg"),
              date: "2020-5-40 ~ 2020-6-10",
              place: "广州",
              class: [
                { className: "class1" },
                { className: "class2" },
                { className: "class3" },
              ],
            },
          ],
        },
      ],
      bestTeam: [
        {
          id: 1,
          title: "鲨鱼辣椒",
          teamName: "鲨鱼辣椒队",
          couny: "ABSP(广州)",
          itemScore: "71",
          PPD: "PPD",
          MPR: "MPR",
          score: "15",
          top: "BEST HELLO WORLD",
        },
        {
          id: 2,
          title: "蜘蛛侦探",
          teamName: "蜘蛛侦探队",
          couny: "ABSP(广州)",
          itemScore: "71",
          PPD: "PPD",
          MPR: "MPR",
          score: "15",
          top: "HELLO WORLD",
        },
        {
          id: 3,
          title: "奥特曼",
          teamName: "奥特曼队",
          couny: "ABSP(广州)",
          itemScore: "71",
          PPD: "PPD",
          MPR: "MPR",
          score: "15",
          top: "BEST WORLD",
        },
        {
          id: 4,
          title: "奥特曼",
          teamName: "奥特曼队",
          couny: "ABSP(广州)",
          itemScore: "71",
          win: "PPD",
          MPR: "MPR",
          score: "15",
          top: "BEST WORLD",
        },
        {
          id: 5,
          title: "奥特曼",
          teamName: "奥特曼队",
          couny: "ABSP(广州)",
          itemScore: "71",
          win: "PPD",
          MPR: "MPR",
          score: "15",
          top: "BEST WORLD",
        },
      ],
      getDate: () => "220-10-16",
      showDetail: (value: number) => {
        Router.push({
          path: "/teamInfo",
          query: { value },
        });
      },
      onSearch: () => {
        console.log("11");
      },
      changeFlag: (index: number) => {
        data.teamList[index].flag = !data.teamList[index].flag;
      },
      onShowSizeChange: () => {
        console.log(1);
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.teamName {
  color: #fff;
  font-size: 20px;
  font-weight: bold;
}
.couny {
  font-size: 15px;
  color: #999;
}
.matchImg {
  height: 60px;
}
.eveyTeam {
  height: 80px;
  margin: 15px 0;
  border: 1px solid #eee;
}
.imgColStyle {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.placeStyle {
  display: flex;
  justify-content: flex-start;
}
.placeStyle span {
  cursor: pointer;
}
.infoClass {
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.counyStyle {
  color: #999;
  margin: 0 5px;
}
.teamStyle {
  cursor: pointer;
  font-weight: bold;
}
.teamStyle:hover {
  text-decoration: underline;
}
.vipBox {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.topBox {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.infoStyle {
  display: flex;
  justify-content: space-around;
}
</style>
