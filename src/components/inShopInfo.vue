<template>
  <div>
    <a-row class="rowStyle">
      <a-col :span='12' class="allBox">
        <a-col :span='10' class="imgBox">
          <img class="imgBg" :src="shopData.img" alt="">
        </a-col>
        <a-col :span='14' class="firstClass FONT">
          <div class="teamName" @click="showTeamInfo">{{ shopData.teamName }}</div>
          <div class="disabledClass">{{ shopData.captainName }}</div>
          <div class="disabledClass">{{ shopData.place }}
            <span @click="showDetail" class="icon">
              <EnvironmentOutlined />
            </span>
          </div>
          <div class="disabledClass">{{ shopData.country }}</div>
        </a-col>
      </a-col>
      <a-col :span='12' class="scoreBox">
        <a-col :span='12' class="infoBox">
          <div class="imgBg">
            <img class="imgBg" :src="shopData.plauerImg" alt="">
          </div>
          <div class="nameBox">{{ shopData.name }}</div>
        </a-col>
        <a-col :span='12'>
          <div>
            <div class="rightScore">
              <div>{{ $t('default.168') }}</div>
              <div>{{ shopData.Rating }}</div>
            </div>
            <div class="pregress">
              <a-progress :percent="shopData.Rating" />
            </div>
          </div>
          <div>
            <div class="rightScore">
              <div>{{ $t('default.169') }}</div>
              <div>{{ shopData.PPD }}</div>
            </div>
            <div class="pregress">
              <a-progress :percent="shopData.PPD" />
            </div>
          </div>
          <div>
            <div class="rightScore">
              <div>{{ $t('default.170') }}</div>
              <div>{{ shopData.MPR }}</div>
            </div>
            <div class="pregress">
              <a-progress :percent="shopData.MPR" />
            </div>
          </div>
        </a-col>
      </a-col>
    </a-row>
  </div>
</template>

<script lang='ts'>
import { useRoute } from "vue-router";
import { reactive, toRefs, onMounted, ref } from "vue";
import { EnvironmentOutlined } from "@ant-design/icons-vue";
export default {
  name: "showTeamTopOne",
  components: {
    EnvironmentOutlined,
  },
  setup() {
    const route = useRoute();
    const currentIndex = ref(0);
    const data = reactive({
      shopData: {
        img: require("@/assets/1.jpg"),
        teamName: "上海市消防总队黄埔支队嵩山中队",
        captainName: "李逍遥",
        place: "李逍遥",
        country: "山东",
        allScore: "总分数",
        plauerImg: require("@/assets/1.jpg"),
        name: "刘富贵",
        Rating: 25,
        PPD: 68,
        MPR: 79,
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
      currentIndex,
    };
  },
};
</script>
<style scoped>
.rowStyle {
  height: 190px;
  margin: 10px 0;
  padding: 5px;
  box-sizing: border-box;
}
.imgBg {
  width: 70%;
  margin: 0 auto;
}
.allBox {
  height: 100%;
  display: flex;
  background: #272727;
  align-items: center;
  justify-content: center;
}
.imgBox {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  padding: 15px;
}
.firstClass {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  height: 100%;
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
  cursor: pointer;
}
.icon {
  position: relative;
  top: 1px;
}
.score {
  color: red;
  font-size: 50px;
}
.animate__backOutRight {
  transition: all 1s ease;
}
.scoreBox {
  padding: 15px;
  height: 100%;
  background: #4b4b4b;
}
.scoreBox > div {
  padding: 0 15px;
}
.nameBox{
  font-size: 16px;
  color: #fff;
}
.currentScore {
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
}
.scoreName {
  text-align: left;
}
.infoBox{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.pregress>>>.ant-progress-text{
  display: none;
}
.rightScore{
  color: #8d8d8d;
  font-size: 16px;
  padding: 0 20px;
  font-weight: bold;
  display:flex;
  justify-content: space-between;
}
</style>