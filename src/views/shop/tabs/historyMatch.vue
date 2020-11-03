<template>
  <div class="content">
    <a-row>
      <a-col :span='5' class="smallTitle">
        <SettingFilled /> {{ $t('default.171') + '  ' + `(${matchTotal})` }}
      </a-col>
    </a-row>
    <a-row class="centerStyle">
      <a-row>
        <a-col :span='3'>
          <a-select v-model:value="matchType" @change="matchTypeChange" style="width: 100px">
            <a-select-option v-for="item in matchTypeList" :key="item.value" :value='item.value'>{{ item.label }}</a-select-option>
          </a-select>
        </a-col>
        <a-col :span='2'>
          <a-select v-model:value="matchType" @change="matchTypeChange" style="width: 100px">
            <a-select-option v-for="item in matchTypeList" :key="item.value" :value='item.value'>{{ item.label }}</a-select-option>
          </a-select>
        </a-col>
      </a-row>
      <div>
        <a-row v-for="item in allLeagueList" :key="item.matchId" class="matchBox">
          <a-col :span='14'>
            <a-col :span='5' class="matchImgBox">
              <img class="matchImg" :src="item.img">
            </a-col>
            <a-col @click="showMore(item.state)" :span='10' class="matchInfo">
              <div class="divName">{{ item.title }}</div>
              <div class="divBox">
                <div v-for="div in item.division" :key="div.id">{{ div.name }}</div>
              </div>
            </a-col>
          </a-col>
          <a-col :span='2'>
            <div class="fontDisplay">{{ $t('default.27') }}</div>
            <div>{{ item.area }}</div>
          </a-col>
          <a-col :span='8'>
            <div class="rightStyle">
              <div class="fontDisplay">{{ '比赛期间' }}</div>
              <div class="matchState I" v-if="item.state === 1">{{ '比赛中' }}</div>
              <div class="matchState R" v-if="item.state === 2">{{ '比赛结束' }}</div>
              <div class="matchState F" v-if="item.state === 3">{{ '比赛结束' }}</div>
            </div>
            <div>{{ item.date }}</div>
          </a-col>
        </a-row>
      </div>
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
import { defineComponent, reactive, toRefs, onMounted } from "vue";
// import { useRouter } from "vue-router";
import { SettingFilled } from "@ant-design/icons-vue";
interface HTMLInputEvent {
  value: HTMLInputElement & EventTarget;
}
interface DataProp {
  monthList: { id: number; value: number | string }[];
  allLeagueList: { key: string; value: number | string }[];
  myLeagueList: { key: string; value: number | string }[];
  showALLleague: () => void;
  showMyLengue: () => void;
}
export default defineComponent({
  name: "hearder",
  components: { SettingFilled },
  setup() {
    // const Router = useRouter();
    const data = reactive({
      currentPage: 1,
      matchTotal: 0,
      value: "",
      matchType: 2020,
      matchTypeList: [{ value: 2020, label: "2020" }],
      newsSearch: [
        { id: 1, value: "新闻" },
        { id: 2, value: "标题" },
        { id: 3, value: "新闻+标题" },
      ],
      stateList: [
        { id: 1, value: "准备中" },
        { id: 2, value: "进行中" },
        { id: 3, value: "已结束" },
      ],
      allLeagueList: [
        {
          matchId: 1,
          img: require("@/assets/1.jpg"),
          title: "2020第一次比赛",
          area: "上海",
          date: "2020-9-10",
          state: 1,
          division: [{ id: 1, name: "BMA-1" }],
        },
        {
          matchId: 1,
          img: require("@/assets/1.jpg"),
          title: "2021第二次比赛",
          area: "武汉",
          date: "2020-9-10",
          state: 2,
          division: [
            { id: 1, name: "BMA-1" },
            { id: 2, name: "ORP-1" },
          ],
        },
        {
          matchId: 1,
          img: require("@/assets/1.jpg"),
          title: "2022第三次比赛",
          area: "云南",
          date: "2020-9-10",
          state: 3,
          division: [
            { id: 1, name: "BMA-1" },
            { id: 2, name: "SUR-1" },
            { id: 3, name: "ACU-1" },
          ],
        },
      ],
      monthList: [{ id: 0, value: 0 }],
      showMore: (value: string) => {
        console.log(value);
      },
      matchTypeChange: (value: number) => {
        console.log(value);
      },
    });
    onMounted(() => {
      for (let i = 1; i < 13; i += 1) {
        data.monthList.push({ id: i, value: i });
      }
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>
<style scoped>
.imgBox {
  height: 100px;
}
.imgBox img {
  height: 100%;
}
.centerStyle {
  line-height: 32px;
}
.matchBox {
  height: 80px;
  border: 1px solid #d4d4d4;
  margin: 10px;
  display: flex;
  align-items: center;
}
.matchImg {
  height: 40px;
}
.rightStyle {
  display: flex;
  justify-content: space-around;
}
.fontDisplay {
  color: #999;
}
.matchImgBox {
  height: 80px;
  line-height: 80px;
}
.matchState {
  width: 100px;
  height: 25px;
  line-height: 25px;
  color: #fff;
  border-radius: 10px;
}
.I {
  background: red;
}
.R {
  background: red;
}
.F {
  background: #d9d9d9;
  color: #797878;
}
.divBox {
  display: flex;
}
.divBox div {
  border: 1px solid #000;
  height: 25px;
  line-height: 25px;
  margin-right: 3px;
}
.divName {
  text-align: left;
}
.matchInfo {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>