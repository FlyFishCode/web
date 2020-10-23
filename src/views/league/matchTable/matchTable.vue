<template>
  <div class="content">
    <a-row>
      <a-col :span='2'>
        <SettingFilled /> {{ title }}
      </a-col>
      <a-col :span='3' :offset='14'>
        <a-button>{{ '复制上一次排阵' }}</a-button>
      </a-col>
      <a-col :span='3'>
        <a-button>{{ '储存为草稿' }}</a-button>
      </a-col>
      <a-col :span='2'>
        <a-button type="primary">{{ '排阵提交' }}</a-button>
      </a-col>
    </a-row>
    <a-row class="timeBox">
      <a-col :span='6'>{{ `排陣截止日期：${matchTable.date}` }}</a-col>
      <a-col :span='6' :offset='2'>
        <div class="surplusBox">
          <div>{{ '剩余时间：' }}</div>
          <div class="timeStyle">{{ matchTable.day }}</div>
          <div>{{ '天' }}</div>
          <div class="timeStyle">{{ matchTable.hours }}</div>:
          <div class="timeStyle">{{ matchTable.minute }}</div>:
          <div class="timeStyle">{{ matchTable.second }}</div>
        </div>
      </a-col>
      <a-col :span='7' :offset='3'>{{ `输入最大Set数：${matchTable.maxSet} / Entry Max Mode Count：${matchTable.maxMode}` }}</a-col>
    </a-row>
    <a-row class="rowStyle">
      <div v-for="(item,index) in matchTable.matchTableList" :key="index">
        <div class="modeType">
          <div class="modeStyle">{{ `Set${index+1} / ${item.type}` }}</div>
          <div v-if="item.male" class="sexStyle"><i class="male ">&#xe793;</i>
            <div>{{ `more than ${ item.male }` }}</div>
          </div>
          <div v-if="item.female" class="sexStyle"><i class="female">&#xe793;</i>
            <div>{{ `more than ${ item.female }` }}</div>
          </div>
        </div>
        <div class="setStyle">
          <div class="setTitle">
            <div>{{ `Set ${index+1}` }}</div>
            <div>{{ 'player 1' }}</div>
            <div>{{ 'player 2' }}</div>
            <div>{{ 'player 3' }}</div>
            <div>{{ 'player 4' }}</div>
          </div>
          <div v-for="(leg,index) in item.legList" :key="index" class="setBox">
            <div class="legStyle">
              <div class="legBox">
                <div class="legIndexBox">{{ index+1 }}</div>
              </div>
              <div class="legBox">{{ leg.type }}</div>
            </div>
            <div class="playerStyle" v-for="playerBox in new Array(leg.maxPlayer).fill(leg.maxPlayer)" :key="playerBox.index">
              <a-select v-model:value="leg.playerId">
                <a-select-option v-for="player in matchTable.homePlayerList" :key="player.id" :value="player.id">{{ `[${player.male?'M':'F'}]  ${player.name}` }}</a-select-option>
              </a-select>
            </div>
          </div>
        </div>
      </div>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import { SettingFilled } from "@ant-design/icons-vue";
export default defineComponent({
  name: "matchTable",
  components: {
    SettingFilled,
  },
  props: {
    matchTable: {
      type: Array,
    },
  },
  setup() {
    const data = reactive({
      title: "排陣",
      matchTable: {
        date: "2020-8-9",
        day: 10,
        hours: 5,
        minute: 1,
        second: 10,
        maxSet: 2,
        maxMode: 1,
        homePlayerList: [
          { id: 1, name: "AAAAA", male: 0 },
          { id: 2, name: "BBBBB", male: 1 },
          { id: 3, name: "CCCCC", male: 0 },
          { id: 4, name: "DDDDD", male: 1 },
          { id: 5, name: "EEEEE", male: 1 },
        ],
        matchTableList: [
          {
            type: 1,
            male: 2,
            legList: [
              { type: 1, maxPlayer: 1, playerId: 1 },
              { type: 1, maxPlayer: 2, playerId: 2 },
              { type: 1, maxPlayer: 3, playerId: 3 },
              { type: 1, maxPlayer: 4, playerId: 4 },
            ],
          },
          { type: 2, female: 1 },
        ],
      },
    });
    const reduce = (timer: number | undefined) => {
      data.matchTable.minute -= 1;
      if (!data.matchTable.minute) {
        data.matchTable.hours -= 1;
        data.matchTable.minute = 59;
        if (!data.matchTable.hours) {
          data.matchTable.day -= 1;
          if (!data.matchTable.day) {
            clearInterval(timer);
          }
        }
      }
      data.matchTable.second = 59;
    };
    onMounted(() => {
      const timer = setInterval(() => {
        data.matchTable.second -= 1;
        if (!data.matchTable.second) {
          reduce(timer);
        }
      }, 1000);
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped>
.buttonBox {
  margin: 0 5px;
}
.surplusBox {
  display: flex;
  justify-content: space-around;
}
.timeBox {
  margin: 10px 0;
  background: #ff4e00;
  color: #fff;
  line-height: 24px;
  padding: 10px 0;
}
.timeStyle {
  width: 25px;
  height: 25px;
  background: #fff;
  color: #000;
  border-radius: 4px;
}
.modeType {
  color: #000;
  font-size: 20px;
  display: flex;
  background: #f1f0ed;
  margin: 5px 0;
  line-height: 31px;
}
/* 男人 */
@font-face {
  font-family: "male"; /* project id 1994758 */
  src: url("//at.alicdn.com/t/font_1994758_t4i2y7cuag.eot");
  src: url("//at.alicdn.com/t/font_1994758_t4i2y7cuag.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_1994758_t4i2y7cuag.woff2") format("woff2"),
    url("//at.alicdn.com/t/font_1994758_t4i2y7cuag.woff") format("woff"),
    url("//at.alicdn.com/t/font_1994758_t4i2y7cuag.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_1994758_t4i2y7cuag.svg#iconfont") format("svg");
}
.male {
  font-family: "male" !important;
  font-size: 25px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
/* 女人 */
@font-face {
  font-family: "female"; /* project id 1994758 */
  src: url("//at.alicdn.com/t/font_1994758_hdp11mt3txj.eot");
  src: url("//at.alicdn.com/t/font_1994758_hdp11mt3txj.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_1994758_hdp11mt3txj.woff2") format("woff2"),
    url("//at.alicdn.com/t/font_1994758_hdp11mt3txj.woff") format("woff"),
    url("//at.alicdn.com/t/font_1994758_hdp11mt3txj.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_1994758_hdp11mt3txj.svg#iconfont") format("svg");
}
.female {
  font-family: "female" !important;
  font-size: 25px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
.modeStyle {
  width: 53%;
  text-align: right;
}
.sexStyle {
  display: flex;
  width: 47%;
  justify-content: flex-end;
}
.setStyle {
  border: 1px solid #000;
}
.setTitle {
  display: flex;
  padding: 0 4px;
}
.setBox {
  display: flex;
  padding: 0 4px;
  margin: 4px 0;
}
.setBox div {
  background: #f1f0ed;
}
.setTitle div {
  width: 216px;
  background: #f1f0ed;
  border: 1px solid #5a5a5a;
}
.legStyle {
  width: 216px;
  height: 80px;
  display: flex;
  text-align: center;
  border: 1px solid #5a5a5a;
}
.playerStyle {
  width: 216px;
  height: 80px;
  text-align: center;
  border: 1px solid #5a5a5a;
}
.legBox {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.legIndexBox {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  line-height: 60px;
  border: 1px solid #5a5a5a;
}
</style>
