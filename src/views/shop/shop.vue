<template>
	<div class="content">
		<divTitle :msg="title" :span="colSpan" />
		<a-row class="rowStyle">
			<a-col :lg="12" :xs="24">
				<div id="container"></div>
			</a-col>
			<a-col :lg="12" class="mapSearch inPhoneTableDisplay">
				<div class="shopTitle">{{ $t('default.158') }}</div>
				<div class="center">
					<div>{{ $t('default.27') }}</div>
					<div class="selectBox">
						<a-select class="selectBG" v-model:value="countryId" @change="countryChange" allowClear>
							<a-select-option v-for="item in areaList" :key="item.countryId" :value="item.countryId">{{ item.countryName }}</a-select-option>
						</a-select>
						<a-select class="selectBG" v-model:value="areaId" @change="areaChange" allowClear>
							<a-select-option v-for="item in cityList" :key="item.areaId" :value="item.areaId">{{ item.areaName }}</a-select-option>
						</a-select>
						<!-- <a-select v-model:value="city">
              <a-select-option v-for="city in cityList" :key="city.value" :value='city.value'>
                {{ city.label }}
              </a-select-option>
            </a-select> -->
					</div>
				</div>
				<div class="center">
					<div>{{ $t('default.28') }}</div>
					<div>
						<a-select
							v-model:value="shopName"
							show-search
							style="width: 100%"
							:placeholder="$t('default.160')"
							option-filter-prop="children"
							:getPopupContainer="(trigger) => trigger.parentNode"
							:filter-option="filterOption"
							allowClear
						>
							<a-select-option v-for="item in shopNameList" :key="item.shopId" :value="item.shopName">{{ item.shopName }}</a-select-option>
						</a-select>
					</div>
				</div>
				<div class="center">
					<div>{{ $t('default.159') }}</div>
					<div>
						<a-checkbox v-model:checked="a1">{{ 'A1' }}</a-checkbox>
						<a-checkbox v-model:checked="w1">{{ 'W1' }}</a-checkbox>
					</div>
				</div>
				<div class="center">
					<div>{{ $t('default.119') }}</div>
					<div>
						<a-checkbox v-model:checked="league">{{ $t('default.8') }}</a-checkbox>
					</div>
				</div>
				<div class="btnBg">
					<a-button type="danger" @click="search">{{ $t('default.16') }}</a-button>
				</div>
			</a-col>
		</a-row>

		<a-row>
			<a-col :lg="0" :xs="24" class="showPhoneTable">
				<div class="shopTitle">{{ $t('default.158') }}</div>
				<div class="center">
					<div>{{ $t('default.27') }}</div>
					<div class="selectBox">
						<a-select v-model:value="countryId" @change="countryChange" class="selectBox" allowClear>
							<a-select-option v-for="item in areaList" :key="item.countryId" :value="item.countryId">{{ item.countryName }}</a-select-option>
						</a-select>
						<a-select v-model:value="areaId" class="selectBox" @change="areaChange" allowClear>
							<a-select-option v-for="item in cityList" :key="item.areaId" :value="item.areaId">{{ item.areaName }}</a-select-option>
						</a-select>
						<!-- <a-select v-model:value="city">
              <a-select-option v-for="city in cityList" :key="city.value" :value='city.value'>
                {{ city.label }}
              </a-select-option>
            </a-select> -->
					</div>
				</div>
				<div class="center">
					<div>{{ $t('default.28') }}</div>
					<div>
						<a-select
							v-model:value="shopName"
							show-search
							style="width: 100%"
							:placeholder="$t('default.160')"
							option-filter-prop="children"
							:getPopupContainer="(trigger) => trigger.parentNode"
							:filter-option="filterOption"
							allowClear
						>
							<a-select-option v-for="item in shopNameList" :key="item.shopId" :value="item.shopName">{{ item.shopName }}</a-select-option>
						</a-select>
					</div>
				</div>
				<div class="center">
					<div>{{ $t('default.159') }}</div>
					<div>
						<a-checkbox v-model:checked="a1">{{ 'A1' }}</a-checkbox>
						<a-checkbox v-model:checked="w1">{{ 'W1' }}</a-checkbox>
					</div>
				</div>
				<div class="center">
					<div>{{ $t('default.119') }}</div>
					<div>
						<a-checkbox v-model:checked="league">{{ $t('default.8') }}</a-checkbox>
					</div>
				</div>
				<div class="btnBg">
					<a-button type="danger" @click="search">{{ $t('default.16') }}</a-button>
				</div>
			</a-col>
		</a-row>
		<a-row class="shopRow">
			<a-col :span="12" class="centerFont"> <SettingFilled /> {{ `${$t('default.161')}(${shopList.length})` }} </a-col>
		</a-row>
		<a-row v-for="(item, index) in shopList" :key="item.id">
			<a-row class="eveyTeam">
				<a-col :lg="3" :xs="4" class="imgColStyle">
					<img class="matchImg" :src="item.shopImg" alt="" />
				</a-col>
				<a-col :lg="{ span: 8, offset: 0 }" :xs="{ span: 16, offset: 2 }" class="infoClass">
					<div class="teamStyle" @click="showShopInfo(item.shopId)">{{ item.shopName }}</div>
					<div v-if="item.shopAddress" class="placeStyle">
						<div>{{ item.shopAddress }}</div>
						/
						<div class="counyStyle">{{ item.couny }}</div>
						<span @click="showDetail(item)">
							<EnvironmentOutlined />
						</span>
					</div>
				</a-col>
				<a-col :lg="4" :xs="0" class="vipBox">
					<div>{{ $t('default.89') }}</div>
					<div><PhoneOutlined /> {{ item.shopPhone }}</div>
				</a-col>
				<a-col :lg="3" :xs="0" class="vipBox">
					<div>{{ $t('default.159') }}</div>
					<div class="infoStyle">
						<div v-if="item.machineMap">{{ `A1:${item.machineMap.A1}    W1:${item.machineMap.W1}` }}</div>
					</div>
				</a-col>
				<a-col :lg="4" :xs="0" class="vipBox">
					<div>{{ $t('default.250') }}</div>
					<div class="infoStyle">
						<div v-if="item.competitionList">{{ item.competitionList.length }}</div>
					</div>
				</a-col>
				<a-col :lg="2" :xs="2" class="iconFont">
					<div v-if="item.competitionList && item.competitionList.length">
						<div v-if="item.flag" @click="changeFlag(index)">
							<DownCircleOutlined />
						</div>
						<div v-else @click="changeFlag(index)">
							<UpCircleOutlined />
						</div>
					</div>
				</a-col>
			</a-row>
			<transition enter-active-class="animate__animated animate__bounceInUp">
				<a-row v-show="item.flag" class="recordBox">
					<!-- <div class="matchTitle">{{ joinMatch }}</div> -->
					<a-row v-for="recordInfo in item.competitionList" :key="recordInfo.index" class="msgBox">
						<a-col :span="4" class="imgColStyle">
							<div>
								<img class="matchImg" :src="recordInfo.competitionImg" alt="" />
							</div>
						</a-col>
						<a-col :span="20" class="countBox">
							<div class="recordInfoStyle inPhoneTableStyle">
								<div class="recordInfoFont">{{ recordInfo.competitionName }}</div>
								<div class="tableDate">
									<div>{{ `${recordInfo.date} / ${recordInfo.countryName}` }}</div>
								</div>
							</div>
							<div class="btnBox">
								<div v-for="disition in recordInfo.divisionList" :key="disition.divisionId">
									<a-button type="danger" size="small" @click="entryPage(recordInfo.competitionId, disition.divisionId)">{{ disition.divisionName }}</a-button>
								</div>
							</div>
						</a-col>
					</a-row>
				</a-row>
			</transition>
		</a-row>
		<a-row v-if="!shopList.length">
			<emptyList />
		</a-row>
		<a-modal v-model:visible="visible" :title="dialogObj.title">
			<template v-slot:footer>
				<a-row class="rowStyle dialogBox">
					<a-col :span="8">
						<div class="imgBox">
							<img :src="dialogObj.img" alt="" />
						</div>
					</a-col>
					<a-col :span="16" class="dialog">
						<div>{{ `${$t('default.28')}：${dialogObj.shopName}` }}</div>
						<div>{{ `${$t('default.89')}：${dialogObj.phone}` }}</div>
						<div>{{ `${$t('default.125')}：${dialogObj.address}` }}</div>
					</a-col>
				</a-row>
				<!-- <div class="dialogBtn">
					<a-button type="primary" @click="handleOk">{{ $t('default.25') }}</a-button>
				</div> -->
			</template>
		</a-modal>
		<a-row>
			<a-col class="pagination">
				<a-pagination v-model:current="pageNum" v-model:pageSize="pageSize" :total="total" />
			</a-col>
		</a-row>
	</div>
</template>
// 此文件不用TS，AMap加载有问题
<script>
import { defineComponent, reactive, toRefs, onMounted, getCurrentInstance } from 'vue';
import divTitle from '@/components/DividingLine.vue';
import emptyList from '@/components/common/emptyList.vue';
import { indexCityHttp, indexCountryHttp, shopListHttp } from '@/axios/api';
import { message } from 'ant-design-vue';
import { SettingFilled, EnvironmentOutlined, PhoneOutlined, DownCircleOutlined, UpCircleOutlined } from '@ant-design/icons-vue';
import { useRoute, useRouter } from 'vue-router';
export default defineComponent({
	name: 'shop',
	components: {
		divTitle,
		SettingFilled,
		EnvironmentOutlined,
		PhoneOutlined,
		DownCircleOutlined,
		UpCircleOutlined,
		emptyList
	},
	setup() {
		const ROUTE = useRoute();
		const ROUTER = useRouter();
		const instance = getCurrentInstance();
		let MAP = null;
		const loadMap = () => {
			const url = 'https://webapi.amap.com/maps?v=1.4.15&key=4288b5f8c829eba5d80f4664f7e40dcf&callback=load';
			const jsapi = document.createElement('script');
			jsapi.src = url;
			document.head.appendChild(jsapi);
		};
		const initMap = () => {
			// 加载定位插件，搜索提示插件，搜索插件
			// eslint-disable-next-line no-undef
			AMap.plugin(['AMap.Geolocation', 'AMap.PlaceSearch', 'AMap.Autocomplete'], function() {
				// eslint-disable-next-line no-undef
				const geolocation = new AMap.Geolocation({
					enableHighAccuracy: true, //是否使用高精度定位，默认:true
					timeout: 10000, //超过10秒后停止定位，默认：无穷大
					maximumAge: 0, //定位结果缓存0毫秒，默认：0
					convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
					showButton: true, //显示定位按钮，默认：true
					buttonPosition: 'RB', //定位按钮停靠位置，默认：'LB'，左下角
					// eslint-disable-next-line no-undef
					buttonOffset: new AMap.Pixel(5, 5), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
					showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
					showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
					panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
					zoomToAccuracy: true //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
				});
				MAP.addControl(geolocation);
				geolocation.getCurrentPosition();
				// eslint-disable-next-line no-undef
				// const auto = new AMap.Autocomplete({
				// 	input: 'input_id'
				// });
				// eslint-disable-next-line no-undef
				// placeSearch = new AMap.PlaceSearch({
				// 	map: MAP
				// });
				// eslint-disable-next-line no-undef
				AMap.event.addListener(geolocation, 'error', (onError) => {
					message.error('定位出错:' + onError.message);
				}); //返回定位出错信息
				// eslint-disable-next-line no-undef
				// AMap.event.addListener(auto, 'select', (e) => {
				// 	placeSearch.setCity(e.poi.adcode);
				// 	placeSearch.search(e.poi.name);
				// });
			});
		};
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		const initMarker = () => {
			// eslint-disable-next-line @typescript-eslint/no-use-before-define
			if (data.markerList.length) {
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				data.markerList.forEach((i) => {
					i.hide();
				});
			}
			// eslint-disable-next-line @typescript-eslint/no-use-before-define
			data.InfoWindow.length &&
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				data.InfoWindow.forEach((i, index) => {
					// eslint-disable-next-line no-undef
					const marker = new AMap.Marker({
						// eslint-disable-next-line no-undef
						position: new AMap.LngLat(i.x, i.y), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
						title: i.title
					});
					// 定义信息窗体
					// eslint-disable-next-line no-undef
					const infoWindow = new AMap.InfoWindow({
						isCustom: true, //使用自定义窗体
						closeWhenClickMap: true,
						// eslint-disable-next-line @typescript-eslint/no-use-before-define
						content: setDialogBox(MAP, i),
						// eslint-disable-next-line no-undef
						offset: new AMap.Pixel(0, -30),
						anchor: 'bottom-center'
					});
					// eslint-disable-next-line @typescript-eslint/no-use-before-define
					data.markerList.push(marker);
					MAP.add(marker);
					//鼠标点击marker弹出自定义的信息窗体
					// eslint-disable-next-line no-undef
					AMap.event.addListener(marker, 'click', function() {
						// eslint-disable-next-line @typescript-eslint/no-use-before-define
						infoWindow.open(MAP, marker.getPosition());
					});
					// 设置层级以及定位 如果有多个marke则设置第一条数据定位
					if (!index && i.x && i.y) {
						// eslint-disable-next-line no-undef
						MAP.setZoomAndCenter(14, [i.x, i.y]);
					}
				});
		};
		const setDialogBox = (MAP, obj) => {
			// 定义容器
			const box = document.createElement('div');
			box.className = 'mapbox';
			// 定义弹出框头部信息
			const divBox = document.createElement('div');
			const titleDiv = document.createElement('div');
			const closeDiv = document.createElement('div');
			divBox.className = 'dialogInfo';
			closeDiv.className = 'closeInfo';
			titleDiv.innerHTML = obj.title;
			// closeDiv.innerText = 'X';
			divBox.appendChild(titleDiv);
			divBox.appendChild(closeDiv);
			// eslint-disable-next-line @typescript-eslint/no-use-before-define
			// closeDiv.onclick = map.clearInfoWindow();
			// 定义弹窗框内容
			const centerBox = document.createElement('div');
			const infoDiv = document.createElement('div');
			const addressDiv = document.createElement('div');
			const phoneDiv = document.createElement('div');
			const imgDiv = document.createElement('img');
			centerBox.className = 'infoCenterBox';
			infoDiv.className = 'infoDiv';
			imgDiv.className = 'infoImg';
			addressDiv.innerHTML = obj.address;
			phoneDiv.innerHTML = obj.phone;
			imgDiv.src = obj.img;
			infoDiv.appendChild(phoneDiv);
			infoDiv.appendChild(addressDiv);
			centerBox.appendChild(imgDiv);
			centerBox.appendChild(infoDiv);
			box.appendChild(divBox);
			box.appendChild(centerBox);
			return box;
		};
		const showMap = () => {
			window.load = () => {
				// eslint-disable-next-line no-undef
				MAP = new AMap.Map('container', {
					resizeEnable: true,
					center: [116.397428, 39.90923],
					zoom: 13
				});
				if (MAP) {
					initMap();
					initMarker();
				}
			};
		};
		const data = reactive({
			title: 'default.127',
			colSpan: 4,
			visible: false,
			countryId: null,
			areaId: null,
			city: 1,
			shopName: '',
			a1: false,
			w1: false,
			league: false,
			total: 1,
			pageNum: 1,
			pageSize: 10,
			areaList: [],
			cityList: [],
			shopList: [{ flag: false, competitionList: [], machineMap: {} }],
			shopNameList: [],
			InfoWindow: [],
			markerList: [],
			dialogObj: {
				title: '',
				img: '',
				shopName: '',
				phone: '',
				address: ''
			},
			filterOption: (input, option) => {
				if (option.props.value) {
					return option.props.value.includes(input);
				}
			},
			search: () => {
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getShopList();
			},
			changeFlag: (index) => {
				data.shopList[index].flag = !data.shopList[index].flag;
			},
			showShopInfo: (shopId) => {
				ROUTER.push({
					path: '/shopAddress',
					query: { shopId }
				});
			},
			countryChange: (value) => {
				if (!value) return false;
				indexCityHttp({ countryId: value }).then((res) => {
					data.cityList = res.data.data;
					if (data.cityList.length) {
						data.areaId = data.cityList[0]['areaId'];
					} else {
						data.areaId = null;
					}
				});
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getShopList();
			},
			areaChange: () => {
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getShopList(data.shopName);
			},
			entryPage: (competitionId, divisionId) => {
				ROUTER.push({
					path: '/calendar',
					query: {
						competitionId,
						divisionId
					}
				});
			},
			showDetail: (item) => {
				data.dialogObj.title = item.shopAddress;
				data.dialogObj.img = item.shopImg;
				data.dialogObj.shopName = item.shopName;
				data.dialogObj.phone = item.shopPhone;
				data.dialogObj.address = item.shopAddress;
				data.visible = true;
			},
			handleOk: () => {
				console.log(1);
			}
		});
		const getCountry = (searchValue) => {
			indexCountryHttp().then((res) => {
				if (res.data.data.length) {
					const id = Number(sessionStorage.getItem('webCountryId')) || data.areaList[0]['countryId'];
					data.areaList = res.data.data;
					data.countryId = id;
					data.countryChange(id);
					// eslint-disable-next-line @typescript-eslint/no-use-before-define
					getShopList(searchValue);
				}
			});
		};
		const getShopList = (searchValue = '') => {
			const obj = {
				countryId: data.countryId,
				areaId: data.areaId,
				shopName: searchValue,
				competition: data.league,
				a1: data.a1,
				w1: data.w1,
				pageIndex: 1,
				pageSize: 10
			};
			shopListHttp(obj).then((res) => {
				data.shopList = res.data.data.list;
				data.total = res.data.data.totalPage;
				data.InfoWindow = [];
				data.shopNameList = res.data.data.list;
				// 添加marker
				res.data.data.list.forEach((i) => {
					if (i.longitude && i.latitude) {
						data.InfoWindow.push({
							title: i.shopName,
							phone: i.shopPhone,
							address: i.shopAddress,
							img: i.shopImg,
							x: i.longitude,
							y: i.latitude
						});
						// getGDXY(i.longitude, i.latitude);
					}
					initMarker();
				});
			});
		};
		onMounted(() => {
			showMap();
			getCountry(ROUTE.query.searchValue);
			loadMap();
			instance.appContext.config.globalProperties.$bus.on('on-country-change', (val) => {
				data.countryId = val;
				data.countryChange(val);
				getShopList();
			});
		});
		return {
			...toRefs(data)
		};
	}
});
</script>

<style scoped>
.rowStyle {
	height: 440px;
	border-top: 2px double #4b4b4b;
	border-bottom: 2px double #4b4b4b;
}
.mapSearch {
	height: 100%;
	border-left: 1px solid #4b4b4b;
	display: flex;
	flex-direction: column;
	padding: 20px;
	justify-content: space-around;
	text-align: left;
}
.shopTitle {
	font-size: 20px;
	font-weight: bold;
}
.center {
	margin: 10px 0;
}
.selectBox div {
	width: 50%;
}
#container {
	height: 436px;
}
.shopRow {
	margin: 15px 0;
}
.eveyTeam {
	height: 80px;
	margin: 15px 0;
	border: 1px solid #eee;
}
.imgColStyle {
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.matchImg {
	height: 60px;
}
.infoClass {
	text-align: left;
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 100%;
}
.teamStyle {
	cursor: pointer;
	font-weight: bold;
}
.teamStyle:hover {
	text-decoration: underline;
}
.placeStyle {
	display: flex;
	justify-content: flex-start;
}
.placeStyle span {
	cursor: pointer;
}
.counyStyle {
	color: #999;
	margin: 0 5px;
}
.vipBox {
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	text-align: left;
}
.infoStyle {
	display: flex;
}
.iconFont {
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	font-size: 25px;
	cursor: pointer;
}
.iconFont:hover {
	color: #1890ff;
}
.recordBox {
	padding: 10px;
}
.msgBox {
	margin: 10px 0;
	padding: 0 0 0 10px;
	height: 80px;
	border-radius: 10px;
	box-sizing: border-box;
	border: 1px solid #2b2b2b;
}
.countBox {
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
.recordInfoFont {
	font-weight: bold;
	cursor: pointer;
}
.recordInfoFont:hover {
	text-decoration: underline;
}
.btnBox {
	display: flex;
	padding: 0 0 0 10px;
}
.btnBox div {
	margin-right: 15px;
}
.recordInfoStyle {
	display: flex;
	justify-content: flex-start;
}
.btnBg {
	display: flex;
	justify-content: center;
}
.tableDate {
	margin-left: 5px;
	color: #999;
}
.dialogBox {
	height: 100px;
	color: #ff3202;
	border: 1px solid #eee;
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
.dialog {
	text-align: left;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
.showPhoneTable {
	display: none;
	height: 100%;
	border-left: 1px solid #4b4b4b;
	padding: 20px;
	text-align: left;
}
</style>
