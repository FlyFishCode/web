<template>
  <div>
    <a-row class="rowStyle" id="dots">
      <h1>{{ $t('default.12') }}</h1>
      <a-carousel arrows :autoplay='true' dotsClass="dots">
        <template #prevArrow>
          <div class="custom-slick-arrow" style="left: 10px;zIndex: 1">
            <LeftCircleOutlined />
          </div>
        </template>
        <template #nextArrow>
          <div class="custom-slick-arrow" style="right: 10px">
            <RightCircleOutlined />
          </div>
        </template>
        <div v-for="item in photoList" :key="item.id" @click="intoPhoto(item.url)"><img :src="item.img" alt=""></div>
      </a-carousel>
    </a-row>
    <a-row class="rowStyle" type="flex" justify="space-between">
      <a-col :span="14">
        <div class="newHeader">
          <div class="newSstyle">{{ $t('default.12') }}</div>
          <div>{{ `${$t('default.19')}：${time}` }}</div>
          <div class="moreStyle">{{ $t('default.25') }}</div>
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
          <div class="moreStyle" @click="infoNews">{{ $t('default.25') }}</div>
        </div>
        <div class="newBox">
          <a-carousel arrows :autoplay='true' dotsClass="dots">
            <template #prevArrow>
              <div class="custom-slick-arrow" style="left: 10px;zIndex: 1">
                <LeftCircleOutlined />
              </div>
            </template>
            <template #nextArrow>
              <div class="custom-slick-arrow" style="right: 10px">
                <RightCircleOutlined />
              </div>
            </template>
            <div v-for="item in photoList" :key="item.id" @click="intoPhoto(item.url)"><img :src="item.img"></div>
          </a-carousel>
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
        <a-col :span='4' class="MlineStyle">{{ $t('default.27') }}</a-col>
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
        <a-col :span='6' class="MlineStyle">{{ $t('default.15') }}</a-col>
        <a-col :span='15'>
          <a-input-search v-model:value="leagueName" :enter-button="$t('default.16')" @search="onSearch" />
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
        <div class="fontDisplay">{{ $t('default.27') }}</div>
        <div>{{ item.area }}</div>
      </a-col>
      <a-col :span='8'>
        <div class="rightStyle">
          <div class="fontDisplay">{{ $t('default.17') }}</div>
          <div class="matchState I" v-if="item.state === 1">{{ $t('default.104') }}</div>
          <div class="matchState R" v-if="item.state === 2">{{ $t('default.105') }}</div>
          <div class="matchState F" v-if="item.state === 3">{{ '比赛结束' }}</div>
        </div>
        <div>{{ $filters.filterDate(item.endPeriod) }}</div>
      </a-col>
    </a-row>

    <divTitle :msg="matchTitle" :span="colSpan" :lastDate="getDate()" :showMore="true" />

    <a-row class="rowStyle">
      <a-tabs class="tabsBox" type='card'>
        <a-tab-pane key="1" :tab="$t('default.9')" class="teamBG">
          <a-col :span="7" class="colStyle" v-for="every in teamList" :key="every.index">
            <div class="gameStyle">{{ every.title }}</div>
            <div v-for="(item,index) in every.list" :key="index" class="teamBox">
              <div :class="{first:!index,noFirst:index}">
                <div class="teamImgBox">
                  <img :src="item.teamImg" alt="">
                </div>
                <div v-if="!index" class="detailStyle">
                  <div class="teamName" @click="goToPage">{{ item.teamName }}</div>
                  <div class="name">{{ item.captainName }}</div>
                  <div class="area">{{ item.shopAddress }}
                    <span @click="showDetail(item)">
                      <EnvironmentOutlined />
                    </span>
                  </div>
                  <div class="current">{{ every.type }}</div>
                  <div class="number">{{ item.teamScore }}</div>
                </div>
                <div v-else class="detailStyle">
                  <div class="name smallBox" @click="goToPage">{{ item.teamName }}</div>
                  <div class="area">{{ item.shopAddress }}
                    <span @click="showDetail(item)">
                      <EnvironmentOutlined />
                    </span>
                  </div>
                  <div class="current">
                    <span>{{ every.type }}</span> <span>{{ item.teamScore }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="more">
              <div>{{ `${$t('default.25')} +` }}</div>
            </div>
          </a-col>
        </a-tab-pane>
        <a-tab-pane key="2" :tab="$t('default.10')" class="teamBG">
          <a-col :span="7" class="colStyle" v-for="every in playerList" :key="every.index">
            <div class="gameStyle">{{ every.title }}</div>
            <div v-for="(item,index) in every.list" :key="index" class="teamBox">
              <div :class="{first:!index,noFirst:index}">
                <div class="teamImgBox">
                  <img :src="item.playerImg" alt="">
                </div>
                <div v-if="!index" class="detailStyle">
                  <div class="teamName" @click="goToPage">{{ item.playerName }}</div>
                  <div class="name">{{ item.name }}</div>
                  <div class="area">{{ item.shopAddress }}
                    <span @click="showDetail(item)">
                      <EnvironmentOutlined />
                    </span>
                  </div>
                  <div class="current">{{ every.type }}</div>
                  <div class="number">{{ item.playerScore }}</div>
                </div>
                <div v-else class="detailStyle">
                  <div class="name smallBox" @click="goToPage">{{ item.playerName }}</div>
                  <div class="area">{{ item.shopAddress }}
                    <span @click="showDetail(item)">
                      <EnvironmentOutlined />
                    </span>
                  </div>
                  <div class="current">
                    <span>{{ every.type }}</span> <span>{{ item.playerScore }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="more">
              <div>{{ `${$t('default.25')} +` }}</div>
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
            <div>{{ `${$t('default.28')}：${dialogObj.shopName}` }}</div>
            <div>{{ `${$t('default.89')}：${dialogObj.phone}` }}</div>
            <div>{{ `${$t('default.125')}：${dialogObj.address}` }}</div>
          </a-col>
        </a-row>
        <div class="dialogBtn">
          <a-button type="primary" @click="handleOk">{{ $t('default.25') }}</a-button>
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
  LeftCircleOutlined,
  RightCircleOutlined,
} from "@ant-design/icons-vue";
import divTitle from "@/components/DividingLine.vue";
import { indexTeamHttp, indexPlayerHttp } from "@/axios/api";
import { useRouter } from "vue-router";
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
    LeftCircleOutlined,
    RightCircleOutlined,
  },
  name: "index",
  setup() {
    const Router = useRouter();
    const data = reactive({
      img: require("@/assets/logo.jpg"),
      leagueName: "",
      title: "default.134",
      matchTitle: "default.18",
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
        { id: 1, img: require("@/assets/23.jpg"), url: "/a" },
        { id: 2, img: require("@/assets/23.jpg"), url: "/a" },
        { id: 3, img: require("@/assets/23.jpg"), url: "/a" },
      ],
      matchList: [],
      teamList: [],
      playerList: [],
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
        // const obj = {
        //   areaId: data.areaId,
        //   countryId: data.areaId,
        //   leagueName: data.leagueName,
        // };
        // leagueListHttp(false, obj).then((res) => {
        //   data.matchList = res.data.data;
        // });
      },
      infoNews: () => {
        Router.push("/news");
      },
      intoPhoto: (value: string) => {
        console.log(value);
      },
      showDetail: (item: any) => {
        data.dialogObj.title = item.shopAddress;
        data.dialogObj.shopName = item.shopName;
        data.dialogObj.phone = item.shopPhone;
        data.dialogObj.address = item.shopAddress;
        data.visible = true;
      },
      handleOk: () => {
        data.visible = false;
      },
      goToPage: () => {
        Router.push("/teamInfo");
      },
      showLeagueInfo: (id: number) => {
        Router.push({
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
    // 不需要页面点击触发，不写在reactive内
    const getTeamList = () => {
      // const obj = {
      //   areaId: data.areaId,
      //   countryId: data.areaId,
      // };
      indexTeamHttp().then((res) => {
        data.teamList = res.data.data;
      });
    };
    const getPlayerList = () => {
      // const obj = {
      //   areaId: data.areaId,
      //   countryId: data.areaId,
      // };
      indexPlayerHttp().then((res) => {
        data.playerList = res.data.data;
      });
    };
    onMounted(() => {
      data.onSearch();
      getTeamList();
      getPlayerList();
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
.newBg {
  padding: 0 1px;
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
  margin: 0 5px;
  cursor: pointer;
}
.more div:hover{
  opacity: 0.5;
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
  background: #eee;
  border-radius: 10px;
  margin-top: 5px;
}
.divisionBox {
  display: flex;
  height: 25px;
  line-height: 25px;
  border: 1px solid #000;
  margin-right: 3px;
}
.divsision {
  border: 1px solid #000;
  padding: 0 2px;
  margin: 0 4px;
  text-decoration: underline;
}
.divBg {
  cursor: pointer;
  text-align: left;
}
.ant-carousel ::v-deep(.slick-slide) {
  text-align: center;
  height: 250px;
  line-height: 250px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel ::v-deep(.slick-arrow.custom-slick-arrow) {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
}
.ant-carousel ::v-deep(.custom-slick-arrow:before) {
  display: none;
}
.ant-carousel ::v-deep(.custom-slick-arrow:hover) {
  opacity: 0.5;
}

.ant-carousel ::v-deep(.slick-slide h3) {
  color: #fff;
}
</style>
