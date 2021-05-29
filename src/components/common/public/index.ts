import vue from 'vue';
import { getCurrentInstance } from 'vue';

const yearList: Array<any> = [{ value: 2020, label: '2020' }];
const initYearList = () => {
	const currentYear = new Date().getFullYear();
	const list: any[] = [];
	yearList.forEach((year) => {
		list.push(year.value);
	});
	if (!list.includes(currentYear)) {
		yearList.push({ value: currentYear, label: String(currentYear) });
	}
};
const init = () => {
	initYearList();
};
init();

const i18n = (value: string) => {
	const currentInstance: any = getCurrentInstance();
	const instance: any = currentInstance.appContext.config.globalProperties.$i18n.global;
	return instance.t(value);
};
export { yearList, i18n };
