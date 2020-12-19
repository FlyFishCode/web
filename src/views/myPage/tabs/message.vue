<template>
	<div class="content">
		<a-row>
			<a-col :span="12" class="centerFont"> <SettingFilled /> {{ $t('default.108') }} </a-col>
		</a-row>
		<a-row class="rowSearchBox">
			<a-col :lg="3" :xs="8" class="buttonBox">
				<a-button @click="deleteMsg">
					{{ $t('default.112') }}
				</a-button>
			</a-col>
			<a-col :lg="3" :xs="8" class="buttonBox">
				<div class="titleStyle setting" @click="showDlalog"><SettingFilled /> {{ $t('default.114') }}</div>
			</a-col>
			<!-- <a-col :lg="{ span: 2, offset: 9 }" :xs="8" class="titleStyle">
				{{ $t('default.59') }}
			</a-col>
			<a-col :lg="3" :xs="8">
				<a-select v-model:value="type" @change="typeChange" class="selectBox">
					<a-select-option v-for="item in typeList" :key="item.value" :value="item.value">{{ $t(item.label) }}</a-select-option>
				</a-select>
			</a-col> -->
		</a-row>
		<a-row class="inPhoneTableDisplay">
			<a-table :row-selection="rowSelection" :columns="columns" :data-source="tableList" bordered :pagination="false">
				<template v-slot:title="{ text }">
					<a>{{ text }}</a>
				</template>
				<template v-slot:state>
					<a-button size="small" type="danger" class="tableBtn">{{ $t('default.123') }}</a-button>
				</template>
			</a-table>
		</a-row>

		<a-row class="showPhoneTable">
			<a-table :row-selection="rowSelection" :columns="inPhoneColumns" :data-source="tableList" bordered :pagination="false">
				<template v-slot:title="{ text }">
					<a>{{ text }}</a>
				</template>
				<template v-slot:state>
					<a-button size="small" type="danger" class="tableBtn">{{ $t('default.123') }}</a-button>
				</template>
			</a-table>
		</a-row>

		<entryList :entryPath="entryPath" />
		<a-modal v-model:visible="visible" :title="$t('default.240')" centered @ok="handleOk">
			<a-row>
				<a-col style="textAlign:center">{{ $t('default.241') }}</a-col>
			</a-row>
			<a-row class="rowStyle">
				<a-row type="flex" justify="space-around" class="rowStyle">
					<a-col :span="10">{{ $t('default.115') }}</a-col>
					<a-col :span="3">
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
					<a-col :span="10">{{ $t('default.116') }}</a-col>
					<a-col :span="3">
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
					<a-col :span="10">{{ $t('default.289') }}</a-col>
					<a-col :span="3">
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
					<a-col :span="10">{{ $t('default.117') }}</a-col>
					<a-col :span="3">
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
					<a-col :span="10">{{ $t('default.288') }}</a-col>
					<a-col :span="3">
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
					<a-col :span="10">{{ $t('default.62') }}</a-col>
					<a-col :span="3">
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
					<a-button type="primary" @click="save" size="small">{{ $t('default.242') }}</a-button>
				</div>
			</template>
		</a-modal>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import entryList from '@/components/common/entryList.vue';
import { useRouter } from 'vue-router';
import { SettingFilled, CheckOutlined, CloseOutlined } from '@ant-design/icons-vue';
import { myMessageHttp } from '@/axios/api';
// interface TableRenderProps {
//   text: string;
//   index: number;
// }
export default defineComponent({
	name: 'message',
	components: {
		SettingFilled,
		CheckOutlined,
		CloseOutlined,
		entryList
	},
	setup() {
		const ROUTER = useRouter();
		const data = reactive({
			entryPath: '/myPage',
			total: 1,
			pageNum: 1,
			pageSize: 10,
			visible: false,
			checked: false,
			matchType: 2020,
			matchTypeList: [{ value: 2020, label: '2020' }],
			type: 0,
			typeList: [
				{ value: 0, label: 'default.120' },
				{ value: 1, label: 'default.121' },
				{ value: 2, label: 'default.122' }
			],
			rowSelection: {
				onChange: (selectedRowKeys: number, selectedRows: string) => {
					console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
				}
			},
			columns: [
				{
					title: '比赛类型',
					dataIndex: 'name',
					width: 100
				},
				{
					title: 'DIVISION',
					dataIndex: 'age',
					width: 200
				},
				{
					title: '标题',
					dataIndex: 'address',
					slots: { customRender: 'title' }
				},
				{
					title: '日期',
					dataIndex: 'address',
					width: 200
				},
				{
					title: '刪除',
					dataIndex: 'address',
					width: 100,
					slots: { customRender: 'state' }
				}
			],
			inPhoneColumns: [
				{
					title: 'DIVISION',
					dataIndex: 'age',
					width: 140
				},
				{
					title: '标题',
					dataIndex: 'address',
					slots: { customRender: 'title' },
					width: 200
				},
				{
					title: '日期',
					dataIndex: 'address',
					width: 80
				}
			],
			tableList: [],
			deleteMsg: () => {
				console.log(1);
			},
			Gohistory: () => {
				ROUTER.push('/teamIndex');
			},
			showDlalog: () => {
				data.visible = true;
			},
			handleOk: () => {
				console.log(1);
			},
			save: () => {
				console.log('save');
			}
		});
		const getTableList = () => {
			const obj = {
				playerId: sessionStorage.getItem('userId'),
				type: data.type,
				pageNum: data.pageNum,
				pageSize: data.pageNum
			};
			myMessageHttp(obj).then((res) => {
				console.log(res);
			});
		};
		onMounted(() => {
			getTableList();
		});
		return {
			...toRefs(data)
		};
	}
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
.showPhoneTable {
	display: none;
}
</style>
