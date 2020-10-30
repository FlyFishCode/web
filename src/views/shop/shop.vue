<template>
  <div class="content">
    <divTitle :msg="title" :span='colSpan' />
    <a-row class="rowStyle">
      <a-col :span='12'>
        <div id="container"></div>
      </a-col>
      <a-col :span='12' class="mapSearch">
        <div class="shopTitle">{{ '搜索店铺' }}</div>
        <div class="center">
          <div>{{ '当地' }}</div>
          <div class="selectBox">
            <a-select v-model:value="area">
              <a-select-option v-for="area in areaList" :key="area.value" :value='area.value'>
                {{ area.label }}
              </a-select-option>
            </a-select>
            <a-select v-model:value="country">
              <a-select-option v-for="country in countryList" :key="country.value" :value='country.value'>
                {{ country.label }}
              </a-select-option>
            </a-select>
            <a-select v-model:value="city">
              <a-select-option v-for="city in cityList" :key="city.value" :value='city.value'>
                {{ city.label }}
              </a-select-option>
            </a-select>
          </div>
        </div>
        <div class="center">
          <div>{{ '店铺名称' }}</div>
          <div>
            <a-input v-model:value="shopName" placeholder="输入关键字搜索" id='input_id' allowClear />
          </div>
        </div>
        <div class="center">
          <div>{{ '机台' }}</div>
          <div>
            <a-checkbox v-model:checked="vsp">{{ 'vsp' }}</a-checkbox>
            <a-checkbox v-model:checked="vss">{{ 'vss' }}</a-checkbox>
            <a-checkbox v-model:checked="d1x">{{ 'd1x' }}</a-checkbox>
            <a-checkbox v-model:checked="s4">{{ 's4' }}</a-checkbox>
          </div>
        </div>
        <div class="center">
          <div>{{ '比赛类型' }}</div>
          <div>
            <a-checkbox v-model:checked="league">{{ 'league' }}</a-checkbox>
          </div>
        </div>
        <div class="btnBox">
          <a-button type="danger" @click="search">{{ '搜索' }}</a-button>
        </div>
      </a-col>
    </a-row>
    <a-row class="shopRow">
      <a-col :span='5' class="centerFont">
        <SettingFilled /> {{ `${shopTitle}(${shopList.length})` }}
      </a-col>
    </a-row>
    <a-row>
      <a-row v-for="(item,index) in shopList" :key="item.id">
        <a-row class="eveyTeam">
          <a-col :span='3' class="imgColStyle">
            <div>
              <img class="matchImg" :src="item.img" alt="">
            </div>
          </a-col>
          <a-col :span='4' class="infoClass">
            <div class="teamStyle">{{ item.teamName }}</div>
            <div class="placeStyle">
              <div>{{ item.place }}</div>/
              <div class="counyStyle">{{ item.couny }}</div><span @click="showDetail">
                <InfoCircleFilled />
              </span>
            </div>
          </a-col>
          <a-col :span='3' class="vipBox" :offset='3'>
            <div>{{ '电话号码' }}</div>
            <div>
              <PhoneOutlined />   {{ item.vipCount }}
            </div>
          </a-col>
          <a-col :span='8' class="vipBox" :offset='1'>
            <div>{{ '机台' }}</div>
            <div class="infoStyle">
              <div>{{ `Rating  ${item.ranting}` }}</div>
            </div>
          </a-col>
          <a-col :span='2' class="iconFont">
            <div v-if="item.record.length">
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
            <!-- <div class="matchTitle">{{ joinMatch }}</div> -->
            <a-row v-for="recordInfo in item.record" :key="recordInfo.index" class="msgBox">
              <a-col :span='3' class="imgColStyle">
                <div>
                  <img class="matchImg" :src="recordInfo.img" alt="">
                </div>
              </a-col>
              <a-col :span='10' class="countBox">
                <div class="recordInfoStyle">
                  <div class="recordInfoFont">{{ recordInfo.matchName }}</div>
                  <div>{{ recordInfo.date }}</div>
                  <div>{{ recordInfo.place }}</div>
                </div>
                <div class="btnBox">
                  <div v-for="disition in recordInfo.class" :key="disition.index">
                    <a-button type="danger" size='small'>{{ disition.className }}</a-button>
                  </div>
                </div>
              </a-col>
            </a-row>
          </a-row>
        </transition>
      </a-row>
    </a-row>
  </div>
</template>
// 此文件不用TS，AMap加载有问题
<script>
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import divTitle from "@/components/DividingLine.vue";
import { message } from 'ant-design-vue'
import { SettingFilled,InfoCircleFilled ,PhoneOutlined,DownCircleOutlined,UpCircleOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  name: "shop",
  components: {
    divTitle,
    SettingFilled,
    InfoCircleFilled,
    PhoneOutlined,
    DownCircleOutlined,
    UpCircleOutlined 
  },
  setup () {
    const loadMap = () => {
      const url =
        "https://webapi.amap.com/maps?v=1.4.15&key=4288b5f8c829eba5d80f4664f7e40dcf&callback=load";
      const jsapi = document.createElement("script");
      jsapi.charset = "utf-8";
      jsapi.src = url;
      document.head.appendChild(jsapi);
    };
    let placeSearch = null
    const initMap = (map) => {
      // 加载定位插件，搜索提示插件，搜索插件
      // eslint-disable-next-line no-undef
      AMap.plugin(['AMap.Geolocation', 'AMap.PlaceSearch', 'AMap.Autocomplete'], function () {
        // eslint-disable-next-line no-undef
        const geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,//是否使用高精度定位，默认:true
          timeout: 10000,          //超过10秒后停止定位，默认：无穷大
          maximumAge: 0,           //定位结果缓存0毫秒，默认：0
          convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true,        //显示定位按钮，默认：true
          buttonPosition: 'RB',    //定位按钮停靠位置，默认：'LB'，左下角
          // eslint-disable-next-line no-undef
          buttonOffset: new AMap.Pixel(5, 5),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        // eslint-disable-next-line no-undef
        const auto = new AMap.Autocomplete({
          input: "input_id"
        })
        // eslint-disable-next-line no-undef
        placeSearch = new AMap.PlaceSearch({
          map: map,
        });
        // eslint-disable-next-line no-undef
        AMap.event.addListener(geolocation, 'error', (onError) => {
          message.error('定位出错:' + onError.message)
        });//返回定位出错信息
        // eslint-disable-next-line no-undef
        AMap.event.addListener(auto, "select", (e) => {
          placeSearch.setCity(e.poi.adcode);
          placeSearch.search(e.poi.name);
        });
      });
    };
    const showMap = () => {
      window.load = () => {
        // eslint-disable-next-line no-undef
        const map = new AMap.Map("container", {
          resizeEnable: true,
          center: [116.397428, 39.90923],
          zoom: 13,
        });
        initMap(map)
      }
    };
    const data = reactive({
      title: "店铺",
      shopTitle: '店铺列表',
      colSpan: 4,
      area: 1,
      country: 1,
      city: 1,
      shopName: "",
      vsp: true,
      vss: false,
      d1x: true,
      s4: false,
      league: true,
      areaList: [{ value: 1, label: "asdasd" }],
      countryList: [{ value: 1, label: "asdasd" }],
      cityList: [{ value: 1, label: "asdasd" }],
      shopList: [
        {
          id: 1,
          img: require("@/assets/1.jpg"),
          teamName: "上海队",
          couny: "北京",
          place: "汉庭会所",
          vipCount: 8,
          ranting: 2.15,
          PPD: 25.0,
          MPR: 19.5,
          count: 0,
          enroll: 10,
          flag: false,
          record: [
            {
              matchName: "第三届DARTS WORLD（广州联赛）",
              img: require("@/assets/1.jpg"),
              date: "2020-5-40 ~ 2020-6-10",
              place: "广州",
              class: [
                { className: "class1" },
                { className: "class2" },
                { className: "class3" },
              ],
            },
            {
              matchName: "第三届DARTS WORLD（广州联赛）",
              img: require("@/assets/1.jpg"),
              date: "2020-5-40 ~ 2020-6-10",
              place: "广州",
              class: [
                { className: "class1" },
                { className: "class2" },
                { className: "class3" },
              ],
            },
          ],
        },
        {
          id: 1,
          img: require("@/assets/1.jpg"),
          teamName: "上海队",
          couny: "北京",
          place: "汉庭会所",
          vipCount: 8,
          ranting: 2.15,
          PPD: 25.0,
          MPR: 19.5,
          count: 0,
          enroll: 10,
          flag: false,
          record: [],
        },
      ],
      search: () => {
        placeSearch.search(data.shopName)
      },
      changeFlag: (index) => {
        data.shopList[index].flag = !data.shopList[index].flag;
      },
    });
    onMounted(() => {
      loadMap();
      showMap();
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped>
.rowStyle {
  height: 440px;
  border-top: 2px double #4b4b4b;
  border-bottom: 2px double #4b4b4b;
}
.mapSearch {
  height: 100%;
  border-left: 1px solid #4b4b4b;
  display: flex;
  flex-direction: column;
  padding: 20px;
  justify-content: space-around;
  text-align: left;
}
.shopTitle {
  font-size: 20px;
  font-weight: bold;
}
.btnBox {
  text-align: center;
}
.center {
  margin: 10px 0;
}
.selectBox div {
  width: 33.3%;
}
#container {
  height: 440px;
}
.shopRow {
  margin: 15px 0;
}
.eveyTeam {
  height: 80px;
  margin: 15px 0;
  border: 1px solid #eee;
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
  text-align: left;
}
.infoStyle {
  display: flex;
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
.recordBox {
  padding: 10px;
}
.msgBox {
  margin: 10px 0;
  height: 80px;
  box-sizing: border-box;
}
.countBox {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.recordInfoFont {
  font-weight: bold;
  cursor: pointer;
}
.recordInfoFont:hover {
  text-decoration: underline;
}
.btnBox {
  display: flex;
}
.btnBox div {
  margin-right: 15px;
}
.recordInfoStyle {
  display: flex;
  justify-content: flex-start;
}
</style>
