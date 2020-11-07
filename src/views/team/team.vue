<template>
  <div class="content">
    <divTitle :msg="title" :span="colSpan" :lastDate="getDate()" />
    <a-row class="rowStyle">
      <a-col :span='5' class="centerFont">
        <SettingFilled /> {{ `${$t('default.80')}(${$t('default.8')})` }}
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
                  <div>{{ $t('default.46') }}</div>
                  <div>{{ item.win }}</div>
                </div>
                <div class="winBg">
                  <div>{{ $t('default.48') }}</div>
                  <div>{{ item.win }}</div>
                </div>
                <div>
                  <div>{{ $t('default.47') }}</div>
                  <div>{{ item.win }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="backBox">
            <u class="backFont" @click="showDetail(item.id)">{{ item.top }}</u>
          </div>
        </div>
      </a-col>
    </a-row>

    <a-row class="rowStyle rowSearchBox">
      <a-col :span='2' class="titleStyle">
        <BankFilled class="fontIcon" />{{ $t('default.27') }}
      </a-col>
      <a-col :span='2' class="dropdown">
        <a-select v-model:value="matchType" @change="matchTypeChange" style="width: 100px">
          <a-select-option v-for="item in matchTypeList" :key="item.value" :value='item.value'>{{ item.label }}</a-select-option>
        </a-select>
      </a-col>
      <a-col :span='2' class="titleStyle">{{ $t('default.164') }}</a-col>
      <a-col :span='2' class="dropdown">
        <a-select v-model:value="matchType" @change="matchTypeChange" style="width: 100px">
          <a-select-option v-for="item in matchTypeList" :key="item.value" :value='item.value'>{{ item.label }}</a-select-option>
        </a-select>
      </a-col>
      <a-col :span='2' :offset="7" class="titleStyle">
        <SearchOutlined class="fontIcon" />{{ $t('default.165') }}
      </a-col>
      <a-col :span='3' class="dropdown">
        <a-select v-model:value="matchType" @change="matchTypeChange" style="width: 100px">
          <a-select-option v-for="item in matchTypeList" :key="item.value" :value='item.value'>{{ item.label }}</a-select-option>
        </a-select>
      </a-col>
      <a-col :span='4'>
        <a-input-search v-model:value="value" enter-button="Search" size="default" @search="onSearch" />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span='4' class="centerFont">
        <SettingFilled /> {{ `${$t('default.82')} (${teamList.length})` }}
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
              <InfoCircleFilled />
            </span>
          </div>
          <div>{{ item.captain }}</div>
        </a-col>
        <a-col :span='3' class="vipBox">
          <div>{{ $t('default.227') }}</div>
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
        <a-col :span='3' class="vipBox">
          <div>{{ $t('default.226') }}</div>
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
          <div class="matchTitle">{{ $t('default.225') }}</div>
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

    <a-row class="rowStyle">
      <a-col class="pagination">
        <a-pagination v-model:current="current" v-model:pageSize="pageSize" :total="500" @showSizeChange="onShowSizeChange" />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { useRouter } from 'vue-router'
import divTitle from "@/components/DividingLine.vue";
import {
  SettingFilled,
  BankFilled,
  SearchOutlined,
  InfoCircleFilled,
  UserOutlined,
  DownCircleOutlined,
  UpCircleOutlined,
} from "@ant-design/icons-vue";
export default defineComponent({
  name: "team",
  components: {
    divTitle,
    BankFilled,
    SearchOutlined,
    SettingFilled,
    InfoCircleFilled,
    UserOutlined,
    DownCircleOutlined,
    UpCircleOutlined,
  },
  setup() {
    const Router = useRouter()
    const data = reactive({
      title: "default.9",
      currentValue: 1,
      value: 201,
      current:1,
      pageSize:1,
      colSpan:4,
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
        })
      },
      onSearch: () => {
        console.log("11");
      },
      changeFlag: (index: number) => {
        data.teamList[index].flag = !data.teamList[index].flag;
      },
      onShowSizeChange:() => {
        console.log(1)
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
  width: 220px;
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
.btnBox {
  display: flex;
}
.btnBox div {
  margin-right: 15px;
}
.recordBox {
  padding: 10px;
}
.matchTitle {
  font-size: 20px;
  border-bottom: 1px dashed #000;
}
.msgBox {
  margin: 10px 0;
  height: 80px;
  box-sizing: border-box;
}
.recordInfoStyle {
  display: flex;
  justify-content: flex-start;
}
.countBox {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.recordInfoFont {
  font-weight: bold;
  cursor: pointer;
}
.recordInfoFont:hover {
  text-decoration: underline;
}
</style>
