<template>
  <div class="content">
    <a-row type="flex" justify="space-between">
      <a-col :span='10' class="smallTitle">
        <SettingFilled /> {{ $t('default.181') }}
      </a-col>
      <a-col :span='4' class="btnBox">
        <a-button type="danger" size="small" @click="clearList">{{ $t('default.196') }}</a-button>
      </a-col>
    </a-row>
    <a-row class="allBox">
      <a-col :span='4'>
        <div v-for="item in titleList" :key="item.id">
          <div class="titleBox" :class="{ imgTitle:item.id === 1,captainTitle:item.id === 4,plain:item.id === 6 || item.id === 7,chance:item.id === 9, topTitle:item.id === 10 }">{{ $t(item.title) }}</div>
        </div>
      </a-col>
      <a-col :span='5' v-for="(item,index) in teamList" :key="index">
        <div v-if="item.flag" class="playerBox">
          <div class="imgBg">
            <div class="closeBox">
              <CloseCircleFilled class="closeIcon" @click="bySpliceIndex(index)" />
            </div>
            <div class="img"><img :src="item.img" alt=""></div>
            <div>{{ item.captain }}</div>
          </div>
          <div class="info">{{ item.place }}</div>
          <div class="info">{{ item.address }}</div>
          <div class="captainBox">
            <div class="topBox"><img :src="item.captainImg" alt=""></div>
            <div>{{ item.captain }}</div>
          </div>
          <div class="info">{{ item.playerNum }}</div>
          <div class="plainList">
            <div>
              <a-progress type="circle" status="exception" :percent="item.plainRating">
                <template v-slot:format="percent">
                  <span style="color: red">{{ percent }}</span>
                </template>
              </a-progress>
            </div>
            <div class="plainScore">
              <div>
                <div class="score">
                  <div>{{ $t('default.169') }}</div>
                  <div>{{ item.plainPPD }}</div>
                </div>
                <div class="progress">
                  <a-progress status="exception" :percent="item.plainPPD" />
                </div>
              </div>
              <div>
                <div class="score">
                  <div>{{ $t('default.169') }}</div>
                  <div>{{ item.plainMPR }}</div>
                </div>
                <div class="progress">
                  <a-progress status="exception" :percent="item.plainMPR" />
                </div>
              </div>
            </div>
          </div>
          <div class="plainList">
            <div>
              <a-progress type="circle" status="exception" :percent="item.matchRating">
                <template v-slot:format="percent">
                  <span style="color: red">{{ percent }}</span>
                </template>
              </a-progress>
            </div>
            <div class="plainScore">
              <div>
                <div class="score">
                  <div>{{ $t('default.169') }}</div>
                  <div>{{ item.matchPPD }}</div>
                </div>
                <div class="progress">
                  <a-progress status="exception" :percent="item.matchPPD" />
                </div>
              </div>
              <div>
                <div class="score">
                  <div>{{ $t('default.169') }}</div>
                  <div>{{ item.matchMPR }}</div>
                </div>
                <div class="progress">
                  <a-progress status="exception" :percent="item.matchMPR" />
                </div>
              </div>
            </div>
          </div>
          <div class="info">{{ item.joinCount }}</div>
          <div class="chanceBox">
            <div>
              <a-progress type="circle" status="exception" :percent="item.chanceSet" :width="80">
                <template v-slot:format="percent">
                  <div class="scoreBox">{{ percent }}</div>
                  <div class="scoreTitle">{{ 'Set' }}</div>
                </template>
              </a-progress>
            </div>
            <div>
              <a-progress type="circle" status="exception" :percent="item.chanceMatch" :width="80">
                <template v-slot:format="percent">
                  <div class="scoreBox">{{ percent }}</div>
                  <div class="scoreTitle">{{ 'Match' }}</div>
                </template>
              </a-progress>
            </div>
          </div>
          <div v-for="top in item.top" :key="top" class="topBg">
            <div class="topBox"><img :src="top.img" alt=""></div>
            <div>{{ top.name }}</div>
          </div>
        </div>
        <div v-else class="addBox">
          <a-button type="dashed" ghost @click="showDialog(index)">{{ $t('default.197') }}</a-button>
        </div>
      </a-col>
    </a-row>
    <a-modal v-model:visible="visible" centered width='900px' :footer="null" :title="$t('default.200')">
      <a-row class="rowSearchBox">
        <a-col :span='3'>
          <a-select v-model:value="matchType" @change="matchTypeChange" class="selectBox">
            <a-select-option v-for="item in matchTypeList" :key="item.value" :value='item.value'>{{ item.label }}</a-select-option>
          </a-select>
        </a-col>
        <a-col :span='3'>
          <a-select v-model:value="matchType" @change="matchTypeChange" class="selectBox">
            <a-select-option v-for="item in matchTypeList" :key="item.value" :value='item.value'>{{ item.label }}</a-select-option>
          </a-select>
        </a-col>
        <a-col :span='1' :offset='11'></a-col>
        <a-col :span='6'>
          <a-input-search v-model:value="dialogValue" class="selectBox" :enter-button="$t('default.16')" size="default" @search="onSearch" />
        </a-col>
      </a-row>
      <a-row class="rowStyle">
        <a-table :columns="columns" :data-source="dataList" :pagination="paginationProps">
          <template v-slot:choice>
            <div>{{ $t('default.201') }}</div>
          </template>
          <template v-slot:add="{ text, record }">
            <a-button v-if="!record.flag" type="primary" shape="circle">
              <template v-slot:icon>
                <div @click="selectPlayer(text)">
                  <PlusOutlined />
                </div>
              </template>
            </a-button>
            <div v-else></div>
          </template>
          <template v-slot:teamName>
            <div>{{ $t('default.55') }}</div>
          </template>
          <template v-slot:captain>
            <div>{{ $t('default.76') }}</div>
          </template>
        </a-table>
      </a-row>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import {
  SettingFilled,
  CloseCircleFilled,
  PlusOutlined,
} from "@ant-design/icons-vue";
export default defineComponent({
  name: "teamHistory",
  components: {
    SettingFilled,
    CloseCircleFilled,
    PlusOutlined,
  },
  setup() {
    // let selectList: number[] = [];
    const data = reactive({
      total: 10,
      visible: false,
      dialogValue: "",
      currentIndex: 0,
      matchType: 2020,
      paginationProps: {
        showSizeChanger: true,
        showQuickJumper: false,
        showTotal: () => `共${data.total}条`,
        pageSize: 10,
        current: 1,
        onShowSizeChange: (current: number, pageSize: number) => {
          console.log(current, pageSize);
        },
        onChange: (current: number) => {
          console.log(current);
        },
      },
      matchTypeList: [{ value: 2020, label: "2020" }],
      columns: [
        {
          dataIndex: "matchId",
          key: "matchId",
          slots: { title: "choice", customRender: "add" },
        },
        {
          dataIndex: "place",
          key: "id",
          slots: { title: "teamName" },
        },
        {
          dataIndex: "address",
          key: "playerNum",
          slots: { title: "captain" },
        },
      ],
      titleList: [
        { id: 1, title: "default.189" },
        { id: 2, title: "default.195" },
        { id: 3, title: "default.91" },
        { id: 4, title: "default.76" },
        { id: 5, title: "default.190" },
        { id: 6, title: "default.191" },
        { id: 7, title: "default.192" },
        { id: 8, title: "default.193" },
        { id: 9, title: "default.185" },
        { id: 10, title: "default.194" },
      ],
      teamList: [
        { flag: false },
        { flag: false },
        { flag: false },
        { flag: false },
      ],
      dataList: [
        {
          key: 1,
          flag: false,
          matchId: 100,
          img: require("@/assets/1.jpg"),
          place: "武汉",
          address: "汉江路",
          captain: "asdasd",
          captainImg: require("@/assets/1.jpg"),
          playerNum: 6,
          plainRating: 35,
          plainPPD: 65,
          plainMPR: 71,
          matchRating: 85,
          matchPPD: 26,
          matchMPR: 19,
          joinCount: 2,
          chanceSet: 19,
          chanceMatch: 38,
          top: [
            { img: require("@/assets/1.jpg"), name: "jiapsja" },
            { img: require("@/assets/1.jpg"), name: "adasda" },
            { img: require("@/assets/1.jpg"), name: "vfdgsdfs" },
            { img: require("@/assets/1.jpg"), name: "rtyrtrty" },
          ],
        },
        {
          key: 2,
          flag: false,
          matchId: 101,
          img: require("@/assets/1.jpg"),
          place: "武汉",
          address: "汉江路",
          captain: "asdasd",
          captainImg: require("@/assets/1.jpg"),
          playerNum: 6,
          plainRating: 35,
          plainPPD: 65,
          plainMPR: 71,
          matchRating: 35,
          matchPPD: 65,
          matchMPR: 71,
          joinCount: 2,
          chanceSet: 19,
          chanceMatch: 38,
          top: [
            { img: require("@/assets/1.jpg"), name: "jiapsja" },
            { img: require("@/assets/1.jpg"), name: "adasda" },
            { img: require("@/assets/1.jpg"), name: "vfdgsdfs" },
            { img: require("@/assets/1.jpg"), name: "rtyrtrty" },
          ],
        },
        {
          key: 3,
          flag: false,
          matchId: 102,
          img: require("@/assets/1.jpg"),
          place: "武汉",
          address: "汉江路",
          captain: "asdasd",
          captainImg: require("@/assets/1.jpg"),
          playerNum: 6,
          plainRating: 35,
          plainPPD: 65,
          plainMPR: 71,
          matchRating: 35,
          matchPPD: 65,
          matchMPR: 71,
          joinCount: 2,
          chanceSet: 19,
          chanceMatch: 38,
          top: [
            { img: require("@/assets/1.jpg"), name: "jiapsja" },
            { img: require("@/assets/1.jpg"), name: "adasda" },
            { img: require("@/assets/1.jpg"), name: "vfdgsdfs" },
            { img: require("@/assets/1.jpg"), name: "rtyrtrty" },
          ],
        },
        {
          key: 4,
          flag: false,
          matchId: 103,
          img: require("@/assets/1.jpg"),
          place: "武汉",
          address: "汉江路",
          captain: "asdasd",
          captainImg: require("@/assets/1.jpg"),
          playerNum: 6,
          plainRating: 35,
          plainPPD: 65,
          plainMPR: 71,
          matchRating: 35,
          matchPPD: 65,
          matchMPR: 71,
          joinCount: 2,
          chanceSet: 19,
          chanceMatch: 38,
          top: [
            { img: require("@/assets/1.jpg"), name: "jiapsja" },
            { img: require("@/assets/1.jpg"), name: "adasda" },
            { img: require("@/assets/1.jpg"), name: "vfdgsdfs" },
            { img: require("@/assets/1.jpg"), name: "rtyrtrty" },
          ],
        },
      ],
      clearList: () => {
        data.teamList.forEach((i,index) => {
          i.flag = false
          data.teamList.splice(index, 1, { flag: false })
        });
      },
      selectPlayer: (value: number) => {
        data.dataList.forEach((i) => {
          if (i.matchId === value) {
            // dialog table 设置数据已被选择
            i.flag = true;
            //  展示表格显示填充数据
            data.teamList.fill(i, data.currentIndex, data.currentIndex + 1);
          }
        });
        data.visible = false;
      },
      matchTypeChange: () => {
        console.log(1);
      },
      onSearch: () => {
        console.log(111);
      },
      showDialog: (index: number) => {
        data.currentIndex = index;
        data.visible = true;
      },
      bySpliceIndex: (index: number) => {
        const obj: any = data.teamList.splice(index, 1, { flag: false });
        data.dataList.forEach((i) => {
          if (i.matchId === obj[0].matchId) {
            i.flag = false;
          }
        });
      },
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped>
.titleBox {
  background: #272727;
  color: #a9a9a9;
  border-right: 2px solid #4b4b4b;
  box-shadow: -10px 0 8px -8px #111 inset;
  min-height: 40px;
  border-top: 1px solid #4b4b4b;
  box-sizing: content-box;
  line-height: 40px;
}
.playerBox {
  height: 100%;
  background: #4b4b4b;
  color: #fff;
  border-right: 1px solid #5f5f5f;
  border-left: 1px solid #5f5f5f;
}
.info {
  border-top: 1px solid #5f5f5f;
  min-height: 40px;
  line-height: 40px;
}
.img {
  height: 80px;
}
.img img {
  height: 100%;
}
.addBox {
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #5f5f5f;
}
.imgBg {
  height: 140px;
}
.imgTitle {
  height: 140px;
  line-height: 140px;
}
.closeBox {
  font-size: 20px;
  text-align: right;
}
.closeIcon {
  cursor: pointer;
}
.score {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.plainList {
  border-top: 1px solid #5f5f5f;
  height: 200px;
  padding: 20px;
}
.plain {
  height: 200px;
  padding: 20px;
  box-sizing: border-box;
}
.plainScore {
  display: flex;
  justify-content: space-around;
}
.plainScore div {
  width: 90px;
}
.progress >>> .ant-progress-text {
  display: none;
}
.progress >>> .ant-progress-outer {
  width: 120%;
}
.btnBox {
  display: flex;
  justify-content: center;
  align-items: center;
}
.chanceBox {
  display: flex;
  justify-content: space-around;
  height: 100px;
  padding: 10px;
  border-top: 1px solid #5f5f5f;
}
.scoreBox {
  font-size: 22px;
  color: #fff;
}
.scoreTitle {
  font-size: 11px;
  color: #fff;
}
.chance {
  height: 100px;
  padding: 10px;
  box-sizing: border-box;
}
.topBox {
  height: 50px;
  width: 50px;
}
.topBox img {
  width: 100%;
}
.topBg {
  display: flex;
  justify-content: space-around;
  border-top: 1px solid #5f5f5f;
  padding: 5px;
}
.topTitle {
  height: 242px;
}
.captainTitle {
  height: 60px;
  line-height: 60px;
}
.captainBox {
  padding: 5px;
  display: flex;
  justify-content: space-around;
  border-top: 1px solid #5f5f5f;
}
.allBox {
  background: #4b4b4b;
}
</style>
