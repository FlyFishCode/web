<template>
  <a-row type="flex" justify="end">
    <a-col :span="10" class="SlineStyle">
      <a-col :span="2">
        <a-button type="link" size='small'>{{ tip1 }}</a-button>
      </a-col>
      <a-col :span="4">
        <a-button type="link" size='small'>{{ tip2 }}</a-button>
      </a-col>
      <a-col :span="4">
        <a-button type="link" size='small'>{{ tip3 }}</a-button>
      </a-col>
      <a-col :span="2">{{ tip4 }}</a-col>
      <a-col :span='5'>
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
      <a-col :span="2">{{ tip5 }}</a-col>
      <a-col :span='5'>
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
    <a-tabs class="tabsBox" @tabClick="tabClick">
      <a-tab-pane key="/news" tab="新闻"></a-tab-pane>
      <a-tab-pane key="/result" tab="日程表/结果"></a-tab-pane>
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
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { DownOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  name: "hearder",
  components: { DownOutlined },
  setup() {
    const data = reactive({
      tip1: "登录",
      tip2: "注册会员",
      tip3: "我的页面",
      tip4: "国家",
      tip5: "语言",
      currentLan: "中文",
      imputValue: "",
      route: useRouter(),
      img: require("@/assets/logo.jpg"),
      language: [
        { key: 1, value: "简体中文" },
        { key: 2, value: "繁体中文" },
        { key: 3, value: "英文" },
      ],
      languageChange: (value: string) => {
        data.currentLan = value;
      },
      onSearch: () => {
        console.log("onSearch");
      },
      tabClick: (e: string) => {
        data.route.push(e);
      },
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
</style>>