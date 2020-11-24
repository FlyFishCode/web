<template>
  <div>
    <a-row class="rowStyle myPageUI">
      <a-col :lg='10' :xs="24" class="allBox">
        <a-col :span='12' class="imgClass">
          <img :src="infoData.memberImg" alt="">
        </a-col>
        <a-col :span='12' class="firstClass FONT">
          <div class="teamIcon"><img :src="infoData.countryIcon" alt=""></div>
          <div class="teamName" @click="showTeamInfo">{{ infoData.memberName }}</div>
          <div class="disabledClass">
            <a-select v-model:value="selectTeamName" class="selectBox" size="small" @change="handleChange">
              <a-select-option v-for="item in infoData.teamList" :key="item.teamId" :value='item.teamId'>{{ item.teamName }}</a-select-option>
            </a-select>
          </div>
          <div class="disabledClass">{{ infoData.place }}
            <span @click="showDetail" class="icon">
              <InfoCircleFilled />
            </span>
          </div>
          <div class="disabledClass">{{ `${infoData.countryName}>${infoData.areaName}` }}</div>
        </a-col>
      </a-col>
      <a-col :lg='7' :xs="0">
        <div class="title">{{ $t('default.238') }}</div>
        <a-progress type="circle" class="myYuan" :percent="infoData.competitionRating || 0" />
        <div class="myProgress">
          <div class="myProgressBox">
            <div>
              <a-progress :percent="infoData.ppd" strokeColor='red' />
            </div>
            <div class="typeBox"><span>{{ 'PPD' }}</span><span>{{ `${infoData.ppd}` }}</span></div>
          </div>
          <div class="myProgressBox">
            <div>
              <a-progress :percent="infoData.mpr" strokeColor='red' />
            </div>
            <div class="typeBox"><span>{{ 'MPR' }}</span><span>{{ `${infoData.mpr}` }}</span></div>
          </div>
        </div>
      </a-col>
      <a-col :lg='7' :xs="0">
        <div class="title">{{ $t('default.239') }}</div>
        <a-progress type="circle" class="myYuan" :percent="75" />
        <div class="myProgress">
          <div class="myProgressBox">
            <div>
              <a-progress :percent="infoData.ppd" strokeColor='red' />
            </div>
            <div class="typeBox"><span>{{ 'PPD' }}</span><span>{{ `${infoData.ppd}` }}</span></div>
          </div>
          <div class="myProgressBox">
            <div>
              <a-progress :percent="infoData.ppd" strokeColor='red' />
            </div>
            <div class="typeBox"><span>{{ 'PPD' }}</span><span>{{ `${infoData.ppd}` }}</span></div>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang='ts'>
// import { useRoute } from "vue-router";
import { reactive, toRefs, onMounted } from "vue";
import { InfoCircleFilled } from "@ant-design/icons-vue";
import { myPageInfoHttp } from "@/axios/api";
export default {
  name: "myPageUI",
  components: {
    InfoCircleFilled,
  },
  setup() {
    // const Router = useRoute();
    const data = reactive({
      selectTeamName: "",
      infoData: {
        memberImg: require("@/assets/1.jpg"),
        memberName: "上海市消防总队黄埔支队嵩山中队",
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
      handleChange: () => {
        console.log(1);
      },
    });
    const getPlayerInfo = () => {
      const obj = {
        memberId: sessionStorage.getItem("userId"),
      };
      myPageInfoHttp(obj).then((res) => {
        if(res.data.data){
          data.infoData = res.data.data;
        }
      });
    };
    onMounted(() => {
      getPlayerInfo();
    });
    return {
      ...toRefs(data),
    };
  },
};
</script>
<style scoped>
.myPageUI{
  background: #555;
}
.rowStyle {
  margin: 10px 0;
  padding: 5px;
  box-sizing: border-box;
}
.imgClass img {
  width: 140px;
  height: 140px;
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
  height: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
}
.imgClass{
  padding: 15px;
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
}
.icon {
  position: relative;
  top: 1px;
  cursor: pointer;
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
.showIndex {
  display: flex;
  width: 100%;
  bottom: 5px;
  left: 0px;
  justify-content: center;
  position: absolute;
}
.otherBox {
  width: 20px;
  height: 5px;
  margin: 0 3px;
  background: #fff;
}
.isActived {
  background: red;
}
.teamIcon {
  height: 30px;
  display: flex;
  justify-content: flex-end;
}
.icon img {
  width: 100%;
}
.typeBox{
  display: flex;
  justify-content: space-around;
}
</style>