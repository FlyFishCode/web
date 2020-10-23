<template>
  <div class="rowStyle">
    <a-row v-for="item in matchTeamInfo" :key="item.index" class="matchTeamBox">
      <a-col :span='8' class="matchTeamLeftBox">
        <div class="matchTeamState">
          <div v-if="item.homeTeamState === 1" class="teamStateStyle">{{ '未提交' }}</div>
          <div v-if="item.homeTeamState === 2" class="teamStateStyle">{{ '已提交' }}</div>
        </div>
        <div class="matchImgBox">
          <img :src="item.homeTeamImg" alt="">
        </div>
        <div class="teamName">{{ item.homeTeamName }}</div>
        <div class="teamTopStyle">{{ item.homeTeamRanking }} <span>th</span></div>
        <div class="pkLevel">
          <div class="matchInfo">
            <div class="Name">{{ 'W' }}</div>
            <div class="value">{{ item.homeTeamW }}</div>
          </div>
          <div class="matchInfo">
            <div class="Name">{{ 'D' }}</div>
            <div class="value">{{ item.homeTeamD }}</div>
          </div>
          <div class="matchInfo">
            <div class="Name">{{ 'L' }}</div>
            <div class="value">{{ item.homeTeamL }}</div>
          </div>
        </div>
      </a-col>
      <a-col :span='8' class="matchCenter">
        <div class="centerTime">
          <div>{{ item.time }}</div>
          <div class="typeStyle">
            <div v-if="item.type === 1">{{ 'Local' }}</div>
            <div v-else>{{ 'onlian' }}</div>
          </div>
        </div>
        <div class="teamMsg">
          <div class="msgScore">{{ item.homeScore }}</div>
          <div class="msgTitle">
            <div>{{ 'READY' }}</div>
            <div class="titleStyle">{{ 'MADE UP' }}</div>
            <div class="titleCenter">{{ 'VS' }}</div>
            <div class="titleStyle">{{ 'IN PLAY' }}</div>
            <div>{{ 'ENDED' }}</div>
          </div>
          <div class="msgScore">{{ item.awayScore }}</div>
        </div>
        <div class="bottomScore">
          <div class="homeScoreStyle">{{ item.homeScore }}</div>
          <div>{{ item.awayScore }}</div>
        </div>
        <div class="bottomIndex">{{ '排行' }}</div>
        <div>{{ '对手成绩' }}</div>
      </a-col>
      <a-col :span='8' class="matchTeamLeftBox">
        <div class="awayTeamState">
          <div v-if="item.awayTeamState === 1" class="teamStateStyle">{{ '未提交' }}</div>
          <div v-if="item.awayTeamState === 2" class="teamStateStyle">{{ '已提交' }}</div>
        </div>
        <div class="matchImgBox">
          <img :src="item.awayTeamImg" alt="">
        </div>
        <div class="teamName">{{ item.awayTeamName }}</div>
        <div class="teamTopStyle">{{ item.awayTeamRanking }} <span>th</span></div>
        <div class="pkLevel">
          <div class="matchInfo">
            <div class="Name">{{ 'W' }}</div>
            <div class="value">{{ item.awayTeamW }}</div>
          </div>
          <div class="matchInfo">
            <div class="Name">{{ 'D' }}</div>
            <div class="value">{{ item.awayTeamD }}</div>
          </div>
          <div class="matchInfo">
            <div class="Name">{{ 'L' }}</div>
            <div class="value">{{ item.awayTeamL }}</div>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
// import { LeftOutlined, RightOutlined } from "@ant-design/icons-vue";
// interface DataProps {
//   detailList: string;
// }
export default defineComponent({
  name: 'inCalendar',
  components: {
  },
  setup () {
    const data = reactive({
      direction: false,
      hasData: false,
      position: 0,
      buttomPositon: 0,
      current: 0,
      currentDiv: 0,
      matchTeamInfo: [
        {
          homeTeamState: 1,
          homeTeamImg: require('@/assets/1.jpg'),
          homeTeamName: '上海队',
          homeScore: 8,
          homeTeamRanking: 1,
          homeTeamW: 23,
          homeTeamD: 3,
          homeTeamL: 15,
          awayTeamState: 1,
          awayTeamImg: require('@/assets/1.jpg'),
          awayTeamName: '上海队',
          awayScore: 4,
          awayTeamRanking: 1,
          awayTeamW: 23,
          awayTeamD: 3,
          awayTeamL: 15,
          time: '2020-8-41',
          type: 1
        }
      ],
    });
    onMounted(() => {
      console.log(1)
    });
    return {
      ...toRefs(data)
    }
  }
})
</script>
<style scoped>
.top {
  height: 30px;
  border-radius: 14px;
  background: #ececec;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  position: relative;
  border: 1px solid #666;
}
.bottom {
  height: 100px;
  background: #ececec;
  display: flex;
  justify-content: space-around;
}
.direction {
  height: 30px;
  width: 30px;
  font-size: 24px;
  text-align: center;
  line-height: 29px;
  color: #000;
  font-weight: bold;
  cursor: pointer;
  margin: 0 auto;
}
.centerBox {
  overflow: hidden;
  position: relative;
}
.directionCenterBox {
  display: flex;
  position: absolute;
}
.center {
  display: flex;
  justify-content: space-between;
  position: absolute;
}
.centerDiv {
  height: 30px;
  width: 130px;
  border-radius: 20px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  position: relative;
  margin: 0 19px;
}
.currentDiv {
  background: #e31d24;
  color: #fff;
}
.divAfter {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid red;
  position: absolute;
  top: 0;
  right: 0;
  background: #fff;
  z-index: 1;
  font-size: 5px;
  line-height: 20px;
  color: #000;
}
.matchBox {
  border: 1px solid #7a7a7a;
  border-radius: 5px;
  background: #ececec;
  height: 100px;
  display: flex;
  justify-content: space-around;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 278px;
  margin: 0 30px;
}
.stateStyle {
  position: absolute;
  right: -30px;
  top: -30px;
  width: 60px;
  height: 60px;
  display: inline-block;
  transform: rotate(45deg);
  line-height: 100px;
  text-align: center;
  font-size: 12px;
  color: #fff;
}
.N {
  background: #448aca;
}
.I {
  background: #e31d24;
}
.F {
  background: #3a3c3e;
}
.imgBox {
  height: 50px;
}
.imgBox img {
  height: 100%;
}
.bg {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
.buttomDirection {
  font-size: 30px;
  line-height: 100px;
  font-weight: bold;
  cursor: pointer;
}
.directionBox {
  display: flex;
  justify-content: center;
}
.centerBg {
  display: flex;
  overflow: hidden;
  position: relative;
}
.matchTeamBox {
  height: 250px;
  color: #fff;
  background: #404040;
}
.matchImgBox {
  height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #fff;
}
.matchImgBox img {
  height: 100px;
}
.pkLevel {
  display: flex;
  justify-content: center;
}
.matchInfo {
  display: flex;
  width: 60px;
}
.matchInfo {
  display: flex;
  justify-content: space-around;
}
.matchInfo div {
  width: 50%;
}
.Name {
  background: #ff4e00;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.value {
  color: #000;
  background: #fff;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
.matchTeamLeftBox {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.matchTeamState {
  display: flex;
  justify-content: flex-end;
}
.awayTeamState {
  display: flex;
  justify-content: flex-start;
}
.teamStateStyle {
  width: 80px;
  background: #fffad7;
  border-radius: 10px;
  color: #000;
  text-align: center;
}
.teamTopStyle {
  font-style: italic;
  border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;
  font-weight: bold;
}
.teamName {
  text-decoration: underline;
  cursor: pointer;
  border-top: 1px solid #ffffff;
}
.matchCenter {
  border-left: 1px solid #ffffff;
  border-right: 1px solid #ffffff;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  height: 100%;
}
.centerTime {
  display: flex;
  justify-content: space-around;
}
.centerTime div {
  width: 40%;
  text-align: center;
  margin: 0 auto;
}
.typeStyle {
  border-radius: 10px;
  color: #000;
  background: #febc0b;
}
.teamMsg {
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #ffffff;
  border-bottom: 1px solid #ffffff;
}
.msgScore {
  font-size: 70px;
  margin: 0 auto;
}
.msgTitle {
  border-left: 1px solid #fff;
  border-right: 1px solid #fff;
}
.titleStyle {
  border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;
}
.titleCenter {
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  font-weight: bold;
  color: #363636;
  background: #1f1f1f;
}
.bottomScore {
  display: flex;
  justify-content: space-around;
}
.bottomScore div {
  width: 50%;
  text-align: center;
}
.homeScoreStyle {
  border-right: 1px solid #ffffff;
}
.bottomIndex {
  border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;
}
</style>
