<template>
  <div class="content">
    <a-row>
      <a-col :span='5' class="smallTitle">
        <SettingFilled /> {{ $t('default.102') }}
      </a-col>
    </a-row>
    <a-row v-for="(item,index) in matchList" :key="index">
      <a-row class="matchBox">
        <a-col :span='14'>
          <div>
            <a-col :span='5'>
              <img class="matchImg" :src="item.img">
            </a-col>
            <a-col :span='10'>
              <div @click="showMore(item.state)" class="divBg">
                <div>{{ item.title }}</div>
                <div class="divisionBox">
                  <div v-for="div in item.divisiton" :key="div.index" class="divsision">{{ div.name }}</div>
                </div>
              </div>
            </a-col>
          </div>
        </a-col>
        <a-col :span='2'>
          <div class="fontDisplay">{{ $t('default.167') }}</div>
          <div>{{ item.area }}</div>
        </a-col>
        <a-col :span='6'>
          <div class="rightStyle">
            <div class="fontDisplay">{{ $t('default.17') }}</div>
            <div class="matchState I" v-if="item.state === 1">{{ '比赛中' }}</div>
            <div class="matchState R" v-if="item.state === 2">{{ '比赛结束' }}</div>
            <div class="matchState F" v-if="item.state === 3">{{ '比赛结束' }}</div>
          </div>
          <div>{{ item.date }}</div>
        </a-col>
        <a-col :span='2' class="iconFont">
          <div v-if="item.matchHistory.length">
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
          <a-row class="title">
            <a-col :span=12>{{ '参赛队伍' }}</a-col>
            <a-col :span=12>{{ '比赛记录' }}</a-col>
          </a-row>
          <a-row v-for="history in item.matchHistory" :key="history.index" class="msgBox">
            <a-col :span='12' class="teamBox">
              <div class="teamName">{{ history.matchName }}</div>
            </a-col>
            <a-col :span='12' class="countBox">
              <div class="tableBox Header">
                <div>{{ '排行' }}</div>
                <div>{{ 'Rating' }}</div>
                <div>{{ 'PPD' }}</div>
                <div>{{ 'MPR' }}</div>
                <div>{{ 'Set 胜' }}</div>
                <div>{{ 'Set 和' }}</div>
                <div>{{ 'Set 败' }}</div>
              </div>
              <div class="tableBox Content">
                <div>{{ history.win }}</div>
                <div>{{ history.win }}</div>
                <div>{{ history.win }}</div>
                <div>{{ history.win }}</div>
                <div>{{ history.win }}</div>
                <div>{{ history.win }}</div>
                <div>{{ history.win }}</div>
              </div>
            </a-col>
          </a-row>
        </a-row>
      </transition>
    </a-row>
    <entryList :entryPath='entryPath' />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import entryList from '@/components/common/entryList.vue';
import {
  SettingFilled,
  DownCircleOutlined,
  UpCircleOutlined,
} from "@ant-design/icons-vue";
import { useRouter } from 'vue-router';
export default defineComponent({
  name: "matchRecord",
  components: {
    SettingFilled,
    DownCircleOutlined,
    UpCircleOutlined,
    entryList
  },
  setup() {
    const Router = useRouter()
    const data = reactive({
      entryPath:'/players',
      matchList: [
        {
          matchId: 1,
          img: require("@/assets/1.jpg"),
          title: "2020第一次比赛",
          divisiton: [
            { id: 1, name: "张三" },
            { id: 2, name: "李四" },
          ],
          area: "上海",
          date: "2020-9-10",
          state: 1,
          flag: false,
          matchHistory: [
            {
              matchName: "Demo_A_Team",
              img: require("@/assets/1.jpg"),
              date: "2020-5-40 ~ 2020-6-10",
              place: "广州",
              win: 10,
            },
            {
              matchName: "Demo_A_Team",
              img: require("@/assets/1.jpg"),
              date: "2020-5-40 ~ 2020-6-10",
              place: "广州",
              win: 10,
            },
          ],
        },
        {
          matchId: 1,
          img: require("@/assets/1.jpg"),
          title: "2021第二次比赛",
          divisiton: [
            { id: 1, name: "张三" },
            { id: 2, name: "李四" },
            { id: 3, name: "王五" },
          ],
          area: "武汉",
          date: "2020-9-10",
          state: 2,
          flag: false,
          matchHistory: [],
        },
        {
          matchId: 1,
          img: require("@/assets/1.jpg"),
          title: "2022第三次比赛",
          divisiton: [{ id: 1, name: "张三" }],
          area: "云南",
          date: "2020-9-10",
          state: 3,
          flag: false,
          matchHistory: [],
        },
      ],
      changeFlag: (index: number) => {
        data.matchList[index].flag = !data.matchList[index].flag;
      },
      goHistory: () => {
        Router.push('/players')
      },
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped>
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
.divBg {
  cursor: pointer;
  text-align: left;
}
.divisionBox {
  display: flex;
}
.divsision {
  border: 1px solid #000;
  padding: 0 2px;
  margin: 0 4px;
  text-decoration: underline;
}
.fontDisplay {
  color: #999;
}
.rightStyle {
  display: flex;
  justify-content: space-around;
}
.matchState {
  width: 100px;
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
.title {
  text-align: left;
  color: #999;
}
.msgBox {
  margin: 10px 0;
  height: 80px;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
  display: flex;
}
.teamBox {
  display: flex;
  align-items: center;
}
.teamName {
  text-align: left;
  font-size: 20px;
  font-weight: bold;
}
.countBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.tableBox {
  display: flex;
  justify-content: space-between;
  text-align: center;
}
.tableBox div {
  width: 75px;
  border: 1px solid #000;
}
.Header {
  background: #f1f0ed;
  color: #5a5a5a;
}
.recordBox{
  margin: 10px;
  padding: 0 20px;
  border: 1px solid #d4d4d4;
}
</style>
