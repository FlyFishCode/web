<template>
  <div>
    <a-row class="rowStyle">
      <a-col :span='10' class="allBox">
        <a-col :span='12' class="firstClass">
          <img :src="infoData.img" alt="">
        </a-col>
        <a-col :span='12' class="firstClass FONT">
          <div class="teamName" @click="showTeamInfo">{{ infoData.teamName }}</div>
          <div class="disabledClass">{{ infoData.captainName }}</div>
          <div class="disabledClass">{{ infoData.place }}
            <span @click="showDetail" class="icon">
              <InfoCircleFilled />
            </span>
          </div>
          <div class="disabledClass">{{ infoData.country }}</div>
        </a-col>
      </a-col>
      <a-col :span='7'>
        <div class="title">{{ 'General Rating' }}</div>
        <a-progress type="circle" class="myYuan" :percent="75" />
        <div class="myProgress">
          <div class="myProgressBox">
            <div>
              <a-progress :percent="infoData.ppdNumber" strokeColor='red' />
            </div>
            <div>{{ `PPD    ${infoData.ppdNumber}` }}</div>
          </div>
          <div class="myProgressBox">
            <div>
              <a-progress :percent="infoData.mprNumber" strokeColor='red' />
            </div>
            <div>{{ `MPR    ${infoData.mprNumber}` }}</div>
          </div>
        </div>
      </a-col>
      <a-col :span='7'>
        <div class="title">{{ 'Competition Rating' }}</div>
        <a-progress type="circle" class="myYuan" :percent="75" />
        <div class="myProgress">
          <div class="myProgressBox">
            <div>
              <a-progress :percent="infoData.ppdNumber" strokeColor='red' />
            </div>
            <div>{{ `PPD    ${infoData.ppdNumber}` }}</div>
          </div>
          <div class="myProgressBox">
            <div>
              <a-progress :percent="infoData.mprNumber" strokeColor='red' />
            </div>
            <div>{{ `MPR    ${infoData.mprNumber}` }}</div>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang='ts'>
import { useRoute } from "vue-router";
import { reactive, toRefs, onMounted } from "vue";
import {
  InfoCircleFilled,
} from "@ant-design/icons-vue";
export default {
  name: "showTeamTopOne",
  components: {
    InfoCircleFilled,
  },
  setup() {
    const route = useRoute();
    const data = reactive({
      infoData: {
        img: require("@/assets/1.jpg"),
        teamName: "上海市消防总队黄埔支队嵩山中队",
        captainName: "李逍遥",
        place: "李逍遥",
        country: "山东",
        allScore: "总分数",
        scoreNumber: 59,
        ppdNumber: 51,
        mprNumber: 65,
        resultList: [
          {
            id: 1,
            name: "Set 结果",
            win: 15,
            draw: 20,
            lost: 25,
            probability: 80,
          },
          {
            id: 1,
            name: "Match 结果",
            win: 15,
            draw: 20,
            lost: 25,
            probability: 80,
          },
        ],
      },
      showTeamInfo: () => {
        console.log("111");
      },
      showDetail: () => {
        console.log("222");
      },
    });
    onMounted(() => {
      console.log(route.query);
    });
    return {
      ...toRefs(data),
    };
  },
};
</script>
<style scoped>
.rowStyle {
  height: 190px;
  margin: 10px 0;
  padding: 5px;
  background: #555;
  box-sizing: border-box;
}
.firstClass img{
  height: 100%;
}
.allBox {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-right: 1px solid #fff;
}
.carousel {
  border-right: 1px solid #fff;
  display: flex;
  height: 180px;
  position: relative;
  overflow: hidden;
}
.firstClass {
  height: 140px;
  width: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
}
.FONT {
  padding-left: 10px;
}
.teamName {
  font-size: 15px;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
}
.disabledClass {
  color: #eee;
  cursor: pointer;
}
.icon {
  position: relative;
  top: 1px;
}
.title {
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  text-align: left;
  padding-left: 30px;
}
.matchBox {
  height: 90%;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.fontStyle {
  display: flex;
  width: 100%;
  justify-content: space-around;
}
.right {
  width: 60%;
}
.right >>> .ant-progress-text {
  color: #fff;
}
.iconFont {
  color: #fff;
  font-size: 25px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.iconFont :hover {
  opacity: 0.7;
}
.center {
  display: flex;
  position: relative;
  left: 0px;
}
.leftIcon {
  position: absolute;
  left: 0px;
  top: calc(50% - 10px);
  z-index: 1;
}
.rightIcon {
  position: absolute;
  right: 0px;
  top: calc(50% - 10px);
}
.centerBox {
  width: 280px;
  margin: 0 20px;
}
.animate__backOutRight {
  transition: all 1s ease;
}
.myYuan >>> .ant-progress-inner {
  width: 100px !important;
  height: 100px !important;
}
.myProgress {
  display: flex;
  justify-content: space-around;
}
.myProgressBox {
  width: 40%;
  color: #fff;
}
.myProgressBox >>> .ant-progress-text {
  display: none;
}
.showIndex{
  display: flex;
  width: 100%;
  bottom: 5px;
  left: 0px;
  justify-content: center;
  position: absolute;
}
.otherBox{
  width: 20px;
  height: 5px;
  margin: 0 3px;
  background: #fff;
}
.isActived{
  background: red;
}
</style>