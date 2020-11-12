<template>
  <div class="content">
    <a-row id="title-g">
      <a-col :span='3'>{{ $t('default.12') }}</a-col>
    </a-row>
    <a-row>
      <div class="otherBox">
        <div>{{ `【${$t(getNewsType(type))}】` }}</div>
        <div>{{ date }}</div>
        <div>
          <a-button @click="goToList">{{ $t('default.245') }}</a-button>
        </div>
      </div>
      <div v-html="html"></div>
    </a-row>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { newsInfoHttp } from "@/axios/api";
// import { DownOutlined } from "@ant-design/icons-vue";
interface HTMLInputEvent {
  value: HTMLInputElement & EventTarget;
}
export default defineComponent({
  name: "newsInfo",
  components: {},
  setup() {
    const Route = useRoute();
    const Router = useRouter();
    const data = reactive({
      type: 1,
      date: "",
      title: "",
      html: null,
      getNewsType: (type: number) => {
        let str = "";
        switch (type) {
          case 1:
            str = "default.235";
            break;
          case 2:
            str = "default.236";
            break;
          case 3:
            str = "default.237";
            break;
          case 4:
            str = "default.134";
            break;
          default:
            str = "default.8";
            break;
        }
        return str;
      },
      goToList: () => {
        Router.go(-1);
      },
    });
    onMounted(() => {
      newsInfoHttp({ newsId: Route.query.value }).then((res) =>{
        data.type = res.data.data.category
        data.date = res.data.data.date
        data.title = res.data.data.title
        data.html = res.data.data.contents
      })
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>
<style scoped>
.content {
  margin: 5px;
}
.otherBox {
  display: flex;
  font-size: 20px;
  justify-content: space-between;
  padding: 5px 0;
  background: #eee;
}
.newsTitle {
  font-size: 20px;
  font-weight: bold;
  padding: 10px 0;
  border-bottom: 2px solid #000;
}
</style>