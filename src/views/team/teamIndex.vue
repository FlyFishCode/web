<template>
  <div>
    <divTitle :msg="title" :lastDate="getDate()" />
    <a-row class="rowStyle">
      <a-col :span='5' class="centerFont">
        <SettingFilled /> {{ msg }}
      </a-col>
    </a-row>
    <a-row class="winnerListStyle">
      <a-col class="fourBox" v-for="item in bestTeam" :key="item.id">
        <div class="centerBox">
          <div class="title infoTitle">{{ item.title }}</div>
          <div class="title teamName">{{ item.teamName }}</div>
          <div>
            <div class="title">{{ item.couny }}</div>
            <div v-if="!item.win" class="dataInfo">
              <div class="infoScore contentLeft">{{ item.itemScore }}</div>
              <div class="infoScore contentRight">
                <div class="matchScore">
                  <div>{{ item.PPD }}</div>
                  <div>{{ item.itemScore }}</div>
                </div>
                <div class="matchScore" style="borderTop:1px solid #fff">
                  <div>{{ item.MPR }}</div>
                  <div>{{ item.itemScore }}</div>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="winBox">
                <div>
                  <div>{{ '胜' }}</div>
                  <div>{{ item.win }}</div>
                </div>
                <div class="winBg">
                  <div>{{ '败' }}</div>
                  <div>{{ item.win }}</div>
                </div>
                <div>
                  <div>{{ '和' }}</div>
                  <div>{{ item.win }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="backBox">
            <u class="backFont" @click="showDetail">{{ item.top }}</u>
          </div>
        </div>
      </a-col>
    </a-row>

    <a-row class="rowStyle rowSearchBox">
      <a-col :span='2' class="titleStyle">
        <BankFilled class="fontIcon" />{{ place }}
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
      <a-col :span='2' class="titleStyle">{{ currentState }}</a-col>
      <a-col :span='3' class="dropdown">
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
      <a-col :span='2' :offset="5" class="titleStyle">
        <SearchOutlined class="fontIcon" />{{ matchName }}
      </a-col>
      <a-col :span='3' class="dropdown">
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
      <a-col :span='4'>
        <a-input-search v-model:value="value" enter-button="Search" size="default" @search="onSearch" />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span='4' class="centerFont">
        <SettingFilled /> {{ `队伍列表 (${teamList.length})` }}
      </a-col>
    </a-row>
    <a-row v-for="item in teamList" :key="item.id" class="eveyTeam">
      <a-col :span='3' class="imgColStyle">
        <div>
          <img class="matchImg" :src="item.img" alt="">
        </div>
      </a-col>
      <a-col :span='4'>
        <div>{{ item.teamName }}</div>
        <div>
          <div>{{ item.place }}</div>
          <div>{{ item.couny }}</div>
        </div>
        <div>{{ item.captain }}</div>
      </a-col>
      <a-col :span='3'>
        <div></div>
        <div></div>
      </a-col>
      <a-col :span='8'>
        <div></div>
        <div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </a-col>
      <a-col :span='3'>
        <div></div>
        <div></div>
      </a-col>
      <a-col :span='2'>
        <div></div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import divTitle from "@/components/DividingLine.vue";
import {
  SettingFilled,
  BankFilled,
  DownOutlined,
  SearchOutlined,
} from "@ant-design/icons-vue";
export default defineComponent({
  name: "teamIndex",
  components: {
    divTitle,
    BankFilled,
    DownOutlined,
    SearchOutlined,
    SettingFilled,
  },
  setup() {
    const data = reactive({
      title: "队伍",
      msg: "最佳队伍 (League)",
      place: "当地",
      currentState: "进行状态",
      matchName: "搜索标准",
      currentValue: 1,
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
          enroll: 10,
          record: [
            {
              matchName: "第三届DARTS WORLD（广州联赛）",
              date: "2020-5-40",
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
      showDetail: () => {
        console.log("2");
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
.line {
  height: 50px;
  border-radius: 20px 20px 0 0;
  border: 1px solid #2b2b2b;
  margin: 10px 0;
}
.fontStyle {
  font-size: 30px;
}
.timeStyle {
  color: red;
  height: 50px;
  line-height: 50px;
}
.winnerListStyle {
  background: #999;
  display: flex;
  justify-content: space-around;
}
.fourBox {
  width: 190px;
  height: 190px;
  padding: 10px;
  opacity: 0.7;
}
.centerBox {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #4b5154;
  overflow: hidden;
}
.dataInfo {
  display: flex;
  justify-content: space-around;
  border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;
}
.contentLeft {
  width: 40%;
  color: red;
  font-size: 25px;
  border-right: 1px solid #fff;
}
.contentRight {
  width: 60%;
  color: #fff;
}
.infoScore {
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.infoScore div {
  height: 100%;
  line-height: 40px;
}
.matchScore {
  display: flex;
  justify-content: space-around;
}
.title {
  padding-left: 15px;
  text-align: left;
}
.infoTitle {
  font-size: 20px;
  color: #999;
  font-weight: bold;
}
.teamName {
  color: #fff;
  font-size: 20px;
  font-weight: bold;
}
.couny {
  font-size: 15px;
  color: #999;
}
.backBox {
  position: absolute;
  height: 100%;
  width: 100%;
  background: #333;
  top: 180px;
}
.centerBox:hover .backBox {
  top: 0px;
}
.backBox {
  transition: all 0.5s ease;
}
.backFont {
  font-size: 30px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
}
.winBox {
  display: flex;
  justify-content: space-around;
  height: 70px;
  border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;
  color: #fff;
}
.winBg {
  border-left: 1px solid #fff;
  border-right: 1px solid #fff;
}
.winBox div {
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
}
.matchImg{
  height: 60px;
}
.eveyTeam{
  height: 80px;
  margin: 15px 0;
  border: 1px solid #eee;
}
.imgColStyle{
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
