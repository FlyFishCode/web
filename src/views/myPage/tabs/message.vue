<template>
  <div class="content">
    <a-row>
      <a-col :span='2' class="centerFont">
        <SettingFilled /> {{ title }}
      </a-col>
    </a-row>
    <a-row class="rowSearchBox">
      <a-col :span='3' class="buttonBox">
        <a-button @click="deleteMsg">
          {{ '选择删除' }}
        </a-button>
      </a-col>
      <a-col :span='3' class="buttonBox">
        <a-button @click="deleteAll" type='danger'>
          {{ '全部删除' }}
        </a-button>
      </a-col>
      <a-col :span='3' class="buttonBox">
        <div class="titleStyle setting" @click="showDlalog">
          <SettingFilled /> {{ '消息接收设置' }}
        </div>
      </a-col>
      <a-col :span='2' :offset='8' class="titleStyle">
        {{ '比賽類型' }}
      </a-col>
      <a-col :span='2' class="dropdown">
        <a-select v-model:value="matchType" @change="matchTypeChange" style="width: 100px">
          <a-select-option v-for="item in matchTypeList" :key="item.value" :value='item.value'>{{ item.label }}</a-select-option>
        </a-select>
      </a-col>
      <a-col :span='3' class="dropdown">
        <a-select v-model:value="matchType" @change="matchTypeChange" style="width: 100px">
          <a-select-option v-for="item in matchTypeList" :key="item.value" :value='item.value'>{{ item.label }}</a-select-option>
        </a-select>
      </a-col>
    </a-row>
    <a-row>
      <a-table :row-selection="rowSelection" :columns="columns" :data-source="data" bordered :pagination='paginationProps'>
        <template v-slot:title="{ text }">
          <a>{{ text }}</a>
        </template>
        <template v-slot:state="{  }">
          <a-button size='small' type="danger" class="tableBtn">{{ '删除' }}</a-button>
        </template>
      </a-table>
    </a-row>
    <a-row class="rowStyle">
      <a-col :span='2' :offset="22">
        <a-button type="danger" size="small" @click="Gohistory">{{ '列表' }}</a-button>
      </a-col>
    </a-row>
    <a-modal v-model:visible="visible" title="消息接收設置" centered @ok="handleOk">
      <a-row>
        <a-col style="textAlign:center">{{ '本功能表提供比賽服務相關的重要活動通知' }}</a-col>
      </a-row>
      <a-row class="rowStyle">
        <a-row type="flex" justify="space-around">
          <a-col :span='10'>{{ '参赛批准' }}</a-col>
          <a-col :span='3'>
            <a-switch v-model:checked="checked">
              <template v-slot:checkedChildren>
                <check-outlined />
              </template>
              <template v-slot:unCheckedChildren>
                <close-outlined />
              </template>
            </a-switch>
          </a-col>
        </a-row>
        <a-row type="flex" justify="space-around" class="rowStyle">
          <a-col :span='10'>{{ '已确认比赛排阵' }}</a-col>
          <a-col :span='3'>
            <a-switch v-model:checked="checked">
              <template v-slot:checkedChildren>
                <check-outlined />
              </template>
              <template v-slot:unCheckedChildren>
                <close-outlined />
              </template>
            </a-switch>
          </a-col>
        </a-row>
        <a-row type="flex" justify="space-around">
          <a-col :span='10'>{{ '更改比赛时间/对阵地点' }}</a-col>
          <a-col :span='3'>
            <a-switch v-model:checked="checked">
              <template v-slot:checkedChildren>
                <check-outlined />
              </template>
              <template v-slot:unCheckedChildren>
                <close-outlined />
              </template>
            </a-switch>
          </a-col>
        </a-row>
        <a-row type="flex" justify="space-around" class="rowStyle">
          <a-col :span='10'>{{ '比赛结果' }}</a-col>
          <a-col :span='3'>
            <a-switch v-model:checked="checked">
              <template v-slot:checkedChildren>
                <check-outlined />
              </template>
              <template v-slot:unCheckedChildren>
                <close-outlined />
              </template>
            </a-switch>
          </a-col>
        </a-row>
      </a-row>
      <template v-slot:footer>
        <div class="footerBox">
          <a-button type="primary" @click="save">{{ '确定' }}</a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import {
  SettingFilled,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons-vue";
// interface TableRenderProps {
//   text: string;
//   index: number;
// }
export default defineComponent({
  name: "templete",
  components: {
    SettingFilled,
    CheckOutlined,
    CloseOutlined,
  },
  setup() {
    const Router = useRouter();
    const data = reactive({
      title: "消息",
      colSpan: 5,
      total: 100,
      visible: false,
      checked: false,
      matchType:2020,
      matchTypeList:[
        { value:2020,label:'2020' }
      ],
      paginationProps: {
        showSizeChanger: true,
        showQuickJumper: false,
        showTotal: () => `共${data.total}条`,
        pageSize: 10,
        current: 1,
        onShowSizeChange: (current: number, pageSize: number) => {
          console.log(current, pageSize);
        },
        onChange: (current: number) => {
          console.log(current);
        },
      },
      rowSelection: {
        onChange: (selectedRowKeys: number, selectedRows: string) => {
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
          );
        },
      },
      columns: [
        {
          title: "比赛类型",
          dataIndex: "name",
          width: 100,
        },
        {
          title: "DIVISION",
          dataIndex: "age",
          width: 200,
        },
        {
          title: "标题",
          dataIndex: "address",
          slots: { customRender: "title" },
        },
        {
          title: "日期",
          dataIndex: "address",
          width: 200,
        },
        {
          title: "刪除",
          dataIndex: "address",
          width: 100,
          slots: { customRender: "state" },
        },
      ],
      data: [
        {
          key: "1",
          name: "John Brown",
          age: 32,
          address: "New York No. 1 Lake Park",
        },
        {
          key: "2",
          name: "Jim Green",
          age: 42,
          address: "London No. 1 Lake Park",
        },
        {
          key: "3",
          name: "Joe Black",
          age: 32,
          address: "Sidney No. 1 Lake Park",
        },
        {
          key: "4",
          name: "Disabled User",
          age: 99,
          address: "Sidney No. 1 Lake Park",
        },
      ],
      getDate: () => {
        return "2020-10-17";
      },
      handleMenuClick: () => {
        console.log(11);
      },
      deleteMsg: () => {
        console.log(1);
      },
      deleteAll: () => {
        console.log(1);
      },
      calendarlChange: (value: string) => {
        console.log(value);
      },
      onSelect: (value: string) => {
        console.log(value);
      },
      Gohistory: () => {
        Router.push("/teamIndex");
      },
      goPlay: () => {
        Router.push("/teamIndex");
      },
      showDlalog: () => {
        data.visible = true;
      },
      handleOk: () => {
        console.log(1);
      },
      save: () => {
        console.log("save");
      },
      matchTypeChange:(value: number) =>{
        console.log(value)
      }
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped>
.btnClass {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
}
.stateBox {
  text-align: center;
}
.inPlay {
  background: red;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
}
.dropdown button {
  margin-left: 0px !important;
}
.tableBtn {
  color: #fff;
  border-radius: 10px;
}
.setting {
  cursor: pointer;
}
.footerBox {
  text-align: center;
}
</style>
