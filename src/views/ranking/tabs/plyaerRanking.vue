<template>
  <div class="content">
    <a-row>
      <a-col :span='12' class="smallTitle">
        <SettingFilled /> {{ $t('default.67') }}
      </a-col>
    </a-row>
    <a-row class="rowStyle rowSearchBox">
      <a-col :lg='3' :xs="12">
        <a-select v-model:value="matchType" @change="matchTypeChange" class="selectBox">
          <a-select-option v-for="item in list" :key="item.value" :value='item.value'>{{ item.label }}</a-select-option>
        </a-select>
      </a-col>
      <a-col :lg='3' :xs="12">
        <a-select v-model:value="matchType" @change="matchTypeChange" class="selectBox">
          <a-select-option v-for="item in list" :key="item.value" :value='item.value'>{{ item.label }}</a-select-option>
        </a-select>
      </a-col>
      <a-col :lg='{ span:2,offset:2 }' :xs="6" class="titleStyle inPhoneTableDisplay">
        <AimOutlined class="fontIcon" />{{ $t('default.27') }}
      </a-col>
      <a-col :lg='3' :xs="12">
        <a-select v-model:value="matchType" @change="matchTypeChange" class="selectBox">
          <a-select-option v-for="item in list" :key="item.value" :value='item.value'>{{ item.label }}</a-select-option>
        </a-select>
      </a-col>
      <a-col :lg='3' :xs="12">
        <a-select v-model:value="matchType" @change="matchTypeChange" class="selectBox">
          <a-select-option v-for="item in list" :key="item.value" :value='item.value'>{{ item.label }}</a-select-option>
        </a-select>
      </a-col>
      <a-col :lg='3' :xs="12">
        <a-select v-model:value="matchType" @change="matchTypeChange" class="selectBox">
          <a-select-option v-for="item in list" :key="item.value" :value='item.value'>{{ item.label }}</a-select-option>
        </a-select>
      </a-col>
      <a-col :lg='2' :xs="12" class="titleStyle inPhoneTableDisplay">
        {{ $t('default.90') }}
      </a-col>
      <a-col :lg='2' class="inPhoneTableDisplay">
        <a-radio-group v-model:value="gender" class="genderBox" @change="genderChange">
          <a-radio :value="1">{{ $t('default.120') }}</a-radio>
          <a-radio :value="2">{{ $t('default.204') }}</a-radio>
        </a-radio-group>
      </a-col>
      <a-col :xs='12' class="showPhoneTable">
        <a-select v-model:value="gender" @change="genderChange" class="selectBox">
          <a-select-option :key="1" :value='1'>{{ $t('default.120') }}</a-select-option>
          <a-select-option :key="2" :value='2'>{{ $t('default.204') }}</a-select-option>
        </a-select>
      </a-col>
    </a-row>

    <a-row class="inPhoneTableDisplay">
      <playerRanking />
    </a-row>

    <!-- 表格 -->
    <a-row class="inPhoneTableDisplay">
      <a-table :row-selection="rowSelection" :columns="columns" :data-source="tableList" :pagination="false" bordered rowKey='key' :customHeaderRow='customHeaderRow' :scroll="{ x: 1900 }">
        <template v-slot:index>{{ $t('default.70') }}</template>
        <template v-slot:date>{{ $t('default.10') }}</template>
        <template v-slot:Rating>{{ $t('default.168') }}</template>
        <template v-slot:PPD>{{ $t('default.169') }}</template>
        <template v-slot:MPR>{{ $t('default.170') }}</template>
        <template v-slot:homeTeam>{{ $t('default.137') }}</template>
        <template v-slot:total>{{ $t('default.202') }}</template>
        <template v-slot:homeWin>{{ $t('default.46') }}</template>
        <template v-slot:homeLose>{{ $t('default.47') }}</template>
        <template v-slot:homeDraw>{{ $t('default.48') }}</template>
        <template v-slot:homeChange>{{ $t('default.185') }}</template>
        <template v-slot:LT>{{ $t('default.205') }}</template>
        <template v-slot:HAT>{{ $t('default.206') }}</template>
        <template v-slot:HT>{{ $t('default.207') }}</template>
        <template v-slot:HTOFF>{{ $t('default.208') }}</template>
        <template v-slot:LTOFF>{{ $t('default.209') }}</template>
        <template v-slot:BED>{{ $t('default.210') }}</template>
        <template v-slot:180>{{ $t('default.211') }}</template>
        <template v-slot:EYE>{{ $t('default.212') }}</template>
        <template v-slot:5M>{{ $t('default.213') }}</template>
        <template v-slot:6M>{{ $t('default.214') }}</template>
        <template v-slot:7M>{{ $t('default.215') }}</template>
        <template v-slot:8M>{{ $t('default.216') }}</template>
        <template v-slot:9M>{{ $t('default.217') }}</template>
        <template v-slot:WH>{{ $t('default.218') }}</template>
        <template v-slot:team="{ text }">
          <div class="tableBox">
            <div class="tableImgBox"><img :src="dialogObj.img" alt=""></div>
            <div class="tableMsgCentent">
              <div @click="entryInfoPage" class="link">{{ text }}</div>
              <div>{{ text }}
                <span style="cursor:pointer" @click="showDialog(text)">
                  <EnvironmentOutlined />
                </span>
              </div>
            </div>
          </div>
        </template>
        <template v-slot:state="{ text }">
          <div class="tableState">
            <div v-if="text === 1" class="plan" @click="showPlan">{{ $t('default.41') }}</div>
            <div v-if="text === 2">{{ 'Ready' }}</div>
            <div v-if="text === 3">{{ 'Finished' }}</div>
          </div>
        </template>
      </a-table>
    </a-row>

    <a-row class="showPhoneTable">
      <a-table :columns="inPhoneColumns" :data-source="tableList" :pagination="false" bordered rowKey='key'>
        <template v-slot:index>{{ $t('default.70') }}</template>
        <template v-slot:date>{{ $t('default.55') }}</template>
        <template v-slot:Rating>{{ $t('default.168') }}</template>
        <template v-slot:team="{ text }">
          <div class="tableBox">
            <div class="tableImgBox"><img :src="dialogObj.img" alt=""></div>
            <div class="tableMsgCentent">
              <div @click="entryInfoPage" class="link">{{ text }}</div>
              <div>{{ text }}
                <span style="cursor:pointer" @click="showDialog(text)">
                  <EnvironmentOutlined />
                </span>
              </div>
            </div>
          </div>
        </template>
      </a-table>
    </a-row>
    <a-modal v-model:visible="visible" :title="dialogObj.title" centered>
      <template v-slot:footer>
        <a-row class="rowStyle dialogBox">
          <a-col :span='8'>
            <div class="imgBox">
              <img :src="dialogObj.img" alt="">
            </div>
          </a-col>
          <a-col :span='16' class="dialog">
            <div>{{ `${$t('default.28')}：${dialogObj.shopName}` }}</div>
            <div>{{ `${$t('default.89')}：${dialogObj.phone}` }}</div>
            <div>{{ `${$t('default.125')}：${dialogObj.address}` }}</div>
          </a-col>
        </a-row>
        <div class="dialogBtn">
          <a-button type="primary" @click="handleOk">{{ $t('default.25') }}</a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import {
  SettingFilled,
  AimOutlined,
  EnvironmentOutlined
} from "@ant-design/icons-vue";
import playerRanking from "@/components/rankingPlayer.vue";
export default defineComponent({
  name: "plyaerRanking",
  components: {
    SettingFilled,
    AimOutlined,
    playerRanking,
    EnvironmentOutlined
  },
  setup() {
    const data = reactive({
      colSpan: 5,
      getDate: () => {
        return "2020-10-17";
      },
      gender: 1,
      matchType: 1,
      list: [
        { value: 1, label: "sssssss" },
        { value: 2, label: "aaaaaaa" }
      ],
      visible: false,
      dialogObj: {
        title: "",
        img: require("@/assets/3.jpg"),
        shopName: "",
        phone: "",
        address: ""
      },
      customHeaderRow: (column: any) => {
        return {
          // on: {
          click: (event: any) => {
            debugger;
            console.log(event, column);
          }
          // },
        };
      },
      rowSelection: {
        columnWidth: 70,
        columnTitle: "对比",
        onChange: (selectedRowKeys: number[]) => {
          if (selectedRowKeys.length == 2) {
            selectedRowKeys.forEach(i => {
              const index = data.tableList.findIndex(j => j.key === i);
              data.tableList.forEach((k, kndex) => {
                if (index !== kndex) {
                  k.disabled = true;
                } else {
                  k.disabled = false;
                }
              });
              const list = data.tableList;
              data.tableList = [...list];
            });
          } else {
            data.tableList.forEach(i => {
              i.disabled = false;
            });
            const list = data.tableList;
            data.tableList = [...list];
          }
        },
        getCheckboxProps: (record: { disabled: boolean }) => ({
          disabled: record.disabled // Column configuration not to be checked
        })
      },
      inPhoneColumns: [
        { dataIndex: "key", key: "time", slots: { title: "index" } },
        {
          dataIndex: "data",
          key: "name",
          slots: { title: "date", customRender: "team" }
        },
        { dataIndex: "data", key: "time", slots: { title: "Rating" } }
      ],
      columns: [
        {
          dataIndex: "key",
          key: "time",
          slots: { title: "index" },
          fixed: "left"
        },
        {
          dataIndex: "data",
          key: "name",
          width: 180,
          slots: { title: "date", customRender: "team" },
          fixed: "left"
        },
        {
          dataIndex: "data",
          key: "time",
          slots: { title: "Rating" },
          width: 90
        },
        { dataIndex: "data", key: "type", slots: { title: "PPD" }, width: 90 },
        { dataIndex: "data", key: "type", slots: { title: "MPR" }, width: 90 },
        {
          children: [
            {
              dataIndex: "homaName",
              key: "homaName",
              slots: { title: "total" }
            },
            {
              dataIndex: "homaName",
              key: "homaName",
              slots: { title: "homeWin" }
            },
            {
              dataIndex: "homeScore",
              key: "homeScore",
              slots: { title: "homeLose" }
            },
            {
              dataIndex: "homeScore",
              key: "homeScore",
              slots: { title: "homeDraw" }
            },
            {
              dataIndex: "homeScore",
              key: "homeScore",
              slots: { title: "homeChange" }
            }
          ],
          slots: { title: "homeTeam" }
        },
        {
          dataIndex: "awayScore",
          key: "awayScore",
          width: 70,
          slots: { title: "LT" }
        },
        {
          dataIndex: "homeScore",
          key: "awayName",
          slots: { title: "HAT" }
        },
        {
          dataIndex: "homeScore",
          key: "homeScore",
          width: 70,
          slots: { title: "HT" }
        },
        {
          dataIndex: "homeScore",
          key: "homeScore",
          width: 90,
          slots: { title: "HTOFF" }
        },
        {
          dataIndex: "homeScore",
          key: "homeScore",
          width: 90,
          slots: { title: "LTOFF" }
        },
        {
          dataIndex: "homeScore",
          key: "homeScore",
          slots: { title: "BED" }
        },
        {
          dataIndex: "homeScore",
          key: "homeScore",
          slots: { title: "180" }
        },
        {
          dataIndex: "homeScore",
          key: "homeScore",
          slots: { title: "EYE" }
        },
        {
          dataIndex: "homeScore",
          key: "homeScore",
          width: 70,
          slots: { title: "5M" }
        },
        {
          dataIndex: "homeScore",
          key: "homeScore",
          width: 70,
          slots: { title: "6M" }
        },
        {
          dataIndex: "homeScore",
          key: "homeScore",
          width: 70,
          slots: { title: "7M" }
        },
        {
          dataIndex: "homeScore",
          key: "homeScore",
          width: 70,
          slots: { title: "8M" }
        },
        {
          dataIndex: "homeScore",
          key: "homeScore",
          width: 70,
          slots: { title: "9M" }
        },
        {
          dataIndex: "homeScore",
          key: "homeScore",
          width: 70,
          slots: { title: "WH" }
        }
      ],
      tableList: [
        {
          data: "2020-10-1",
          time: "18:25",
          state: 1,
          type: 1,
          homaName: "张自然",
          homeScore: 10,
          awayName: "李逍遥",
          awayScore: 5,
          key: 1,
          disabled: false
        },
        {
          data: "2020-10-2",
          time: "19:25",
          state: 2,
          type: 1,
          homaName: "张自然",
          homeScore: 10,
          awayName: "李逍遥",
          awayScore: 5,
          key: 2,
          disabled: false
        },
        {
          data: "2020-10-3",
          time: "17:25",
          state: 3,
          type: 1,
          homaName: "张自然",
          homeScore: 10,
          awayName: "李逍遥",
          awayScore: 5,
          key: 3,
          disabled: false
        },
        {
          data: "2020-10-3",
          time: "17:25",
          state: 3,
          type: 1,
          homaName: "张自然",
          homeScore: 10,
          awayName: "李逍遥",
          awayScore: 5,
          key: 4,
          disabled: false
        },
        {
          data: "2020-10-3",
          time: "17:25",
          state: 3,
          type: 1,
          homaName: "张自然",
          homeScore: 10,
          awayName: "李逍遥",
          awayScore: 5,
          key: 5,
          disabled: false
        }
      ],
      matchTypeChange: (value: number) => {
        console.log(value);
      },
      genderChange: () => {
        console.log(data.gender);
      },
      showDialog: (item: any) => {
        data.dialogObj.title = item.place;
        data.dialogObj.shopName = item.shopName;
        data.dialogObj.phone = item.phoneNumber;
        data.dialogObj.address = item.address;
        data.visible = true;
      },
      handleOk: () => {
        console.log(1);
      }
    });
    return {
      ...toRefs(data)
    };
  }
});
</script>

<style scoped>
.tableState {
  text-align: center;
}
.plan {
  background: red;
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
}
.genderBox {
  display: flex;
  align-items: center;
  height: 32px;
}
.showPhoneTable {
  display: none;
}
.imgBox {
  height: 100px;
  width: 100px;
  margin: 0 auto;
}
.imgBox img {
  width: 100%;
  height: 100%;
}
.tableImgBox {
  height: 60px;
  width: 60px;
  margin: 0 auto;
}
.tableImgBox img {
  width: 100%;
  height: 100%;
}
.tableBox {
  display: flex;
}
.tableMsgCentent {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>
