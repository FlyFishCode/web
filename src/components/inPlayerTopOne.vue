<template>
  <div>
    <a-row class="rowStyle">
      <a-col :span='10' class="allBox">
        <a-col :span='10' class="firstClass">
          <img class="imgBg" :src="playerData.img" alt="">
        </a-col>
        <a-col :span='14' class="firstClass FONT">
          <div class="teamName" @click="showTeamInfo">{{ playerData.teamName }}</div>
          <div class="disabledClass">{{ playerData.captainName }}</div>
          <div class="disabledClass">{{ playerData.place }}
            <span @click="showDetail" class="icon">
              <EnvironmentOutlined />
            </span>
          </div>
          <div class="disabledClass">{{ playerData.country }}</div>
        </a-col>
      </a-col>
      <a-col :span='14' class="scoreBox">
        <a-col :span='8' v-for="(item,index) in playerData.scoreList" :key="index" :class="{currentScore:index === 1}">
          <div class="scoreName">{{ item.name }}</div>
          <div ><a-progress type="circle" strokeColor='red' :percent="item.score" /></div>
        </a-col>
      </a-col>
    </a-row>
  </div>
</template>

<script lang='ts'>
import { useRoute } from "vue-router";
import { reactive, toRefs, onMounted, ref } from "vue";
import {
  EnvironmentOutlined,
} from "@ant-design/icons-vue";
export default {
  name: "showTeamTopOne",
  components: {
    EnvironmentOutlined,
  },
  setup() {
    const route = useRoute();
    const currentIndex = ref(0);
    const data = reactive({
      playerData: {
        img: require("@/assets/1.jpg"),
        teamName: "上海市消防总队黄埔支队嵩山中队",
        captainName: "李逍遥",
        place: "李逍遥",
        country: "山东",
        allScore: "总分数",
        scoreNumber: 59,
        ppdNumber: 51,
        mprNumber: 65,
        scoreList: [
          {
            id: 1,
            name: "General Rating",
            score: 25,
          },
          {
            id: 1,
            name: "Competition Rating",
            score: 55,
          },
          {
            id: 1,
            name: "胜率(Set)",
            score: 85,
          }
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
  background:#4b4b4b;
  box-sizing: border-box;
}
.imgBg {
  width: 100%;
  height: 100%;
}
.allBox {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #fff;
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
.scoreBox{
  padding: 15px;
  color: #8c8c8c;
}
.scoreBox>div{
  padding: 0 15px;
}
.currentScore{
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
}
.scoreName{
  text-align: left;
}
</style>