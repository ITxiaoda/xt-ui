<template>
	<view>
		<xt-swiper-cell :left="[{ text: '完成' }]" :right="[{ text: '完成' }, { text: '删除', backgroundColor: '#E53A40' }]"
			:content="{ title: '测试标题', desc: '测试描述' }" />
		<xt-swiper-cell :left="[{ text: '完成' }]" :right="[{ text: '完成' }, { text: '删除', backgroundColor: '#E53A40' }]"
			:content="{ title: '测试标题', desc: '测试描述' }" />
		<xt-swiper-cell :left="[{ text: '完成' }]" :right="[{ text: '完成' }, { text: '删除', backgroundColor: '#E53A40' }]"
			:content="{ title: '测试标题', desc: '测试描述' }" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>

</style>