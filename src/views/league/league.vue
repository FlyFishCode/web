<template>
  <div class="content">
    <a-row id="title-g">
      <a-col :lg='4' :xs="{ span:4 , offset: 1 }">{{ $t('default.13') }}</a-col>
      <a-col :lg="{ span: 3, offset: 5 }" :xs="{ span: 6, offset: 2 }" class="btnBox">
        <a-select v-model:value="matchType" @change="matchTypeChange" class="selectBox">
          <a-select-option v-for="item in matchTypeList" :key="item.value" :value='item.value'>{{ item.label }}</a-select-option>
        </a-select>
      </a-col>
      <a-col :lg='3' :xs="6" class="btnBox">
        <a-select v-model:value="matchType" @change="matchTypeChange" class="selectBox">
          <a-select-option v-for="item in matchTypeList" :key="item.value" :value='item.value'>{{ item.label }}</a-select-option>
        </a-select>
      </a-col>
    </a-row>
    <a-row class="centerStyle">
      <a-row class="rowSearchBox">
        <a-col :lg='2' :xs="6">
          <EnvironmentOutlined class="fontIcon" />{{ $t('default.27') }}
        </a-col>
        <a-col :lg='3' :xs="9">
          <a-select v-model:value="areaId" @change="areaChange" class="selectBox">
            <a-select-option v-for="item in areaList" :key="item.countryId" :value='item.countryId'>{{ item.countryName }}</a-select-option>
          </a-select>
        </a-col>
        <a-col :lg='3' :xs="9">
          <a-select v-model:value="cityId" @change="cityChange" class="selectBox">
            <a-select-option v-for="item in cityList" :key="item.areaId" :value='item.areaId'>{{ item.areaName }}</a-select-option>
          </a-select>
        </a-col>
        <a-col :lg='3' :xs="6">{{ $t('default.14') }}</a-col>
        <a-col :lg='2' :xs="18">
          <a-select v-model:value="matchType" @change="matchTypeChange" class="selectBox">
            <a-select-option v-for="item in matchTypeList" :key="item.value" :value='item.value'>{{ item.label }}</a-select-option>
          </a-select>
        </a-col>
        <a-col :lg="{ span:4 , offset:1 }" :xs="6">
          <SearchOutlined class="fontIcon" />{{ $t('default.15') }}
        </a-col>
        <a-col :lg='6' :xs="18">
          <a-input-search v-model:value="value" allowClear :enter-button="$t('default.16')" size="default" @search="onSearch" />
        </a-col>
      </a-row>

      <a-row>
        <a-col :lg='5' :xs="10" class="centerFont">
          <SettingFilled /> {{ $t('default.224') + `(${matchTotal})` }}
        </a-col>
      </a-row>
      <a-row class="rowStyle inPhoneBtnBox">
        <a-col :span='3' @click="showALLleague" class="buttonBox">
          <a-button :type="allLeague?'primary':''">{{ all }}</a-button>
        </a-col>
        <a-col :span='3' @click="showMyLengue" class="buttonBox">
          <a-button :type="myLeague?'primary':''">{{ my }}</a-button>
        </a-col>
      </a-row>
      <div v-show="allLeague">
        <a-row v-for="item in allLeagueList" :key="item.matchId" class="matchBox">
          <a-col :lg='14' :xs="24">
            <a-col :span='4' class="matchImgBox">
              <img class="matchImg" :src="item.img">
            </a-col>
            <a-col :span='20' @click="showMore(item.state)" style="cursor:pointer">
              <div>
                <div>{{ item.title }}</div>
                <div>{{ item.tip }}</div>
              </div>
            </a-col>
          </a-col>
          <a-col :lg='2' :xs="0">
            <div class="fontDisplay">{{ $t('default.167') }}</div>
            <div>{{ item.area }}</div>
          </a-col>
          <a-col :lg='8' :xs="0">
            <div class="rightStyle">
              <div class="fontDisplay">{{ '比赛期间' }}</div>
              <div class="matchState I" v-if="item.state === 1">{{ '比赛中' }}</div>
              <div class="matchState R" v-if="item.state === 2">{{ '比赛结束' }}</div>
              <div class="matchState F" v-if="item.state === 3">{{ '比赛结束' }}</div>
            </div>
            <div>{{ item.date }}</div>
          </a-col>
        </a-row>
        <a-row type="flex" justify="end">
          <a-pagination v-model:current="currentSize" :total="total" />
        </a-row>
      </div>

      <div v-show="myLeague">
        <a-row v-for="item in myLeagueList" :key="item.matchId" class="matchBox">
          <a-col :lg='14' :xs="24">
            <a-col :span='4' class="matchImgBox">
              <img class="matchImg" :src="item.img">
            </a-col>
            <a-col :span='20' @click="showMore(item.state)" style="cursor:pointer">
              <div>
                <div>{{ item.title }}</div>
                <div>{{ item.tip }}</div>
              </div>
            </a-col>
          </a-col>
          <a-col :lg='2' :xs="0">
            <div class="fontDisplay">{{ $t('default.167') }}</div>
            <div>{{ item.area }}</div>
          </a-col>
          <a-col :lg='8' :xs="0">
            <div class="rightStyle">
              <div class="fontDisplay">{{ '比赛期间' }}</div>
              <div class="matchState I" v-if="item.state === 1">{{ '比赛中' }}</div>
              <div class="matchState R" v-if="item.state === 2">{{ '比赛结束' }}</div>
              <div class="matchState F" v-if="item.state === 3">{{ '比赛结束' }}</div>
            </div>
            <div>{{ item.date }}</div>
          </a-col>
        </a-row>
        <a-row type="flex" justify="end">
          <a-pagination v-model:current="currentSize" :total="total" />
        </a-row>
      </div>
    </a-row>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import { indexCountryHttp, indexCityHttp } from "@/axios/api";
import { useRouter } from "vue-router";
import {
  SearchOutlined,
  SettingFilled,
  EnvironmentOutlined
} from "@ant-design/icons-vue";
interface HTMLInputEvent {
  value: HTMLInputElement & EventTarget;
}
interface DataProp {
  monthList: { id: number; value: number | string }[];
  currentValue: string;
  allLeague: boolean;
  myLeague: boolean;
  matchTotal: number;
  allLeagueList: { key: string; value: number | string }[];
  myLeagueList: { key: string; value: number | string }[];
  showALLleague: () => void;
  showMyLengue: () => void;
}
export default defineComponent({
  name: "league",
  components: { EnvironmentOutlined, SearchOutlined, SettingFilled },
  setup() {
    const Router = useRouter();
    const data = reactive({
      currentValue: "新闻",
      champion: "The Champion 列表",
      all: "ALL",
      my: "MY",
      matchTotal: 0,
      currentSize: 1,
      total: 100,
      value: "",
      allLeague: true,
      myLeague: false,
      matchType: 2020,
      areaId: null,
      cityId: null,
      areaList: [],
      cityList: [],
      matchTypeList: [{ value: 2020, label: "2020" }],
      newsSearch: [
        { id: 1, value: "新闻" },
        { id: 2, value: "标题" },
        { id: 3, value: "新闻+标题" }
      ],
      stateList: [
        { id: 1, value: "准备中" },
        { id: 2, value: "进行中" },
        { id: 3, value: "已结束" }
      ],
      allLeagueList: [
        {
          matchId: 1,
          img: require("@/assets/1.jpg"),
          title: "2020第一次比赛",
          tip: "U-LEAGUE 苏州赛区季后赛",
          area: "上海",
          date: "2020-9-10",
          state: 1
        },
        {
          matchId: 1,
          img: require("@/assets/1.jpg"),
          title: "2021第二次比赛",
          tip: "U-LEAGUE 广州赛区季后赛",
          area: "武汉",
          date: "2020-9-10",
          state: 2
        },
        {
          matchId: 1,
          img: require("@/assets/1.jpg"),
          title: "2022第三次比赛",
          tip: "U-LEAGUE 兰州赛区季后赛",
          area: "云南",
          date: "2020-9-10",
          state: 3
        }
      ],
      myLeagueList: [
        {
          matchId: 1,
          img: require("@/assets/1.jpg"),
          title: "2022第三次比赛",
          tip: "U-LEAGUE 兰州赛区季后赛",
          area: "云南",
          date: "2020-9-10",
          state: 3
        }
      ],
      monthList: [{ id: 0, value: 0 }],
      handleMenuClick: (e: string) => {
        data.currentValue = e;
      },
      onSearch: (e: string) => {
        console.log(e);
      },
      showMore: (value: string) => {
        Router.push({
          path: "/calendar",
          query: { value }
        });
      },
      showALLleague: () => {
        data.matchTotal = data.allLeagueList.length;
        data.allLeague = true;
        data.myLeague = false;
      },
      showMyLengue: () => {
        data.matchTotal = data.myLeagueList.length;
        data.myLeague = true;
        data.allLeague = false;
      },
      matchTypeChange: (value: number) => {
        console.log(value);
      },
      areaChange: (value: number) => {
        indexCityHttp({ countryId: value }).then(res => {
          data.cityList = res.data.data;
          if (data.cityList.length) {
            data.cityId = data.cityList[0]["areaId"];
          } else {
            data.cityId = null;
          }
        });
      },
      cityChange: (value: number) => {
        console.log(value);
      }
    });
    const getCountryList = () => {
      indexCountryHttp().then(res => {
        if (res.data.data.length) {
          data.areaList = res.data.data;
          data.areaId = data.areaList[0]["countryId"];
          data.areaChange(data.areaList[0]["countryId"]);
        }
      });
    };
    onMounted(() => {
      for (let i = 1; i < 13; i += 1) {
        data.monthList.push({ id: i, value: i });
      }
      getCountryList();
    });
    return {
      ...toRefs(data)
    };
  }
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
</style>