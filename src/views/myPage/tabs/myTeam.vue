<template>
  <div class="content">
    <a-row>
      <a-col :span='4' class="centerFont">
        <SettingFilled /> {{ `${$t('default.110')} (${teamList.length})` }}
      </a-col>
    </a-row>

    <a-row v-for="(item,index) in teamList" :key="item.id">
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
            <div class="counyStyle">{{ item.couny }}</div><span @click="showDetail(item)">
              <EnvironmentOutlined />
            </span>
          </div>
          <div>{{ item.captain }}</div>
        </a-col>
        <a-col :span='3' class="vipBox">
          <div>{{ $t('default.85') }}</div>
          <div class="showVipInfo" @click="entryVipPage">
            <UserOutlined />{{ item.vipCount }}
          </div>
        </a-col>
        <a-col :span='8' class="topBox">
          <div>{{ topInfoTitle }}</div>
          <div class="infoStyle">
            <div>{{ `Rating  ${item.ranting}` }}</div>|
            <div>{{ `PPD  ${item.PPD}` }}</div>|
            <div>{{ `MPR  ${item.MPR}` }}</div>
          </div>
        </a-col>
        <a-col :span='3' class="vipBox">
          <div>{{ 'Entry' }}</div>
          <div>{{ item.count }}</div>
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
          <div class="matchTitle">{{ $t('default.83') }}</div>
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
                <div v-for="disition in recordInfo.divisiList" :key="disition.index">
                  <a-button type="danger" size='small'>{{ disition.divisiName }}</a-button>
                </div>
              </div>
            </a-col>
          </a-row>
        </a-row>
      </transition>
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
import { defineComponent, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import {
  SettingFilled,
  EnvironmentOutlined,
  UserOutlined,
  UpCircleOutlined,
  DownCircleOutlined,
} from "@ant-design/icons-vue";
export default defineComponent({
  name: "myTeam",
  components: {
    SettingFilled,
    EnvironmentOutlined,
    UserOutlined,
    UpCircleOutlined,
    DownCircleOutlined,
  },
  setup() {
    const Router = useRouter();
    const data = reactive({
      visible: false,
      dialogObj: {
        title: "",
        img: require("@/assets/3.jpg"),
        shopName: "",
        phone: "",
        address: "",
      },
      colSpan: 5,
      topInfoTitle: "Top 4 平均 Competition Rating",
      teamList: [
        {
          id: 1,
          img: require("@/assets/1.jpg"),
          teamName: "上海队",
          couny: "北京",
          place: "汉庭会所",
          captain: "刘半仙",
          vipCount: 8,
          ranting: 2.15,
          PPD: 25.0,
          MPR: 19.5,
          count: 0,
          flag: false,
          record: [
            {
              matchName: "第三届DARTS WORLD（广州联赛）",
              img: require("@/assets/1.jpg"),
              date: "2020-5-40 ~ 2020-6-10",
              place: "广州",
              divisiList: [
                { id: 1, divisiName: "class1" },
                { id: 2, divisiName: "class2" },
                { id: 3, divisiName: "class3" },
              ],
            },
            {
              matchName: "第三届DARTS WORLD（广州联赛）",
              img: require("@/assets/1.jpg"),
              date: "2020-5-40 ~ 2020-6-10",
              place: "广州",
              divisiList: [
                { id: 1, divisiName: "class1" },
                { id: 2, divisiName: "class2" },
                { id: 3, divisiName: "class3" },
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
          captain: "刘半仙",
          vipCount: 8,
          ranting: 2.15,
          PPD: 25.0,
          MPR: 19.5,
          count: 0,
          flag: false,
          record: [],
        },
        {
          id: 1,
          img: require("@/assets/1.jpg"),
          teamName: "上海队",
          couny: "北京",
          place: "汉庭会所",
          captain: "刘半仙",
          vipCount: 8,
          ranting: 2.15,
          PPD: 25.0,
          MPR: 19.5,
          count: 0,
          flag: false,
          record: [
            {
              matchName: "第三届DARTS WORLD（广州联赛）",
              img: require("@/assets/1.jpg"),
              date: "2020-5-40 ~ 2020-6-10",
              place: "广州",
              divisiList: [
                { id: 1, divisiName: "class1" },
                { id: 2, divisiName: "class2" },
                { id: 3, divisiName: "class3" },
              ],
            },
            {
              matchName: "第三届DARTS WORLD（广州联赛）",
              img: require("@/assets/1.jpg"),
              date: "2020-5-40 ~ 2020-6-10",
              place: "广州",
              divisiList: [
                { id: 1, divisiName: "class1" },
                { id: 2, divisiName: "class2" },
                { id: 3, divisiName: "class3" },
              ],
            },
          ],
        },
      ],
      showDetail: (item: any) => {
        data.dialogObj.title = item.shopAddress;
        data.dialogObj.shopName = item.shopName;
        data.dialogObj.phone = item.shopPhone;
        data.dialogObj.address = item.shopAddress;
        data.visible = true;
      },
      changeFlag: (index: number) => {
        data.teamList[index].flag = !data.teamList[index].flag;
      },
      handleOk:() =>{
        console.log(1)
      },
      entryVipPage: () => {
        Router.push("/");
      },
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped>
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
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
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
.topBox {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.infoStyle {
  display: flex;
  justify-content: space-around;
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
.countBox {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.recordInfoStyle {
  display: flex;
  justify-content: flex-start;
}
.btnBox {
  display: flex;
}
.btnBox div {
  margin-right: 15px;
}
.msgBox {
  margin: 10px 0;
  height: 80px;
  box-sizing: border-box;
  border-bottom: 1px dashed #666;
}
.matchTitle {
  font-size: 20px;
  border-bottom: 1px dashed #000;
}
.recordBox {
  padding: 10px;
}
.showVipInfo {
  cursor: pointer;
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
.dialogBtn {
  text-align: center;
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
</style>
