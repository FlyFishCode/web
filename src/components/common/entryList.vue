<template>
	<a-row class="historyRow">
		<a-col :lg="{ span: 2, offset: 22 }" :xs="{ span: 4, offset: 20 }">
			<a-button type="danger" size="small" @click="Gohistory">{{ $t('default.139') }}</a-button>
		</a-col>
	</a-row>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
	name: 'entryPath',
	props: ['entryPath'],
	setup(props) {
		const Router = useRouter();
		const data = reactive({
			Gohistory: () => {
				Router.push(props.entryPath);
			}
		});
		return {
			...toRefs(data)
		};
	}
});
</script>

<style scoped>
.historyRow {
	margin: 10px 0;
}
</style>
