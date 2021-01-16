import { stringify } from 'qs';

const yearList: Array<any> = [
	{ value: '', label: 'ALL' },
	{ value: 2020, label: '2020' }
];
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
export { yearList };
