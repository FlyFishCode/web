<template>
  <div class="rowStyle">
    <a-row type="flex" justify="center" class="top">
      <a-col :span="1">
        <div v-if="direction" class="direction" @click="leftClick">
          <LeftOutlined />
        </div>
      </a-col>
      <a-col :span="22" class="centerBox">
        <div class="center">
          <div v-for="(item, index) in topList" :key="index" class="DIV" :class="{ currentDiv: current === index }" @click="changeDate(item)">
            {{ item.date }}
            <span v-if="item.match" class="divAfter">{{ item.match && item.match.length }}</span>
          </div>
        </div>
      </a-col>
      <a-col :span="1">
        <div v-if="direction" class="direction" @click="rightClick">
          <RightOutlined />
        </div>
      </a-col>
    </a-row>
    <a-row>
      <a-col class="bottom">
        <a-col :span="1" class="directionBox">
          <div v-if="hasData" class="buttomDirection" @click="directionLeftClick">
            <LeftOutlined />
          </div>
        </a-col>
        <a-col :span="22" class="centerBg">
          <div class="directionCenterBox">
            <div v-for="(item,index) in detailList" :key="index" class="matchBoxBG">
              <div class="matchBox" @click="info(item)">
                <div class="bg">
                  <div class="imgBox"><img :src="item.img" /></div>
                  <div>{{ item.homeTeamName }}</div>
                </div>
                <div class="bg">
                  <div>{{ item.date }}</div>
                  <div>{{ `${item.homeMatch}:${item.homeMatch}` }}</div>
                </div>
                <div class="bg">
                  <div class="imgBox"><img :src="item.img" /></div>
                  <div>{{ item.homeTeamName }}</div>
                </div>
                <span v-if="item.homeMatch === 0" class="stateStyle N">{{ $t('all.tip95') }}</span>
                <span v-if="item.homeMatch === 1" class="stateStyle I">{{ $t('all.tip96') }}</span>
                <span v-if="item.homeMatch === 2" class="stateStyle F">{{ $t('all.tip97') }}</span>
              </div>
            </div>
          </div>
        </a-col>
        <a-col :span="1" class="directionBox">
          <div v-if="hasData" class="buttomDirection" @click="directionRightClick">
            <RightOutlined />
          </div>
        </a-col>
      </a-col>
    </a-row>
  </div>
</template>
<script lang='ts'>
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import { LeftOutlined, RightOutlined } from "@ant-design/icons-vue";
// interface DataProps {
//   detailList: string;
// }
export default defineComponent({
  name: "inCalendar",
  props: {
    topList: {
      type: Array,
      required: true,
    },
  },
  components: {
    LeftOutlined,
    RightOutlined,
  },
  emits: ["show-match"],
  setup(props: any, ctx) {
    const data = reactive({
      direction: false,
      hasData: false,
      position: 0,
      buttomPositon: 0,
      current: 0,
      currentDiv: 0,
      detailList: props.topList,
      init: () => {
        data.detailList = data.detailList[0].match;
        if (data.detailList && data.detailList.length > 3) {
          data.hasData = true;
        } else {
          data.hasData = false;
        }
      },
      leftClick() {
        const div = document.getElementsByClassName("center")[0] as HTMLElement;
        data.currentDiv--;
        if (data.currentDiv === -1) {
          data.currentDiv = 0;
        }
        if (div.style.left && div.style.left !== "0px") {
          data.position += 180;
          div.style.left = data.position + "px";
        }
      },
      rightClick() {
        const div = document.getElementsByClassName("center")[0] as HTMLElement;
        data.currentDiv++;
        const ohterDiv = data.detailList.length - 6;
        if (
          div.style.left < `-${ohterDiv * 142}px` ||
          div.style.left === "0px"
        ) {
          data.position -= 180;
          div.style.left = this.position + "px";
        }
        if (this.currentDiv === data.detailList.length) {
          this.currentDiv = data.detailList.length - 1;
        }
      },
      directionLeftClick() {
        const div = document.getElementsByClassName(
          "directionCenterBox"
        )[0] as HTMLElement;
        if (div.style.left && div.style.left !== "0px") {
          this.buttomPositon += 305;
          div.style.left = this.buttomPositon + "px";
        }
      },
      directionRightClick() {
        const div = document.getElementsByClassName(
          "directionCenterBox"
        )[0] as HTMLElement;
        const ohterDiv = this.detailList.length - 3;
        if (
          Number(Math.abs(parseInt(div.style.left))) <
            Number(`${ohterDiv * 338}`) ||
          div.style.left === "0px" ||
          !div.style.left
        ) {
          this.buttomPositon -= 305;
          div.style.left = this.buttomPositon + "px";
        }
      },
      changeDate(item: any) {
        const div = document.getElementsByClassName(
          "directionCenterBox"
        )[0] as HTMLElement;
        data.buttomPositon = 0;
        div.style.left = "0px";
        data.current = props.topList.findIndex(
          (i: any) => i.matchId === item.matchId
        );
        data.detailList =
          props.topList.find((i: any) => i.matchId === item.matchId).match ||
          [];
        if (data.detailList && data.detailList.length > 3) {
          data.hasData = true;
        } else {
          data.hasData = false;
        }
      },
      info: (value: any) => {
        ctx.emit("show-match", value.homeTeamName);
      },
    });
    onMounted(() => {
      if (data.detailList.length > 6) {
        data.direction = true;
      }
      data.init();
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>
<style scoped>
.top {
  height: 30px;
  border-radius: 14px;
  background: #ececec;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  position: relative;
  border: 1px solid #666;
}
.bottom {
  height: 100px;
  background: #ececec;
  display: flex;
  justify-content: space-around;
}
.direction {
  height: 30px;
  width: 30px;
  font-size: 24px;
  text-align: center;
  line-height: 29px;
  color: #000;
  font-weight: bold;
  cursor: pointer;
  margin: 0 auto;
}
.centerBox {
  overflow: hidden;
  position: relative;
}
.directionCenterBox {
  display: flex;
  position: absolute;
}
.center {
  display: flex;
  justify-content: space-between;
  position: absolute;
}
.DIV {
  height: 30px;
  width: 140px;
  border-radius: 20px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  position: relative;
  margin: 0 20px;
}
.currentDiv {
  background: #e31d24;
  color: #fff;
}
.divAfter {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid red;
  position: absolute;
  top: 0;
  right: 0;
  background: #fff;
  z-index: 1;
  font-size: 5px;
  line-height: 20px;
  color: #000;
}
.matchBox {
  border: 1px solid #7a7a7a;
  border-radius: 5px;
  background: #ececec;
  height: 100px;
  display: flex;
  justify-content: space-around;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 265px;
  margin: 0 20px;
}
.stateStyle {
  position: absolute;
  right: -30px;
  top: -30px;
  width: 60px;
  height: 60px;
  display: inline-block;
  transform: rotate(45deg);
  line-height: 100px;
  text-align: center;
  font-size: 12px;
  color: #fff;
}
.N {
  background: #448aca;
}
.I {
  background: #e31d24;
}
.F {
  background: #3a3c3e;
}
.imgBox {
  height: 50px;
}
.imgBox img {
  height: 100%;
}
.bg {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
.buttomDirection {
  font-size: 30px;
  line-height: 100px;
  font-weight: bold;
  cursor: pointer;
}
.directionBox {
  display: flex;
  justify-content: center;
}
.centerBg {
  display: flex;
  overflow: hidden;
  position: relative;
}
</style>
