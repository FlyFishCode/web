<template>
  <a-row type="flex" justify="end">
    <a-col :span="12" class="SlineStyle">
      <a-col :span="4" v-show="isLogin">
        <a-button type="link" size='small' @click="showLoginBox">{{ tip1 }}</a-button>
        <a-modal id="loginBox" v-model:visible="visible" title="登录" centered>
          <div>
            <a-input v-model:value="userId">
              <template v-slot:prefix>
                <user-outlined type="user" />
              </template>
            </a-input>
            <br />
            <br />
            <a-input v-model:value="passWord" type='passWord'>
              <template v-slot:prefix>
                <LockOutlined />
              </template>
            </a-input>
            <br />
            <br />
            <a-checkbox v-model="autoLogin" @change="onChange">{{ '自动登录' }}</a-checkbox>
          </div>
          <template v-slot:footer>
            <a-row class="rowStyle">
              <a-col :span='24' class="buttonBox">
                <a-button type="primary" @click="login">{{ '登录' }}</a-button>
              </a-col>
            </a-row>
            <a-row class="loginMore">
              <a-col :span='4'>
                <a-button type="link">
                  {{"注册会员"}}
                </a-button>
              </a-col>|
              <a-col :span='4'>
                <a-button type="link">
                  {{"查找ID"}}
                </a-button>
              </a-col>|
              <a-col :span='4'>
                <a-button type="link">
                  {{"查找密码"}}
                </a-button>
              </a-col>
            </a-row>
          </template>
        </a-modal>
      </a-col>
      <a-col :span="3" v-show="isLogin">
        <a-button type="link" size='small'>{{ tip2 }}</a-button>
      </a-col>
      <a-col :span='4' v-show="!isLogin">{{ 'userName' }}</a-col>
      <a-col :span='3' v-show="!isLogin" @click="loginOut">
        <a-button type="link" size='small'>{{ '退出' }}</a-button>
      </a-col>
      <a-col :span="3">
        <a-button type="link" size='small'>{{ tip3 }}</a-button>
      </a-col>
      <a-col :span="3">{{ tip4 }}</a-col>
      <a-col :span='4' class="dropdown">
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
      <a-col :span='4' class="dropdown">
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
      <div class="imgBox" @click="entryIndex"><img :src="img" alt=""></div>
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
  <a-row class="rowStyle boxBG">
    <a-tabs class="tabsBox" type='card' @tabClick="tabClick" :defaultActiveKey='defaultKey'>
      <a-tab-pane key="league" tab="League"></a-tab-pane>
      <!-- <a-tab-pane key="/result" tab=""></a-tab-pane> -->
      <a-tab-pane key="team" tab="Team"></a-tab-pane>
      <a-tab-pane key="4" tab="Players">
        Content of Tab Pane 3
      </a-tab-pane>
      <a-tab-pane key="5" tab="Shop">
        Content of Tab Pane 3
      </a-tab-pane>
      <a-tab-pane key="6" tab="Ranking/Statistics">
        Content of Tab Pane 3
      </a-tab-pane>
      <template v-slot:tabBarExtraContent>
        <a-button @click="interMypage">{{ myPage }}</a-button>
        <a-button @click="showPersonBox">
          <template v-slot:icon>
            <ProfileTwoTone />
          </template>
        </a-button>
      </template>
    </a-tabs>
    <div v-show="showBox" class="showBox animate__animated animate__fadeInRight animate__faster">
      <div class="hearder">
        <div>{{ playerMsg }}</div>
        <div class="closeStyle" @click="closeBox">
          <CloseOutlined />
        </div>
      </div>
    </div>
  </a-row>
</template>
<script lang="ts">
import { DOM } from '@/type/interface'
import { defineComponent, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import {
  DownOutlined,
  ProfileTwoTone,
  CloseOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons-vue";
// import { notification } from 'ant-design-vue'
export default defineComponent({
  name: "hearder",
  components: {
    DownOutlined,
    ProfileTwoTone,
    CloseOutlined,
    UserOutlined,
    LockOutlined,
  },
  setup() {
    const Router = useRouter();
    const data = reactive({
      tip1: "登录",
      tip2: "注册会员",
      tip3: "我的页面",
      tip4: "国家",
      tip5: "语言",
      defaultKey:'league',
      isLogin:true,
      currentLan: "中文",
      imputValue: "",
      visible: false,
      myPage: "MY",
      showBox: false,
      autoLogin: false,
      userId: "",
      passWord: "",
      playerMsg: "玩家信息",
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
        Router.push(e);
      },
      showPersonBox: () => {
        data.showBox = true;
      },
      closeBox: () => {
        data.showBox = false;
      },
      showLoginBox: () => {
        data.visible = true;
      },
      handleOk: () => {
        console.log(1);
      },
      onChange: (e: DOM) => {
        console.log(e);
      },
      entryIndex:() =>{
        Router.push('/')
      },
      login:() =>{
        data.isLogin = false
        console.log(data.userId,data.passWord)
      },
      loginOut:() => {
        data.isLogin = true
      },
      interMypage:() =>{
        Router.push('myPage')
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
}
.boxBG {
  position: relative;
}
.showBox {
  position: absolute;
  top: 0px;
  right: 0px;
  width: 400px;
  height: 800px;
  background: #eee;
  z-index: 1;
  border: 1px solid #000;
}
.hearder {
  background: #4d4d4d;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}
.closeStyle {
  border: 1px solid #fff;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  margin-top: 10px;
  cursor: pointer;
}
#loginBox > .ant-modal-footer {
  text-align: center;
}
.loginMore {
  display: flex;
  justify-content: center;
  text-align: center;
  line-height: 32px;
}
.dropdown>>>button{
  margin-left: 0px!important;
}
</style>