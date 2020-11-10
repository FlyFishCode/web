<template>
  <a-row type="flex" justify="end">
    <a-col :lg="11" class="lineStyle">
      <a-col :lg="3" v-show="!isLogin">
        <a-button type="link" size='small' @click="showLoginBox">{{ $t('default.0') }}</a-button>
        <a-modal id="loginBox" v-model:visible="visible" :title="$t('default.0')" centered>
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
            <a-checkbox v-model="autoLogin" @change="onChange">{{ $t('default.5') }}</a-checkbox>
          </div>
          <template v-slot:footer>
            <a-row>
              <a-col :span='24' class="buttonBox">
                <a-button type="primary" @click="login">{{ $t('default.0') }}</a-button>
              </a-col>
            </a-row>
            <a-row class="loginMore">
              <a-col :span='4'>
                <a-button type="link">
                  {{ $t('default.1') }}
                </a-button>
              </a-col>|
              <a-col :span='4'>
                <a-button type="link">
                  {{ $t('default.6') }}
                </a-button>
              </a-col>|
              <a-col :span='4'>
                <a-button type="link">
                  {{ $t('default.7') }}
                </a-button>
              </a-col>
            </a-row>
          </template>
        </a-modal>
      </a-col>
      <a-col :lg="3" v-show="!isLogin">
        <a-button type="link" size='small'>{{ $t('default.1') }}</a-button>
      </a-col>
      <a-col :lg='3' v-show="isLogin">{{ userName }}</a-col>
      <a-col :lg='3' v-show="isLogin" @click="loginOut">
        <a-button type="link" size='small'>{{ $t('default.126') }}</a-button>
      </a-col>
      <a-col :lg="3">
        <a-button type="link" size='small'>{{ $t('default.2') }}</a-button>
      </a-col>
      <a-col :lg="3">{{ $t('default.3') }}</a-col>
      <a-col :lg='3'>
        <a-select v-model:value="country" style="width: 70px" size='small' @change="countryChange">
          <a-select-option v-for="item in countryList" :key="item.key" :value='item.key'>{{ item.label }}</a-select-option>
        </a-select>
      </a-col>
      <a-col :lg="4">{{ $t('default.4') }}</a-col>
      <a-col :lg='4'>
        <a-select v-model:value="$i18n.locale" style="width: 100px" size='small'>
          <a-select-option v-for="item in languageList" :key="item.key" :value='item.key'>{{ $t(item.label) }}</a-select-option>
        </a-select>
      </a-col>
    </a-col>
  </a-row>
  <a-row class="lineBox">
    <a-col :span="8">
      <div class="imgBox" @click="entryIndex"><img :src="img" alt=""></div>
    </a-col>
    <a-col :span="8" :offset="8">
      <a-col :span='6'>
        <a-select v-model:value="type" style="width: 100px" @change="typeChange">
          <a-select-option v-for="item in typeList" :key="item.key" :value='item.key'>{{ $t(item.label) }}</a-select-option>
        </a-select>
      </a-col>
      <a-col :span='18'>
        <a-input-search v-model:value="imputValue" style="width: 200px" @search="onSearch" />
      </a-col>
    </a-col>
  </a-row>
  <a-row class="rowStyle boxBG">
    <a-tabs class="tabsBox" type='card' @tabClick="tabClick" :defaultActiveKey='defaultKey'>
      <a-tab-pane key="league" :tab="$t('default.8')"></a-tab-pane>
      <a-tab-pane key="team" :tab="$t('default.9')"></a-tab-pane>
      <a-tab-pane key="players" :tab="$t('default.10')"></a-tab-pane>
      <a-tab-pane key="shop" :tab="$t('default.127')"></a-tab-pane>
      <a-tab-pane key="ranking" :tab="$t('default.26')"></a-tab-pane>
      <template v-slot:tabBarExtraContent>
        <a-button @click="interMypage">{{ $t('default.2') }}</a-button>
        <a-button @click="showPersonBox">
          <template v-slot:icon>
            <ProfileTwoTone />
          </template>
        </a-button>
      </template>
    </a-tabs>
    <div v-show="showBox" class="showBox animate__animated animate__fadeInRight animate__faster">
      <div class="hearder">
        <div>{{ $t('default.128') }}</div>
        <div class="closeStyle" @click="closeBox">
          <CloseOutlined />
        </div>
      </div>
      <div class="content">
        <div class="personalMsg">
          <div class="contentImgBox">
            <img :src="myInfo.img" alt="">
          </div>
          <div class="contentRight">
            <div class="contentName">{{ myInfo.name }}</div>
            <div>{{ myInfo.number }}</div>
            <div>
              <a-button type="danger">{{ 'Profile' }}</a-button>
            </div>
          </div>
        </div>
        <div id="myMsgCard">
          <div class="Mytabs">
            <a-button :type="isMyMatch?'primary':''" @click="myMatchClick">{{ $t('default.129') }}</a-button>
            <a-button :type="isMyMatch?'':'primary'" @click="matchTableClick">{{ $t('default.79') }}</a-button>
          </div>
          <div v-if="isMyMatch">
            <div v-for="item in myInfo.myMatch" :key="item.index" class="match">
              <div class="myMatchImgBox">
                <img :src="item.img" alt="">
              </div>
              <div class="myMatchRight">
                <div class="myMatchName">{{ item.matchName }}</div>
                <div>{{ item.date }}</div>
              </div>
            </div>
            <div class="moreStyle" @click="entryMaPage">
              <PlusCircleOutlined twoToneColor="#ff5122" /> {{ $t('default.25') }}
            </div>
          </div>
          <div v-else>
            <!-- <div v-if="item in myInfo.matchTimeTable" :key="item.index"></div> -->
            <div class="moreStyle">
              <PlusCircleOutlined twoToneColor="#ff5122" /> {{ $t('default.25') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </a-row>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import { loginHttp } from "@/axios/api";
import { useRouter } from "vue-router";
import {
  ProfileTwoTone,
  CloseOutlined,
  UserOutlined,
  LockOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
export default defineComponent({
  name: "hearder",
  components: {
    ProfileTwoTone,
    CloseOutlined,
    UserOutlined,
    LockOutlined,
    PlusCircleOutlined,
  },
  setup() {
    const Router = useRouter();
    const data = reactive({
      defaultKey: "league",
      isLogin: false,
      imputValue: "",
      visible: false,
      showBox: false,
      autoLogin: false,
      userId: "",
      passWord: "",
      userName: "",
      country: 1,
      img: require("@/assets/logo.jpg"),
      type: 1,
      isMyMatch: true,
      myInfo: {
        name: "李逍遥",
        number: 4206251998858745210,
        img: require("@/assets/1.jpg"),
        myMatch: [
          {
            id: 1,
            img: require("@/assets/1.jpg"),
            matchName: "Demo_League",
            date: "2020-10-15 ~ 2021-06-30",
          },
          {
            id: 2,
            img: require("@/assets/1.jpg"),
            matchName: "Demo_League13隊長會",
            date: "2020-10-15 ~ 2021-06-30",
          },
          {
            id: 3,
            img: require("@/assets/1.jpg"),
            matchName: "Demo_league12_1",
            date: "2020-10-15 ~ 2021-06-30",
          },
        ],
        matchTimeTable: [
          {
            id: 1,
            img: require("@/assets/1.jpg"),
            matchName: "Demo_League",
            date: "2020-10-15 ~ 2021-06-30",
          },
          {
            id: 2,
            img: require("@/assets/1.jpg"),
            matchName: "Demo_League13隊長會",
            date: "2020-10-15 ~ 2021-06-30",
          },
          {
            id: 3,
            img: require("@/assets/1.jpg"),
            matchName: "Demo_league12_1",
            date: "2020-10-15 ~ 2021-06-30",
          },
        ],
      },
      countryList: [
        { key: 1, label: "中国" },
        { key: 2, label: "美国" },
        { key: 3, label: "英国" },
      ],
      languageList: [
        { key: "zh-cn", label: "default.130" },
        { key: "zh-tw", label: "default.131" },
        { key: "en-us", label: "default.132" },
      ],
      typeList: [
        { key: 1, label: "default.8" },
        { key: 2, label: "default.9" },
        { key: 3, label: "default.10" },
        { key: 4, label: "default.127" },
      ],
      typeChange: (value: number) => {
        console.log(value);
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
      entryIndex: () => {
        Router.push("/");
      },
      login: () => {
        const obj = {
          username: data.userId,
          password: data.passWord,
        };
        loginHttp(false, obj).then((res) => {
          if (res.data.code === 100) {
            message.success(res.data.msg);
            sessionStorage.setItem("token", res.data.data.token);
            sessionStorage.setItem("userId", res.data.data.memberId);
            sessionStorage.setItem("userName", res.data.data.username);
            data.userName = res.data.data.username;
            data.isLogin = true;
            data.visible = false;
            Router.push("myPage");
          } else {
            message.warning(res.data.msg);
          }
        });
      },
      loginOut: () => {
        data.isLogin = false;
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("userName");
      },
      interMypage: () => {
        Router.push("myPage");
      },
      countryChange: (value: number) => {
        console.log(value);
      },
      myMatchClick: () => {
        data.isMyMatch = true;
      },
      matchTableClick: () => {
        data.isMyMatch = false;
      },
      entryMaPage: () => {
        data.showBox = false;
        Router.push("/myPage");
      },
    });
    onMounted(() => {
      if (sessionStorage.getItem("userId")) {
        data.isLogin = true;
        data.userName = sessionStorage.getItem("userName") as string;
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
.dropdown >>> button {
  margin-left: 0px !important;
}
.lineStyle {
  line-height: 24px;
}
.moreStyle {
  height: 35px;
  line-height: 35px;
  border: 1px solid #d2d2d2;
  color: #ff5122;
  cursor: pointer;
  margin: 10px 0;
}
.personalMsg {
  display: flex;
}
.contentImgBox {
  height: 140px;
  width: 140px;
  padding: 20px;
}
.contentImgBox img {
  width: 100%;
}
.contentRight {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: left;
}
.contentName {
  font-size: 20px;
}
.Mytabs button {
  width: 50%;
}
.myMatchImgBox {
  width: 50px;
  height: 50px;
}
.myMatchImgBox img {
  width: 100%;
}
.match {
  display: flex;
  padding: 10px;
  border: 1px solid #ff5122;
  margin: 4px 0;
}
.myMatchRight {
  padding-left: 15px;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.myMatchName:hover {
  text-decoration: underline;
  cursor: pointer;
}
.lineBox {
  padding: 15px 0;
  border-bottom: 2px solid #4b4b4b;
}
</style>