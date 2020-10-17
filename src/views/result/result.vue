<template>
  <div class="content">
    <a-row id="title-g">
      <a-col :span='4'>{{ title }}</a-col>
      <a-col :span='3' :offset="5" class="btnBox">
        <a-dropdown>
          <template v-slot:overlay>
            <a-menu>
              <a-menu-item v-for="item in newsSearch" :key="item.id" @click="handleMenuClick(item.value)">
                {{ item.value }}
              </a-menu-item>
            </a-menu>
          </template>
          <a-button class="btnStyle" style="margin-left: 8px">{{ currentValue }}
            <DownOutlined />
          </a-button>
        </a-dropdown>
      </a-col>
      <a-col :span='3' class="btnBox">
        <a-dropdown>
          <template v-slot:overlay>
            <a-menu>
              <a-menu-item v-for="item in monthList" :key="item.id" @click="handleMenuClick(item.value)">
                {{ item.value }}
              </a-menu-item>
            </a-menu>
          </template>
          <a-button class="btnStyle" style="margin-left: 8px">{{ currentValue }}
            <DownOutlined />
          </a-button>
        </a-dropdown>
      </a-col>
    </a-row>
    <a-row class="centerStyle">
      <a-tabs>
        <a-tab-pane key="1" tab="Multi League" class="tab">
          <a-row class="rowSearchBox">
            <a-col :span='2'>
              <BankFilled class="fontIcon" />{{ place }}
            </a-col>
            <a-col :span='2'>
              <a-dropdown>
                <template v-slot:overlay>fontIcon
                  <a-menu>
                    <a-menu-item v-for="item in monthList" :key="item.id" @click="handleMenuClick(item.value)">
                      {{ item.value }}
                    </a-menu-item>
                  </a-menu>
                </template>
                <a-button class="btnStyle" style="margin-left: 8px">{{ currentValue }}
                  <DownOutlined />
                </a-button>
              </a-dropdown>
            </a-col>
            <a-col :span='3'>{{ currentState }}</a-col>
            <a-col :span='2'>
              <a-dropdown>
                <template v-slot:overlay>
                  <a-menu>
                    <a-menu-item v-for="item in stateList" :key="item.id" @click="handleMenuClick(item.value)">
                      {{ item.value }}
                    </a-menu-item>
                  </a-menu>
                </template>
                <a-button class="btnStyle" style="margin-left: 8px">{{ currentValue }}
                  <DownOutlined />
                </a-button>
              </a-dropdown>
            </a-col>
            <a-col :span='2' :offset="8">
              <SearchOutlined class="fontIcon" />{{ matchName }}
            </a-col>
            <a-col :span='5'>
              <a-input-search v-model:value="value" enter-button="Search" size="default" @search="onSearch" />
            </a-col>
          </a-row>
          <a-row>
            <a-col :span='4' class="centerFont">
              <SettingFilled /> {{ matchTitle + '  ' +matchTotal }}
            </a-col>
          </a-row>
          <a-row class="rowStyle">
            <a-col :span='3' class="buttonBox">
              <a-button type="primary">{{ all }}</a-button>
            </a-col>
            <a-col :span='3' class="buttonBox">
              <a-button>{{ my }}</a-button>
            </a-col>
          </a-row>
          <a-row v-for="item in matchList" :key="item.matchId" class="matchBox">
            <a-col :span='14'>
              <div>
                <a-col :span='5' class="matchImgBox">
                  <img class="matchImg" :src="item.img">
                </a-col>
                <a-col @click="showMore(item.state)" style="cursor:pointer" :span='10'>
                  <div>
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
          <a-row type="flex" justify="start">
            <a-pagination v-model:current="currentSize" :total="total" />
          </a-row>
        </a-tab-pane>

        <a-tab-pane key="2" tab="The Champion" class="tab">
          <a-row class="rowSearchBox">
            <a-col :span='2'>
              <BankFilled class="fontIcon" />{{ place }}
            </a-col>
            <a-col :span='2'>
              <a-dropdown>
                <template v-slot:overlay>
                  <a-menu>
                    <a-menu-item v-for="item in monthList" :key="item.id" @click="handleMenuClick(item.value)">
                      {{ item.value }}
                    </a-menu-item>
                  </a-menu>
                </template>
                <a-button class="btnStyle" style="margin-left: 8px">{{ currentValue }}
                  <DownOutlined />
                </a-button>
              </a-dropdown>
            </a-col>
            <a-col :span='3'>{{ currentState }}</a-col>
            <a-col :span='2'>
              <a-dropdown>
                <template v-slot:overlay>
                  <a-menu>
                    <a-menu-item v-for="item in stateList" :key="item.id" @click="handleMenuClick(item.value)">
                      {{ item.value }}
                    </a-menu-item>
                  </a-menu>
                </template>
                <a-button class="btnStyle" style="margin-left: 8px">{{ currentValue }}
                  <DownOutlined />
                </a-button>
              </a-dropdown>
            </a-col>
            <a-col :span='2' :offset="8">
              <SearchOutlined class="fontIcon" />{{ matchName }}
            </a-col>
            <a-col :span='5'>
              <a-input-search v-model:value="value" enter-button="Search" size="default" @search="onSearch" />
            </a-col>
          </a-row>
          <a-row>
            <a-col :span='6' class="centerFont">
              <SettingFilled /> {{ champion + '  ' +matchTotal }}
            </a-col>
          </a-row>
          <a-row class="rowStyle">
            <a-col :span='3' class="buttonBox">
              <a-button type="primary">{{ all }}</a-button>
            </a-col>
            <a-col :span='3' class="buttonBox">
              <a-button>{{ my }}</a-button>
            </a-col>
          </a-row>
          <a-row v-for="item in matchList" :key="item.matchId" class="matchBox">
            <a-col :span='14'>
              <div>
                <a-col :span='5' class="matchImgBox">
                  <img class="matchImg" :src="item.img">
                </a-col>
                <a-col @click="showMore(item.state)" style="cursor:pointer" :span='10'>
                  <div>
                    <div>{{ '高分赛' }}</div>
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
          <a-row type="flex" justify="start">
            <a-pagination v-model:current="currentSize" :total="total" />
          </a-row>
        </a-tab-pane>
      </a-tabs>
    </a-row>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  DownOutlined,
  BankFilled,
  SearchOutlined,
  SettingFilled,
} from "@ant-design/icons-vue";
interface HTMLInputEvent {
  value: HTMLInputElement & EventTarget;
}
interface DataProp {
  monthList: { id: number; value: number }[];
  currentValue: string;
}
export default defineComponent({
  name: "hearder",
  components: { DownOutlined, BankFilled, SearchOutlined, SettingFilled },
  setup() {
    const Router = useRouter();
    const data: DataProp = reactive({
      title: "日程表/结果",
      currentValue: "新闻",
      matchName: "比赛名称",
      matchTitle: "多联赛列表",
      champion: "The Champion 列表",
      all: "ALL",
      my: "MY",
      matchTotal: 0,
      currentSize: 1,
      total: 100,
      value: "",
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
      place: "地点",
      currentState: "当前状态",
      monthList: [],
      handleMenuClick: (e: string) => {
        data.currentValue = e;
      },
      onSearch: (e: string) => {
        console.log(e);
      },
      showMore: (value: string) => {
        Router.push({
          path: "/calendar",
          query: { value },
        });
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
.tabsBox >>> .ant-tabs-nav-scroll {
  display: flex;
  margin: 10px;
}
.btnStyle {
  width: 100%;
}
.btnBox {
  height: 50px;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
}
.centerStyle {
  line-height: 32px;
}
.tabs {
  display: flex;
}
.tab {
  line-height: 32px;
}
.centerFont {
  font-size: 20px;
  font-weight: bold;
  color: red;
  margin: 5px 0;
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
</style>