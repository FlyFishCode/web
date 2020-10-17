<template>
  <div class="content">
    <a-row>
      <divTitle :msg="title" :lastDate="getDate()" />
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import divTitle from "@/components/DividingLine.vue";
export default defineComponent({
  name: "templete",
  components: {
    divTitle,
  },
  setup() {
    const data = reactive({
      title: "队伍",
      getDate:() => {
        return '2020-10-17'
      }
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped>
</style>
