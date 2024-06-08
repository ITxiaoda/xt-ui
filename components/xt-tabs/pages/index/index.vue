<template>
	<view class="container"><xt-tabs :list="list" :value="current" @change="tabChange"></xt-tabs></view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					label: '第一页',
					slot: 'slot-1'
				}, {
					label: '第二页',
					slot: 'slot-2'
				}, {
					label: '第三页',
					slot: 'slot-3'
				}, {
					label: '第四页',
					slot: 'slot-4'
				}],
				current: 1
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.container {
		width: 100vw;
		height: 100vh;
	}
</style>