<template>
  <div>
    <a-row class="rowStyle" id="dots">
      <h1>{{ '新闻' }}</h1>
      <a-carousel :autoplay='true' dotsClass="dots">
        <div class="carouselBox" v-for="item in photoList" :key="item.id" @click="intoPhoto(item.url)"><img :src="item.img" alt=""></div>
      </a-carousel>
    </a-row>
    <a-row class="rowStyle" type="flex" justify="space-between">
      <a-col :span="14">
        <div class="newHeader">
          <div class="newSstyle">{{ '新闻' }}</div>
          <div>{{ `最后更新：${time}` }}</div>
          <div class="moreStyle">{{ 'MORE' }}</div>
        </div>
        <div class="newsTable">
          <div v-for="news in newsList" :key="news.index" class="newBg">
            <div class="newBox">
              <img :src="news.img" alt="">
            </div>
            <div class="newContentStyle">
              <div class="newTitle">111111111111111111111111</div>
              <div class="newContent">222222222222222</div>
              <div class="newIcon">
                <span>
                  <ScheduleOutlined /> {{ news.date }}
                </span>
                <span>
                  <EyeOutlined /> {{ news.count }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </a-col>
      <a-col :span="8">
        <div class="newHeader">
          <div class="newSstyle">{{ 'PROMOTION' }}</div>
        </div>
        <div class="newBox">
          <img :src="img" alt="">
        </div>
        <div class="otherSrcBox">
          <div>
            <QqOutlined />
          </div>
          <div>
            <WechatOutlined />
          </div>
          <div>
            <ZhihuOutlined />
          </div>
          <div>
            <AppleOutlined />
          </div>
        </div>
      </a-col>
    </a-row>

    <divTitle :msg="title" :span="colSpan" :lastDate="getDate()" :showMore="true" />

    <a-row class="bg">
      <a-col :span='8'>
        <a-col :span='3'>
          <AimOutlined style="fontSize:30px" />
        </a-col>
        <a-col :span='4' class="MlineStyle">{{ '当地' }}</a-col>
        <a-col :span='6'>
          <a-select v-model:value="areaId" @change="areaChange">
            <a-select-option v-for="item in areaList" :key="item.key" :value="item.key">{{ item.label }}</a-select-option>
          </a-select>
        </a-col>
        <a-col :span='5'>
          <a-select v-model:value="countryId" @change="cityChange">
            <a-select-option v-for="item in cityList" :key="item.key" :value="item.key">{{ item.label }}</a-select-option>
          </a-select>
        </a-col>
      </a-col>
      
      <a-col :span='8' :offset="8">
        <a-col :span='3'>
          <SearchOutlined style="fontSize:30px" />
        </a-col>
        <a-col :span='6' class="MlineStyle">{{ '比赛名称' }}</a-col>
        <a-col :span='15'>
          <a-input-search v-model:value="leagueName" enter-button="Search" @search="onSearch" />
        </a-col>
      </a-col>
    </a-row>

    <a-row v-for="item in matchList" :key="item.matchId" class="matchBox">
      <a-col :span='14'>
        <div>
          <a-col :span='5'>
            <img class="matchImg" :src="item.img">
          </a-col>
          <a-col :span='10'>
            <div @click="showLeagueInfo(item.leagueId)" class="divBg">
              <div>{{ item.title }}</div>
              <div class="divisionBox">
                <div v-for="div in item.division" :key="div.index" class="divsision">{{ div.divName }}</div>
              </div>
            </div>
          </a-col>
        </div>
      </a-col>
      <a-col :span='2'>
        <div class="fontDisplay">{{ '当地' }}</div>
        <div>{{ item.area }}</div>
      </a-col>
      <a-col :span='8'>
        <div class="rightStyle">
          <div class="fontDisplay">{{ '比赛期间' }}</div>
          <div class="matchState I" v-if="item.state === 1">{{ '比赛中' }}</div>
          <div class="matchState R" v-if="item.state === 2">{{ '比赛结束' }}</div>
          <div class="matchState F" v-if="item.state === 3">{{ '比赛结束' }}</div>
        </div>
        <div>{{ $filters.filterDate(item.endPeriod) }}</div>
      </a-col>
    </a-row>

    <divTitle :msg="matchTitle" :span="colSpan" :lastDate="getDate()" :showMore="true" />

    <a-row class="rowStyle">
      <a-tabs class="tabsBox" type='card'>
        <a-tab-pane key="1" tab="队伍" class="teamBG">
          <a-col :span="7" class="colStyle" v-for="every in teamList" :key="every.index">
            <div class="gameStyle">{{ every.title }}</div>
            <div v-for="item in every.children" :key="item.id" class="teamBox">
              <div :class="{first:item.id === 1,noFirst:item.id !== 1}">
                <div class="teamImgBox">
                  <img :src="item.img" alt="">
                </div>
                <div v-if="item.id === 1" class="detailStyle">
                  <div class="teamName" @click="goToPage">{{ item.teamName }}</div>
                  <div class="name">{{ item.name }}</div>
                  <div class="area">{{ item.area }}
                    <span @click="showDetail(item)">
                      <EnvironmentOutlined />
                    </span>
                  </div>
                  <div class="current">{{ every.type }}</div>
                  <div class="number">{{ item.number }}</div>
                </div>
                <div v-else class="detailStyle">
                  <div class="name smallBox" @click="goToPage">{{ item.teamName }}</div>
                  <div class="area">{{ item.area }}
                    <span @click="showDetail(item)">
                      <EnvironmentOutlined />
                    </span>
                  </div>
                  <div class="current">
                    <span>{{ item.type }}</span> <span>{{ item.number }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="more">
              <div>MORE+</div>
            </div>
          </a-col>
        </a-tab-pane>
        <a-tab-pane key="2" tab="玩家" class="teamBG">
          <a-col :span="7" class="colStyle" v-for="every in playerList" :key="every.index">
            <div class="gameStyle">{{ every.title }}</div>
            <div v-for="item in every.children" :key="item.id" class="teamBox">
              <div :class="{first:item.ppd,noFirst:!item.ppd}">
                <div class="teamImgBox">
                  <img :src="item.img" alt="">
                </div>
                <div v-if="item.ppd" class="detailStyle">
                  <div class="teamName" @click="goToPage">{{ item.teamName }}</div>
                  <div class="name">{{ item.name }}</div>
                  <div class="area">{{ item.area }}
                    <span @click="showDetail(item)">
                      <EnvironmentOutlined />
                    </span>
                  </div>
                  <div class="current">{{ item.type }}</div>
                  <div class="number">{{ item.number }}</div>
                </div>
                <div v-else class="detailStyle">
                  <div class="name smallBox" @click="goToPage">{{ item.name }}</div>
                  <div class="area">{{ item.area }}
                    <span @click="showDetail(item)">
                      <EnvironmentOutlined />
                    </span>
                  </div>
                  <div class="current">
                    <span>{{ item.type }}</span> <span>{{ item.number }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="more">
              <div>MORE+</div>
            </div>
          </a-col>
        </a-tab-pane>
      </a-tabs>
    </a-row>
    <a-modal v-model:visible="visible" :title="dialogObj.title">
      <template v-slot:footer>
        <a-row class="rowStyle dialogBox">
          <a-col :span='8'>
            <div class="imgBox">
              <img :src="dialogObj.img" alt="">
            </div>
          </a-col>
          <a-col :span='16' class="dialog">
            <div>{{ `Shop name：${dialogObj.shopName}` }}</div>
            <div>{{ `电话号码：${dialogObj.phone}` }}</div>
            <div>{{ `地址：${dialogObj.address}` }}</div>
          </a-col>
        </a-row>
        <div class="dialogBtn">
          <a-button type="primary" @click="handleOk">{{ '更多' }}</a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import {
  AimOutlined,
  SearchOutlined,
  EyeOutlined,
  ScheduleOutlined,
  EnvironmentOutlined,
  QqOutlined,
  WechatOutlined,
  ZhihuOutlined,
  AppleOutlined,
} from "@ant-design/icons-vue";
import divTitle from "@/components/DividingLine.vue";
import router from "@/router";
import { leagueListHttp }  from '@/axios/api'
interface DataProps {
  click: () => void;
}
export default defineComponent({
  components: {
    AimOutlined,
    SearchOutlined,
    EyeOutlined,
    ScheduleOutlined,
    divTitle,
    EnvironmentOutlined,
    QqOutlined,
    WechatOutlined,
    ZhihuOutlined,
    AppleOutlined,
  },
  name: "index",
  setup() {
    const data = reactive({
      img: require("@/assets/logo.jpg"),
      currentLan: "中文",
      leagueName: "",
      title: "比赛",
      matchTitle: "排名",
      lastDate: new Date(),
      time: "2020-5-41",
      colSpan: 4,
      visible: false,
      dialogObj: {
        title: "",
        img: require("@/assets/3.jpg"),
        shopName: "",
        phone: "",
        address: "",
      },
      areaId: 1,
      countryId: 1,
      newsList: [
        {
          id: 1,
          img: require("@/assets/23.jpg"),
          date: "2010-82-51",
          count: 2054,
        },
        {
          id: 1,
          img: require("@/assets/23.jpg"),
          date: "2010-82-51",
          count: 2054,
        },
      ],
      areaList: [
        { key: 1, label: "湖北省" },
        { key: 2, label: "广东省" },
        { key: 3, label: "云南省" },
      ],
      cityList: [
        { key: 1, label: "武汉" },
        { key: 2, label: "深圳" },
        { key: 3, label: "南京" },
      ],
      photoList: [
        { id: 1, img: 1, url: "/a" },
        { id: 2, img: 2, url: "/a" },
        { id: 3, img: 3, url: "/a" },
      ],
      matchList: [],
      teamList: [
        {
          id: 1,
          title: "01 Game",
          type: "PPD",
          children: [
            {
              id: 1,
              img: require("@/assets/1.jpg"),
              teamName: "2020第一次比赛",
              name: "张自然",
              area: "0981-广州",
              number: "25.94",
              shopName:'asdsadasd',
              phoneNumber:'123456',
              address:'123213213213',
              first: true,
            },
            {
              id: 2,
              img: require("@/assets/1.jpg"),
              teamName: "2020第一次比赛",
              name: "张自然",
              area: "0981-广州",
              number: "25.94",
              shopName:'asdsadasd',
              phoneNumber:'123456',
              address:'123213213213',
              first: false,
            },
            {
              id: 3,
              img: require("@/assets/1.jpg"),
              teamName: "2020第一次比赛",
              name: "张自然",
              area: "0981-广州",
              current: "PPD",
              number: "25.94",
              first: false,
            },
            {
              id: 4,
              img: require("@/assets/1.jpg"),
              teamName: "2020第一次比赛",
              name: "张自然",
              area: "0981-广州",
              current: "PPD",
              number: "25.94",
              first: false,
            },
            {
              id: 5,
              title: "01 Game",
              img: require("@/assets/1.jpg"),
              teamName: "2020第一次比赛",
              name: "张自然",
              area: "0981-广州",
              current: "PPD",
              number: "25.94",
              first: false,
            },
          ],
        },
        {
          id: 2,
          title: "Cricket",
          type: "MPR",
          children: [
            {
              id: 1,
              img: require("@/assets/1.jpg"),
              teamName: "2020第一次比赛",
              name: "张自然",
              area: "0981-广州",
              number: "25.94",
              shopName:'asdsadasd',
              phoneNumber:'123456',
              address:'123213213213',
              first: true,
            },
            {
              id: 2,
              img: require("@/assets/1.jpg"),
              teamName: "2020第一次比赛",
              name: "张自然",
              area: "0981-广州",
              number: "25.94",
              shopName:'asdsadasd',
              phoneNumber:'123456',
              address:'123213213213',
              first: false,
            },
            {
              id: 3,
              img: require("@/assets/1.jpg"),
              teamName: "2020第一次比赛",
              name: "张自然",
              area: "0981-广州",
              current: "PPD",
              number: "25.94",
              ppd: false,
            },
            {
              id: 4,
              img: require("@/assets/1.jpg"),
              teamName: "2020第一次比赛",
              name: "张自然",
              area: "0981-广州",
              current: "PPD",
              number: "25.94",
              ppd: false,
            },
            {
              id: 5,
              title: "01 Game",
              img: require("@/assets/1.jpg"),
              teamName: "2020第一次比赛",
              name: "张自然",
              area: "0981-广州",
              current: "PPD",
              number: "25.94",
              ppd: false,
            },
          ],
        },
        {
          id: 3,
          title: "对战获胜数",
          type: "WIN",
          children: [
            {
              id: 1,
              img: require("@/assets/1.jpg"),
              teamName: "2020第一次比赛",
              name: "张自然",
              area: "0981-广州",
              number: "25.94",
              shopName:'asdsadasd',
              phoneNumber:'123456',
              address:'123213213213',
              ppd: true,
            },
            {
              id: 2,
              img: require("@/assets/1.jpg"),
              teamName: "2020第一次比赛",
              name: "张自然",
              area: "0981-广州",
              current: "PPD",
              number: "25.94",
              ppd: false,
            },
            {
              id: 3,
              img: require("@/assets/1.jpg"),
              teamName: "2020第一次比赛",
              name: "张自然",
              area: "0981-广州",
              current: "PPD",
              number: "25.94",
              ppd: false,
            },
            {
              id: 4,
              img: require("@/assets/1.jpg"),
              teamName: "2020第一次比赛",
              name: "张自然",
              area: "0981-广州",
              current: "PPD",
              number: "25.94",
              ppd: false,
            },
            {
              id: 5,
              title: "01 Game",
              img: require("@/assets/1.jpg"),
              teamName: "2020第一次比赛",
              name: "张自然",
              area: "0981-广州",
              current: "PPD",
              number: "25.94",
              ppd: false,
            },
          ],
        },
      ],
      playerList: [
        {
          id: 1,
          title: "01 Game",
          children: [
            {
              id: 1,
              img: require("@/assets/1.jpg"),
              teamName: "2020第一次比赛",
              name: "张自然",
              area: "0981-广州",
              current: "PPD",
              number: "25.94",
              ppd: true,
            },
            {
              id: 1,
              img: require("@/assets/1.jpg"),
              teamName: "2020第一次比赛",
              name: "张自然",
              area: "0981-广州",
              current: "PPD",
              number: "25.94",
              ppd: false,
            },
            {
              id: 1,
              img: require("@/assets/1.jpg"),
              teamName: "2020第一次比赛",
              name: "张自然",
              area: "0981-广州",
              current: "PPD",
              number: "25.94",
              ppd: false,
            },
            {
              id: 1,
              img: require("@/assets/1.jpg"),
              teamName: "2020第一次比赛",
              name: "张自然",
              area: "0981-广州",
              current: "PPD",
              number: "25.94",
              ppd: false,
            },
            {
              id: 1,
              title: "01 Game",
              img: require("@/assets/1.jpg"),
              teamName: "2020第一次比赛",
              name: "张自然",
              area: "0981-广州",
              current: "PPD",
              number: "25.94",
              ppd: false,
            },
          ],
        },
        {
          id: 1,
          title: "Cricket",
          children: [
            {
              id: 1,
              img: require("@/assets/1.jpg"),
              teamName: "2020第一次比赛",
              name: "张自然",
              area: "0981-广州",
              current: "PPD",
              number: "25.94",
              ppd: true,
            },
            {
              id: 1,
              img: require("@/assets/1.jpg"),
              teamName: "2020第一次比赛",
              name: "张自然",
              area: "0981-广州",
              current: "PPD",
              number: "25.94",
              ppd: false,
            },
            {
              id: 1,
              img: require("@/assets/1.jpg"),
              teamName: "2020第一次比赛",
              name: "张自然",
              area: "0981-广州",
              current: "PPD",
              number: "25.94",
              ppd: false,
            },
            {
              id: 1,
              img: require("@/assets/1.jpg"),
              teamName: "2020第一次比赛",
              name: "张自然",
              area: "0981-广州",
              current: "PPD",
              number: "25.94",
              ppd: false,
            },
            {
              id: 1,
              title: "01 Game",
              img: require("@/assets/1.jpg"),
              teamName: "2020第一次比赛",
              name: "张自然",
              area: "0981-广州",
              current: "PPD",
              number: "25.94",
              ppd: false,
            },
          ],
        },
        {
          id: 1,
          title: "设置获胜次数",
          children: [
            {
              id: 1,
              img: require("@/assets/1.jpg"),
              teamName: "2020第一次比赛",
              name: "张自然",
              area: "0981-广州",
              current: "PPD",
              number: "25.94",
              ppd: true,
            },
            {
              id: 1,
              img: require("@/assets/1.jpg"),
              teamName: "2020第一次比赛",
              name: "张自然",
              area: "0981-广州",
              current: "PPD",
              number: "25.94",
              ppd: false,
            },
            {
              id: 1,
              img: require("@/assets/1.jpg"),
              teamName: "2020第一次比赛",
              name: "张自然",
              area: "0981-广州",
              current: "PPD",
              number: "25.94",
              ppd: false,
            },
            {
              id: 1,
              img: require("@/assets/1.jpg"),
              teamName: "2020第一次比赛",
              name: "张自然",
              area: "0981-广州",
              current: "PPD",
              number: "25.94",
              ppd: false,
            },
            {
              id: 1,
              title: "01 Game",
              img: require("@/assets/1.jpg"),
              teamName: "2020第一次比赛",
              name: "张自然",
              area: "0981-广州",
              current: "PPD",
              number: "25.94",
              ppd: false,
            },
          ],
        },
      ],
      getDate: () => {
        const year = new Date().getFullYear();
        const month = new Date().getMonth() + 1;
        const day = new Date().getDay();
        const hous = new Date().getHours();
        const minutes = new Date().getMinutes();
        const seconds = new Date().getSeconds();
        return `${year}-${month}-${day} ${hous}:${minutes}:${seconds}`;
      },
      countryChange: (value: number) => {
        console.log(value);
      },
      onSearch: () => {
        const obj = {
          areaId:data.areaId,
          countryId:data.areaId,
          leagueName:data.leagueName
        }
        leagueListHttp(false,obj).then(res =>{
          data.matchList = res.data.data
        })
      },
      intoPhoto: (value: string) => {
        console.log(value);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      showDetail: (item: any) => {
        data.dialogObj.title = item.area;
        data.dialogObj.shopName = item.shopName;
        data.dialogObj.phone = item.phoneNumber;
        data.dialogObj.address = item.address;
        data.visible = true;
      },
      handleOk: () => {
        data.visible = false;
      },
      goToPage: () => {
        router.push("/teamInfo");
      },
      showLeagueInfo: (id: number) => {
        router.push({
          path: "/calendar",
          query: { id },
        });
      },
      areaChange: (value: number) => {
        console.log(value);
      },
      cityChange: (value: number) => {
        console.log(value);
      },
    });
    onMounted(() => {
      data.onSearch()
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>
<style scoped>
.SlineStyle {
  line-height: 24px;
  height: 24px;
}
.MlineStyle {
  line-height: 32px;
  height: 32px;
}
.carouselBox {
  height: 315px;
}
.carouselBox img {
  height: 100%;
}
.newBg {
  padding: 10px;
}
.newBox {
  height: 250px;
  width: 100%;
}
.newBox img {
  height: 100%;
  width: 100%;
}
.bg {
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  height: 55px;
  background: #f3f3f3;
  display: flex;
  align-items: center;
  margin: 10px;
}
.dropBox {
  width: 100%;
}
.matchImg {
  height: 40px;
}
.matchBox {
  height: 80px;
  border: 1px solid #d4d4d4;
  margin: 10px;
  display: flex;
  align-items: center;
}
.rightStyle {
  display: flex;
  justify-content: space-around;
}
.fontDisplay {
  color: #999;
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
.first .teamImgBox {
  height: 100px;
}
.noFirst .teamImgBox {
  height: 60px;
}
.teamImgBox img {
  height: 100%;
}
.first {
  height: 150px;
  display: flex;
  justify-content: space-around;
}
.first .detailStyle {
  text-align: left;
}
.first .teamName {
  font-size: 20px;
}
.first .name {
  font-weight: bold;
}
.first .current {
  width: 60px;
  text-align: center;
  font-weight: bold;
  color: #fff;
  background: #000;
  border-radius: 10px;
}
.first .number {
  font-size: 25px;
  color: red;
  font-weight: bold;
}
.colStyle {
  border: 1px solid #999;
}
.gameStyle {
  height: 30px;
  line-height: 30px;
  font-size: 20px;
  background: #000;
  color: #fff;
}
.noFirst {
  display: flex;
  height: 60px;
  padding-left: 25px;
}
.noFirst .current {
  color: red;
}
.noFirst .detailStyle {
  margin-left: 20px;
  text-align: left;
}
.teamBox {
  background: #eee;
  margin: 5px 0;
  padding: 5px;
  box-sizing: border-box;
}
.area span {
  cursor: pointer;
}
.more {
  height: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.more div {
  width: 60px;
  height: 22px;
  border: 1px solid #000;
}
.teamBG {
  display: flex;
  justify-content: space-around;
}
.tabsBox >>> .ant-tabs-nav-scroll {
  display: flex;
}
#dots >>> .dots li {
  background: red;
}
.newContentStyle {
  text-align: left;
  margin: 5px 0;
}
.newTitle {
  font-size: 25px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dialogBtn {
  text-align: center;
}
.dialogBox {
  height: 100px;
  color: #ff3202;
  border: 1px solid #eee;
}
.dialog {
  text-align: left;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.info {
  width: 220px;
  text-align: left;
}
.imgBox {
  height: 100px;
  width: 100px;
  margin: 0 auto;
}
.imgBox img {
  width: 100%;
  height: 100%;
}
.teamName,
.smallBox {
  cursor: pointer;
}
.teamName:hover,
.smallBox:hover {
  text-decoration: underline;
}
.newHeader {
  display: flex;
  height: 40px;
  line-height: 40px;
  color: #fff;
  background: #2b2b2b;
  margin: 15px 0;
  font-size: 20px;
  font-weight: bold;
  justify-content: space-between;
}
.newSstyle {
  background: red;
  width: 150px;
}
.moreStyle {
  width: 150px;
  cursor: pointer;
}
.moreStyle:hover {
  color: #1890ff;
}
.newsTable {
  display: flex;
  justify-content: space-around;
}
.newIcon {
  display: flex;
  justify-content: space-around;
}
.otherSrcBox {
  display: flex;
  justify-content: space-around;
}
.otherSrcBox div {
  width: 80px;
  height: 80px;
  font-size: 50px;
  cursor: pointer;
}
.divisionBox{
  display: flex;
}
.divsision{
  border: 1px solid #000;
  padding: 0 2px;
  margin: 0 4px;
  text-decoration: underline;
}
.divBg{
  cursor: pointer;
  text-align: left;
}
</style>
