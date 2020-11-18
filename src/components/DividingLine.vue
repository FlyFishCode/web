<template>
  <div>
    <a-row class="line">
      <a-col :lg='{ span: span , offset:0 }' :xs='{ span:span , offset:0 }' class="fontStyle">{{ $t(msg) }}</a-col>
      <a-col v-if="lastDate" :lg='{ span:8 , offset:4 }' :xs='{ span:8 , offset:3 }' class="timeStyle">{{ `${$t('default.19')} :${lastDate}` }}</a-col>
      <a-col v-if="showMore" :lg='{ span:3 , offset:5 }' :xs="{ span:5 , offset:3 }" class="shwoMoreBox">
        <div class="showMore" @click="entryPage">{{ $t('default.133') }}</div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "DividingLine",
  props: {
    msg: String,
    span: Number,
    lastDate: String,
    showMore: Boolean,
    path: String,
  },
  setup(props) {
    const Router = useRouter();
    const entryPage = () => {
      Router.push(props.path as string);
    };
    return {
      entryPage,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.line {
  height: 50px;
  border-radius: 20px 20px 0 0;
  border: 1px solid #2b2b2b;
  margin: 10px 0;
}
.fontStyle {
  font-size: 30px;
}
.timeStyle {
  color: red;
  height: 50px;
  line-height: 50px;
}
.shwoMoreBox {
  height: 100%;
  display: flex;
  align-items: center;
}
.showMore {
  height: 30px;
  line-height: 30px;
  border: 1px solid #000;
  padding: 0 10px;
  cursor: pointer;
}
.showMore:hover {
  border-color: #999;
}
</style>
