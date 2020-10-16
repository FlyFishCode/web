<template>
  <div>
    <a-row class="rowStyle" id="dots">
      <a-carousel :autoplay='true' dotsClass="dots">
        <div class="carouselBox" v-for="item in photoList" :key="item.id" @click="intoPhoto(item.url)"><img :src="item.img" alt=""></div>
      </a-carousel>
    </a-row>
    <a-row class="rowStyle" type="flex" justify="space-between">
      <a-col :span="7">
        <div class="newBox">
          <img :src="img" alt="">
        </div>
        <div class="newContentStyle">
          <div class="newTitle">111111111111111111111111</div>
          <div class="newContent">222222222222222</div>
          <div class="newIcon">
            <span style="margin:0 10px">
              <EyeOutlined /> {{ 20 }}
            </span>
            <span>
              <ScheduleOutlined /> {{ 20 }}
            </span>
          </div>
        </div>
      </a-col>
      <a-col :span="7">
        <div class="newBox">
          <img :src="img" alt="">
        </div>
        <div class="newContentStyle">
          <div class="newTitle">111111111111111111111111</div>
          <div class="newContent">222222222222222</div>
          <div class="newIcon">
            <span style="margin:0 10px">
              <EyeOutlined /> {{ 20 }}
            </span>
            <span>
              <ScheduleOutlined /> {{ 20 }}
            </span>
          </div>
        </div>
      </a-col>
      <a-col :span="7">
        <div class="newBox">
          <img :src="img" alt="">
        </div>
        <div class="newContentStyle">
          <div class="newTitle">111111111111111111111111</div>
          <div class="newContent">222222222222222</div>
          <div class="newIcon">
            <span style="margin:0 10px">
              <EyeOutlined /> {{ 20 }}
            </span>
            <span>
              <ScheduleOutlined /> {{ 20 }}
            </span>
          </div>
        </div>
      </a-col>
    </a-row>

    <divTitle :msg="title" :lastDate="getDate()" />

    <a-row class="bg">
      <a-col :span='8'>
        <a-col :span='3'>
          <BankFilled style="fontSize:30px" />
        </a-col>
        <a-col :span='6' class="MlineStyle">{{ '当地' }}</a-col>
        <a-col :span='10'>
          <a-dropdown class="dropBox">
            <template v-slot:overlay>
              <a-menu>
                <a-menu-item v-for="item in language" @click="languageChange(item.value)" :key="item.key">{{ item.value }}</a-menu-item>
              </a-menu>
            </template>
            <a-button size='default'>{{ '所有' }}
              <DownOutlined />
            </a-button>
          </a-dropdown>
        </a-col>
      </a-col>
      <a-col :span='8' :offset="8">
        <a-col :span='3'>
          <SearchOutlined style="fontSize:30px" />
        </a-col>
        <a-col :span='6' class="MlineStyle">{{ '比赛名称' }}</a-col>
        <a-col :span='15'>
          <a-input-search v-model:value="imputValue" enter-button="Search" @search="onSearch" />
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
            <div @click="showMore(item.state)" style="cursor:pointer">
              <div>{{ item.title }}</div>
              <div>{{ item.tip }}</div>
            </div>
          </a-col>
        </div>
      </a-col>
      <a-col :span='2'>
        <div class="fontDisplay">{{ '当前' }}</div>
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

    <divTitle :msg="matchTitle" :lastDate="getDate()" />

    <a-row class="rowStyle">
      <a-tabs class="tabsBox" type='card'>
        <a-tab-pane key="1" tab="队伍" class="teamBG">
          <a-col :span="7" class="colStyle">
            <div class="gameStyle">01米老鼠</div>
            <div v-for="item in teamList" :key="item.id" class="teamBox">
              <div :class="{first:item.ppd,noFirst:!item.ppd}">
                <div class="teamImgBox">
                  <img :src="item.img" alt="">
                </div>
                <div v-if="item.ppd" class="detailStyle">
                  <div class="teamName">{{ item.teamName }}</div>
                  <div class="name">{{ item.name }}</div>
                  <div class="area">{{ item.area }}
                    <span @click="showDetail">
                      <InfoCircleFilled />
                    </span>
                  </div>
                  <div class="current">{{ item.current }}</div>
                  <div class="number">{{ item.number }}</div>
                </div>
                <div v-else class="detailStyle">
                  <div class="name">{{ item.name }}</div>
                  <div class="area">{{ item.area }}
                    <span @click="showDetail">
                      <InfoCircleFilled />
                    </span>
                  </div>
                  <div class="current">
                    <span>{{ item.current }}</span> <span>{{ item.number }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="more">
              <div>MORE+</div>
            </div>
          </a-col>

          <a-col :span="7" class="colStyle">
            <div class="gameStyle">01米老鼠</div>
            <div v-for="item in teamList" :key="item.id" class="teamBox">
              <div :class="{first:item.ppd,noFirst:!item.ppd}">
                <div class="teamImgBox">
                  <img :src="item.img" alt="">
                </div>
                <div v-if="item.ppd" class="detailStyle">
                  <div class="teamName">{{ item.teamName }}</div>
                  <div class="name">{{ item.name }}</div>
                  <div class="area">{{ item.area }}
                    <span @click="showDetail">
                      <InfoCircleFilled />
                    </span>
                  </div>
                  <div class="current">{{ item.current }}</div>
                  <div class="number">{{ item.number }}</div>
                </div>
                <div v-else class="detailStyle">
                  <div class="name">{{ item.name }}</div>
                  <div class="area">{{ item.area }}
                    <span @click="showDetail">
                      <InfoCircleFilled />
                    </span>
                  </div>
                  <div class="current">
                    <span>{{ item.current }}</span> <span>{{ item.number }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="more">
              <div>MORE+</div>
            </div>
          </a-col>

          <a-col :span="7" class="colStyle">
            <div class="gameStyle">01米老鼠</div>
            <div v-for="item in teamList" :key="item.id" class="teamBox">
              <div :class="{first:item.ppd,noFirst:!item.ppd}">
                <div class="teamImgBox">
                  <img :src="item.img" alt="">
                </div>
                <div v-if="item.ppd" class="detailStyle">
                  <div class="teamName">{{ item.teamName }}</div>
                  <div class="name">{{ item.name }}</div>
                  <div class="area">{{ item.area }}
                    <span @click="showDetail">
                      <InfoCircleFilled />
                    </span>
                  </div>
                  <div class="current">{{ item.current }}</div>
                  <div class="number">{{ item.number }}</div>
                </div>
                <div v-else class="detailStyle">
                  <div class="name">{{ item.name }}</div>
                  <div class="area">{{ item.area }}
                    <span @click="showDetail">
                      <InfoCircleFilled />
                    </span>
                  </div>
                  <div class="current">
                    <span>{{ item.current }}</span> <span>{{ item.number }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="more">
              <div>MORE+</div>
            </div>
          </a-col>

        </a-tab-pane>
        <a-tab-pane key="2" tab="玩家">
          Content of Tab Pane 2
        </a-tab-pane>
      </a-tabs>
    </a-row>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import {
  DownOutlined,
  BankFilled,
  SearchOutlined,
  InfoCircleFilled,
  EyeOutlined,
  ScheduleOutlined,
} from "@ant-design/icons-vue";
import divTitle from "@/components/DividingLine.vue";
import router from "@/router";
interface DataProps {
  click: () => void;
}
export default defineComponent({
  components: {
    DownOutlined,
    BankFilled,
    SearchOutlined,
    InfoCircleFilled,
    EyeOutlined,
    ScheduleOutlined,
    divTitle,
  },
  name: "index",
  setup() {
    const data = reactive({
      img: require("@/assets/logo.jpg"),
      currentLan: "中文",
      imputValue: "",
      title: "比赛",
      matchTitle: "排名",
      lastDate: new Date(),
      photoList: [
        { id: 1, img: 1, url: "/a" },
        { id: 2, img: 2, url: "/a" },
        { id: 3, img: 3, url: "/a" },
      ],
      matchList: [
        {
          matchId: 1,
          img: require("@/assets/1.jpg"),
          title: "2020第一次比赛",
          tip: "U-LEAGUE 苏州赛区季后赛",
          area: "上海",
          date: "2020-9-10",
          state: 1,
        },
        {
          matchId: 1,
          img: require("@/assets/1.jpg"),
          title: "2021第二次比赛",
          tip: "U-LEAGUE 广州赛区季后赛",
          area: "武汉",
          date: "2020-9-10",
          state: 2,
        },
        {
          matchId: 1,
          img: require("@/assets/1.jpg"),
          title: "2022第三次比赛",
          tip: "U-LEAGUE 兰州赛区季后赛",
          area: "云南",
          date: "2020-9-10",
          state: 3,
        },
      ],
      teamList: [
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
          id: 2,
          img: require("@/assets/1.jpg"),
          teamName: "2021第二次比赛",
          name: "李逍遥",
          area: "0-08武汉",
          current: "MPR",
          number: "215.04",
          ppd: false,
        },
        {
          id: 3,
          img: require("@/assets/1.jpg"),
          teamName: "2022第三次比赛",
          name: "王富贵",
          area: "7192-2青岛",
          current: "WIN",
          number: "5.40",
          ppd: false,
        },
        {
          id: 4,
          img: require("@/assets/1.jpg"),
          teamName: "2022第三次比赛",
          name: "王富贵",
          area: "7192-2青岛",
          current: "WIN",
          number: "5.40",
          ppd: false,
        },
        {
          id: 5,
          img: require("@/assets/1.jpg"),
          teamName: "2022第三次比赛",
          name: "王富贵",
          area: "7192-2青岛",
          current: "WIN",
          number: "5.40",
          ppd: false,
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
      onSearch: (value: number | string) => {
        console.log(value);
      },
      intoPhoto: (value: string) => {
        console.log(value);
      },
      showDetail: () => {
        console.log("1");
      },
      showMore: (value: string) => {
        router.push({
          path: "/calendar",
          query: { value },
        });
      },
    });
    onMounted(() => {
      console.log("1111111");
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
.newBox {
  height: 205px;
}
.newBox img {
  height: 100%;
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
  border: 1px solid #000;
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
  color: #fff;
  background: red;
  width: 60px;
  border-radius: 10px;
  height: 22px;
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
</style>
