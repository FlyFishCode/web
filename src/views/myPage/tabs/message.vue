<template>
	<div class="content">
		<a-row>
			<a-col :span="12" class="centerFont"> <SettingFilled /> {{ $t('default.108') }} </a-col>
		</a-row>
		<a-row class="rowSearchBox">
			<a-col :lg="3" :xs="8" class="buttonBox">
				<a-button @click="deleteMessage">
					{{ $t('default.112') }}
				</a-button>
			</a-col>
			<a-col :lg="3" :xs="8" class="buttonBox">
				<a-button @click="deleteAll">
					{{ $t('default.113') }}
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
			<a-table :row-selection="rowSelection" :columns="columns" :data-source="tableList" bordered :pagination="false" rowKey="noticeId">
				<template v-slot:type>
					<div class="imgBox">
						<img :src="require('@/assets/1.jpg')" alt="" />
					</div>
				</template>
				<template v-slot:title="{ text }">
					<div class="link">{{ text }}</div>
				</template>
			</a-table>
		</a-row>

		<a-row class="showPhoneTable">
			<a-table :row-selection="rowSelection" :columns="inPhoneColumns" :data-source="tableList" bordered :pagination="false" rowKey="noticeId">
				<template v-slot:title="{ text }">
					<div class="link">{{ text }}</div>
				</template>
			</a-table>
		</a-row>
		<div class="pagination">
			<a-pagination v-model:current="pageNum" v-model:pageSize="pageSize" :total="total" @change="pageChange" />
		</div>
		<entryList :entryPath="entryPath" />
		<a-modal v-model:visible="visible" :title="$t('default.240')" centered>
			<a-row>
				<a-col style="textAlign:center">{{ $t('default.241') }}</a-col>
			</a-row>
			<a-row class="rowStyle">
				<a-row type="flex" justify="space-around" class="rowStyle">
					<a-col :span="10">{{ $t('default.289') }}</a-col>
					<a-col :span="3">
						<a-switch v-model:checked="setList.mode">
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
					<a-col :span="10">{{ $t('default.308') }}</a-col>
					<a-col :span="3">
						<a-switch v-model:checked="setList.updateMatch">
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
					<a-col :span="10">{{ $t('default.307') }}</a-col>
					<a-col :span="3">
						<a-switch v-model:checked="setList.submitMatch">
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
					<a-col :span="10">{{ $t('default.309') }}</a-col>
					<a-col :span="3">
						<a-switch v-model:checked="setList.homeShop">
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
					<a-col :span="10">{{ $t('default.310') }}</a-col>
					<a-col :span="3">
						<a-switch v-model:checked="setList.time">
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
						<a-switch v-model:checked="setList.result">
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
					<a-button type="primary" @click="saveSetType" size="small">{{ $t('default.242') }}</a-button>
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
import { myMessageHttp, myMessageSetList, myMessageListSet, messageListDeleteHttp } from '@/axios/api';
import { message } from 'ant-design-vue';
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
		const userId = sessionStorage.getItem('userId');
		let selectList: any = [];
		const data = reactive({
			entryPath: '/myPage',
			setList: {
				mode: false,
				updateMatch: false,
				submitMatch: false,
				homeShop: false,
				time: false,
				result: false
			},
			total: 1,
			pageNum: 1,
			pageSize: 10,
			visible: false,
			checked: false,
			matchType: 2020,
			matchTypeList: [{ value: 2020, label: '2020' }],
			rowSelection: {
				onChange: (selectedRowKeys: number, selectedRows: any) => {
					selectList = selectedRows.map((i: any) => i.noticeId);
					console.log(selectList);
				}
			},
			columns: [
				{
					title: '比赛类型',
					dataIndex: 'name',
					width: 100,
					slots: { customRender: 'type' }
				},
				{
					title: 'DIVISION',
					dataIndex: 'division',
					width: 200
				},
				{
					title: '标题',
					dataIndex: 'competitionName',
					slots: { customRender: 'title' }
				},
				{
					title: '日期',
					dataIndex: 'cdateInt',
					width: 200
				}
			],
			inPhoneColumns: [
				{
					title: 'DIVISION',
					dataIndex: 'division',
					width: 140
				},
				{
					title: '标题',
					dataIndex: 'competitionName',
					slots: { customRender: 'title' },
					width: 200
				},
				{
					title: '日期',
					dataIndex: 'cdateInt',
					width: 80
				}
			],
			tableList: [{ noticeId: 0 }],
			pageChange: () => {
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getTableList();
			},
			deleteMessage: () => {
				messageListDeleteHttp({ playerId: userId, noticeIdList: selectList }).then((res) => {
					message.warning(res.data.msg);
					// eslint-disable-next-line @typescript-eslint/no-use-before-define
					getTableList();
				});
			},
			deleteAll: () => {
				console.log(1);
			},
			Gohistory: () => {
				ROUTER.push('/teamIndex');
			},
			showDlalog: () => {
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getMyMessageSetList();
				data.visible = true;
			},
			saveSetType: () => {
				const obj = {
					mode: Number(data.setList.mode),
					updateMatch: Number(data.setList.updateMatch),
					submitMatch: Number(data.setList.submitMatch),
					homeShop: Number(data.setList.homeShop),
					time: Number(data.setList.time),
					result: Number(data.setList.result),
					playerId: userId
				};
				myMessageListSet(obj).then((res) => {
					message.warning(res.data.msg);
					// eslint-disable-next-line @typescript-eslint/no-use-before-define
					getTableList();
					data.visible = false;
				});
			}
		});
		const getTableList = () => {
			const obj = {
				playerId: userId,
				pageNum: data.pageNum,
				pageSize: data.pageSize
			};
			myMessageHttp(obj).then((res) => {
				data.tableList = res.data.data.list;
				data.total = res.data.data.total;
			});
		};
		const getMyMessageSetList = () => {
			myMessageSetList({ playerId: userId }).then((res) => {
				const response = res.data.data;
				data.setList.mode = Boolean(response.mode);
				data.setList.updateMatch = Boolean(response.updateMatch);
				data.setList.submitMatch = Boolean(response.submitMatch);
				data.setList.homeShop = Boolean(response.homeShop);
				data.setList.time = Boolean(response.time);
				data.setList.result = Boolean(response.result);
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
.imgBox {
	width: 50px;
	height: 50px;
}
.imgBox img {
	width: 100%;
}
</style>
