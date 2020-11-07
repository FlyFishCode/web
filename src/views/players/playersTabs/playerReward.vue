<template>
  <div class="content">
    <a-row>
      <a-col :span='5' class="smallTitle">
        <SettingFilled /> {{ `${title}` }}
      </a-col>
    </a-row>
    <a-row>
      <a-col :span='3'>
        <a-select v-model:value="year" @change="yearChange" style="width: 120px">
          <a-select-option v-for="item in yearList" :key="item.value" :value='item.value'>{{ item.label }}</a-select-option>
        </a-select>
      </a-col>
      <a-col :span='3'>
        <a-select v-model:value="matchType" @change="matchTypeChange" style="width: 120px">
          <a-select-option v-for="item in matchTypeList" :key="item.value" :value='item.value'>{{ item.label }}</a-select-option>
        </a-select>
      </a-col>
    </a-row>
    <a-table :columns="columns" :data-source="matchList" bordered id="table" :pagination='false'>
      <template v-slot:index="{ index }">
        <div>{{ `${index + 1 }` }}</div>
      </template>
    </a-table>
    <a-row class="rowStyle">
      <a-col :span='2' :offset="22">
        <a-button type="danger" size="small" @click="goHistory">{{ $t('default.139') }}</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { SettingFilled } from "@ant-design/icons-vue";
import { useRouter } from 'vue-router';
export default defineComponent({
  name: "playerReward",
  components: {
    SettingFilled,
  },
  setup() {
    const Router = useRouter()
    const data = reactive({
      title: "玩家奖励",
      year: 2020,
      matchType: 2020,
      yearList: [{ value: 2020, label: "2020" }],
      matchTypeList: [{ value: 2020, label: "2020" }],
      columns: [
        {
          title: "MONTH",
          align:'center',
          dataIndex: "age",
          slots: { customRender: "index" },
        },
        {
          title: "LT",
          dataIndex: "age",
          key: "address",
        },
        {
          title: "HAT",
          dataIndex: "age",
          key: "address",
        },
        {
          title: "HT",
          dataIndex: "age",
          key: "address",
        },
        {
          title: "HT.OFF",
          dataIndex: "age",
          key: "address",
        },
        {
          title: "LT.OFF",
          dataIndex: "age",
          key: "address",
        },
        {
          title: "BED",
          dataIndex: "age",
          key: "address",
        },
        {
          title: "180",
          dataIndex: "age",
          key: "address",
        },
        {
          title: "LT",
          dataIndex: "age",
          key: "address",
        },
        {
          title: "EYE",
          dataIndex: "age",
          key: "address",
        },
        {
          title: "5M",
          dataIndex: "age",
          key: "address",
        },
        {
          title: "6M",
          dataIndex: "age",
          key: "address",
        },
        {
          title: "7M",
          dataIndex: "age",
          key: "address",
        },
        {
          title: "8M",
          dataIndex: "age",
          key: "address",
        },
        {
          title: "9M",
          dataIndex: "age",
          key: "address",
        },
        {
          title: "WH",
          dataIndex: "age",
          key: "address",
        },
      ],
      matchList: [
        {
          key: "1",
          name: "John Brown",
          age: 32,
        },
        {
          key: "2",
          name: "Jim Green",
          age: 42,
        },
        {
          key: "3",
          name: "Joe Black",
          age: 32,
        },
      ],
      yearChange: (value: number) => {
        console.log(value);
      },
      matchTypeChange: (value: number) => {
        console.log(value);
      },
      goHistory: () => {
        Router.push('/players')
      },
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped>
</style>
