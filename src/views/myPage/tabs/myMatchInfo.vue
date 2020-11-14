<template>
  <div class="content">
    <a-row>
      <a-col :span='6' class="centerFont">
        <SettingFilled /> {{ $t('default.106') }}
      </a-col>
    </a-row>
    <a-row class="rowSearchBox">
      <a-col :span='3'>
        <a-select v-model:value="year" @change="yearChange" class="selectBox">
          <a-select-option v-for="item in yearList" :key="item.value" :value='item.value'>{{ item.label }}</a-select-option>
        </a-select>
      </a-col>
    </a-row>

    <a-row v-for="(item,index) in teamList" :key="item.id">
      <a-row class="eveyTeam">
        <a-col :span='3' class="imgColStyle">
          <div>
            <img class="matchImg" :src="item.competitionImg">
          </div>
        </a-col>
        <a-col :span='4' class="infoClass">
          <div class="teamStyle" @click="showInfo">{{ item.competitionName }}</div>
          <div class="placeStyle">
            <div>{{ item.place }}</div>
            <div v-for="div in item.divisionList" :key="div.id" class="divisiBox">{{ div.divisionName }}</div>
          </div>
        </a-col>
        <a-col :span='4' :offset='4' class="vipBox">
          <div class="disableFont">{{ $t('default.27') }}</div>
          <div>-{{ item.areaName }}</div>
        </a-col>
        <a-col :span='5' :offset='1' class="topBox">
          <div class="stateClass">
            <div class="disableFont">{{ $t('default.17') }}</div>
            <div v-if="item.status === 1" class="stateBox N">{{ $t('default.243') }}</div>
            <div v-if="item.status === 2" class="stateBox I">{{ $t('default.104') }}</div>
            <div v-if="item.status === 3" class="stateBox F">{{ $t('default.244') }}</div>
          </div>
          <div class="infoStyle">{{ item.date }}</div>
        </a-col>
        <a-col :span='2' :offset='1' class="iconFont">
          <div v-if="item.record">
            <div v-if="item.flag" @click="changeFlag(0,index)">
              <DownCircleOutlined />
            </div>
            <div v-else @click="changeFlag(item.competitionId,index)">
              <UpCircleOutlined />
            </div>
          </div>
        </a-col>
      </a-row>
      <transition enter-active-class="animate__animated animate__bounceInUp">
        <a-row v-show="item.flag" class="recordBox">
          <a-row class="title">
            <a-col :span=12>{{ $t('default.156') }}</a-col>
            <a-col :span=12>{{ $t('default.157') }}</a-col>
          </a-row>
          <a-row v-for="recordInfo in item.record" :key="recordInfo.index" class="msgBox">
            <a-col :span='12' class="teamBox">
              <div class="teamName">{{ recordInfo.teamName }}</div>
            </a-col>
            <a-col :span='12' class="countBox">
              <div class="tableBox Header">
                <div>{{ $t('default.70') }}</div>
                <div>{{ 'Rating' }}</div>
                <div>{{ 'PPD' }}</div>
                <div>{{ 'MPR' }}</div>
                <div>{{ 'Set 胜' }}</div>
                <div>{{ 'Set 和' }}</div>
                <div>{{ 'Set 败' }}</div>
              </div>
              <div class="tableBox Content">
                <div>{{ recordInfo.ranking }}</div>
                <div>{{ recordInfo.rating }}</div>
                <div>{{ recordInfo.ppd }}</div>
                <div>{{ recordInfo.mpr }}</div>
                <div>{{ recordInfo.winCount }}</div>
                <div>{{ recordInfo.drawCount }}</div>
                <div>{{ recordInfo.loseCount }}</div>
              </div>
            </a-col>
          </a-row>
        </a-row>
      </transition>
    </a-row>
    <div class="pagination">
      <a-pagination v-model:current="currentPage" v-model:pageSize="pageSize" :total="total" @change='pageChange' @showSizeChange="onShowSizeChange" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import {
  SettingFilled,
  DownCircleOutlined,
  UpCircleOutlined,
} from "@ant-design/icons-vue";
import { myMatchInfoHttp, myMatchMoreHttp } from "@/axios/api";
import { useRouter } from 'vue-router';
export default defineComponent({
  name: "myMatchInfo",
  components: {
    SettingFilled,
    DownCircleOutlined,
    UpCircleOutlined,
  },
  setup() {
    const Router = useRouter();
    const userId = sessionStorage.getItem("userId");
    const data: any = reactive({
      colSpan: 5,
      year: 2020,
      currentPage: 1,
      pageSize: 10,
      total: 1,
      yearList: [
        { value: 2020, label: 2020 },
        { value: 2019, label: 2019 },
        { value: 2018, label: 2018 },
      ],
      teamList: [{ flag: false, record: [] }],
      changeFlag: (matchId = 0, index: number) => {
        console.log(matchId);
        // if (matchId) {
        const obj = {
          memberId: Number(userId),
          competitionId: 148,
        };
        myMatchMoreHttp(obj).then((res) => {
          if(res.data.data){
            data.teamList[index].record = res.data.data;
          }
        });
        // }
        data.teamList[index].flag = !data.teamList[index].flag;
      },
      getMatchList: (
        year = data.year,
        currentPage = data.currentPage,
        pageSize = data.pageSize
      ) => {
        // 年份，当前页数，显示页码
        const obj = {
          // memberId: Number(userId),
          memberId: 22703,
          countryId: 617,
          sort: 1,
          date: year,
          pageIndex: currentPage,
          pageSize: pageSize,
        };
        myMatchInfoHttp(obj).then((res) => {
          if (res.data.data) {
            res.data.data.list.forEach((i: any) => {
              i.flag = false;
              i.record = [];
            });
            data.teamList = res.data.data.list;
            data.total = res.data.data.totalCount;
          }
        });
      },
      showInfo:() => {
        Router.push('/')
      },
      yearChange: (value: number) => {
        data.getMatchList(value, undefined, undefined);
      },
      onShowSizeChange: (current: number, size: number) => {
        data.getMatchList(undefined, undefined, size);
      },
      pageChange: (page: number) => {
        data.getMatchList(undefined, page, undefined);
      },
    });
    onMounted(() => {
      data.getMatchList();
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped>
.centerFont {
  font-size: 20px;
  font-weight: bold;
  color: red;
  margin: 5px 0;
}
.imgColStyle {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.matchImg {
  height: 60px;
}
.infoClass {
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}
.teamStyle {
  cursor: pointer;
  font-weight: bold;
}
.teamStyle:hover {
  text-decoration: underline;
}
.placeStyle {
  display: flex;
  justify-content: flex-start;
}
.placeStyle span {
  cursor: pointer;
}
.counyStyle {
  color: #999;
  margin: 0 5px;
}
.vipBox {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.eveyTeam {
  height: 80px;
  margin: 15px 0;
  border: 1px solid #eee;
}
.topBox {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.infoStyle {
  text-align: left;
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
.msgBox {
  margin: 10px 0;
  height: 80px;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
  display: flex;
}
.recordBox {
  padding: 10px;
}
.matchTitle {
  font-size: 20px;
  border-bottom: 1px dashed #000;
}
.title {
  text-align: left;
  color: #999;
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
.teamBox {
  display: flex;
  align-items: center;
}
.Header {
  background: #f1f0ed;
  color: #5a5a5a;
}
.stateClass {
  display: flex;
  justify-content: space-between;
}
.disableFont {
  color: #999;
}
.stateBox {
  border-radius: 10px;
  width: 70px;
}
.I {
  background: red;
  color: #fff;
}
.F {
  background: #d9d9d9;
  color: #797878;
}
.divisiBox {
  border: 1px solid #000;
  padding: 0 5px;
  margin: 4px 5px;
}
</style>
