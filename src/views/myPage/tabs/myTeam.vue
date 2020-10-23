<template>
  <div class="content">
    <a-row>
      <a-col :span='4' class="centerFont">
        <SettingFilled /> {{ `我的队伍 (${teamList.length})` }}
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
            <div>{{ item.place }}</div>/
            <div class="counyStyle">{{ item.couny }}</div><span @click="showDetail">
              <EnvironmentOutlined />
            </span>
          </div>
          <div>{{ item.captain }}</div>
        </a-col>
        <a-col :span='3' class="vipBox">
          <div>{{ vip }}</div>
          <div class="showVipInfo" @click="entryVipPage">
            <UserOutlined />{{ item.vipCount }}
          </div>
        </a-col>
        <a-col :span='8' class="topBox">
          <div>{{ topInfoTitle }}</div>
          <div class="infoStyle">
            <div>{{ `Rating  ${item.ranting}` }}</div>|
            <div>{{ `PPD  ${item.PPD}` }}</div>|
            <div>{{ `MPR  ${item.MPR}` }}</div>
          </div>
        </a-col>
        <a-col :span='3' class="vipBox">
          <div>{{ type }}</div>
          <div>{{ item.count }}</div>
        </a-col>
        <a-col :span='2' class="iconFont">
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
          <div class="matchTitle">{{ joinMatch }}</div>
          <a-row v-for="recordInfo in item.record" :key="recordInfo.index" class="msgBox">
            <a-col :span='3' class="imgColStyle">
              <div>
                <img class="matchImg" :src="recordInfo.img" alt="">
              </div>
            </a-col>
            <a-col :span='10' class="countBox">
              <div class="recordInfoStyle">
                <div class="recordInfoFont">{{ recordInfo.matchName }}</div>
                <div>{{ recordInfo.date }}</div>
                <div>{{ recordInfo.place }}</div>
              </div>
              <div class="btnBox">
                <div v-for="disition in recordInfo.class" :key="disition.index">
                  <a-button type="danger" size='small'>{{ disition.className }}</a-button>
                </div>
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
import { useRouter } from 'vue-router'
import {
  SettingFilled,
  EnvironmentOutlined,
  UserOutlined,
  UpCircleOutlined,
  DownCircleOutlined
} from "@ant-design/icons-vue";
export default defineComponent({
  name: "templete",
  components: {
    SettingFilled,
    EnvironmentOutlined,
    UserOutlined,
    UpCircleOutlined,
    DownCircleOutlined
  },
  setup() {
    const Router = useRouter()
    const data = reactive({
      title: "队伍",
      colSpan: 5,
      topInfoTitle: "Top 4 平均Competition Rating",
      joinMatch: "已参加比赛",
      type: "Entry",
      vip: "会员信息",
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
      changeFlag: (index: number) => {
        data.teamList[index].flag = !data.teamList[index].flag;
      },
      entryVipPage:() => {
        Router.push('/')
      }
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped>
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
.matchImg {
  height: 60px;
}
.infoClass {
  text-align: left;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
}
.teamStyle {
  cursor: pointer;
  font-weight: bold;
}
.teamStyle:hover {
  text-decoration: underline;
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
.countBox {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.recordInfoStyle {
  display: flex;
  justify-content: flex-start;
}
.btnBox {
  display: flex;
}
.btnBox div {
  margin-right: 15px;
}
.msgBox {
  margin: 10px 0;
  height: 80px;
  box-sizing: border-box;
  border-bottom: 1px dashed #666;
}
.matchTitle {
  font-size: 20px;
  border-bottom: 1px dashed #000;
}
.recordBox {
  padding: 10px;
}
.showVipInfo{
  cursor: pointer;
}
</style>
