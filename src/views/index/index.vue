<template>
  <div>
    <a-row type="flex" justify="end">
      <a-col :span="10" class="lineStyle">
        <a-col :span="2">
          <a-button type="link" size='small'>{{ tip1 }}</a-button>
        </a-col>
        <a-col :span="4">
          <a-button type="link" size='small'>{{ tip2 }}</a-button>
        </a-col>
        <a-col :span="4">
          <a-button type="link" size='small'>{{ tip3 }}</a-button>
        </a-col>
        <a-col :span="3">{{ tip4 }}</a-col>
        <a-col :span='4'>
          <a-dropdown>
            <template v-slot:overlay>
              <a-menu>
                <a-menu-item v-for="item in language" @click="countryChange(item.key)" :key="item.key">{{ item.value }}</a-menu-item>
              </a-menu>
            </template>
            <a-button size='small' style="margin-left: 8px">
              Button
              <DownOutlined />
            </a-button>
          </a-dropdown>
        </a-col>
        <a-col :span="3">{{ tip5 }}</a-col>
        <a-col :span='4'>
          <a-dropdown>
            <template v-slot:overlay>
              <a-menu>
                <a-menu-item v-for="item in language" @click="languageChange(item.value)" :key="item.key">{{ item.value }}</a-menu-item>
              </a-menu>
            </template>
            <a-button size='small' style="margin-left: 8px">{{ currentLan }}
              <DownOutlined />
            </a-button>
          </a-dropdown>
        </a-col>
      </a-col>
    </a-row>
    <a-row class="rowStyle">
      <a-col :span="8">
        <div class="imgBox"><img :src="img" alt=""></div>
      </a-col>
      <a-col :span="8" :offset="8">
        <a-col :span='6'>
          <a-dropdown>
            <template v-slot:overlay>
              <a-menu>
                <a-menu-item v-for="item in language" @click="languageChange(item.value)" :key="item.key">{{ item.value }}</a-menu-item>
              </a-menu>
            </template>
            <a-button size='default' style="margin-left: 8px">{{ currentLan }}
              <DownOutlined />
            </a-button>
          </a-dropdown>
        </a-col>
        <a-col :span='18'>
          <a-input-search v-model:value="imputValue" style="width: 200px" @search="onSearch" />
        </a-col>
      </a-col>
    </a-row>
    <a-row class="rowStyle">
      <a-tabs class="tabsBox">
        <a-tab-pane key="1" tab="新闻">
          Content of Tab Pane 1
        </a-tab-pane>
        <a-tab-pane key="2" tab="日程表/结果">
          Content of Tab Pane 2
        </a-tab-pane>
        <a-tab-pane key="3" tab="队伍">
          Content of Tab Pane 3
        </a-tab-pane>
        <a-tab-pane key="4" tab="玩家">
          Content of Tab Pane 3
        </a-tab-pane>
        <a-tab-pane key="5" tab="店铺">
          Content of Tab Pane 3
        </a-tab-pane>
        <a-tab-pane key="6" tab="排名">
          Content of Tab Pane 3
        </a-tab-pane>
        <a-tab-pane key="7" tab="比赛指南">
          Content of Tab Pane 3
        </a-tab-pane>
      </a-tabs>
    </a-row>
    <a-row class="rowStyle">
      <a-carousel :autoplay='true'>
        <div class="carouselBox" v-for="item in photoList" :key="item.id" @click="intoPhoto(item.url)"><img :src="item.img" alt=""></div>
      </a-carousel>
    </a-row>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { DownOutlined } from "@ant-design/icons-vue";
interface DataProps {
  click: () => void;
}
export default defineComponent({
  components: {
    DownOutlined,
  },
  name: "index",
  setup() {
    const data = reactive({
      tip1: "登录",
      tip2: "注册会员",
      tip3: "我的页面",
      tip4: "国家",
      tip5: "语言",
      currentLan: "中文",
      imputValue: "",
      img: require("@/assets/logo.jpg"),
      language: [
        { key: 1, value: "简体中文" },
        { key: 2, value: "繁体中文" },
        { key: 3, value: "英文" },
      ],
      photoList: [
        { id: 1, img: 1, url: "/a" },
        { id: 2, img: 2, url: "/a" },
        { id: 3, img: 3, url: "/a" },
      ],
      countryChange: (value: number) => {
        console.log(value);
      },
      languageChange: (value: string) => {
        data.currentLan = value;
      },
      onSearch: (value: number | string) => {
        console.log(value);
      },
      intoPhoto: (value: string) => {
        console.log(value);
      },
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>
<style scoped>
.lineStyle {
  line-height: 24px;
}
.imgBox {
  height: 100px;
}
.imgBox img {
  height: 100%;
}
.carouselBox {
  height: 300px;
}
.carouselBox img {
  height: 100%;
}
.tabsBox>>>.ant-tabs-nav-scroll{
  display: flex;
}
</style>
