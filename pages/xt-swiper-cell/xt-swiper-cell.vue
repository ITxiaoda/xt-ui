<template>
	<view>
		<xt-swiper-cell
			style="margin-bottom: 10rpx;"
			:left="[{ text: '完成' }]"
			:right="[{ text: '完成' }]"
			:content="{ title: '测试标题', desc: '测试描述' }"
		/>

		<xt-swiper-cell
			style="margin-bottom: 10rpx;"
			:left="[{ text: '完成' }]"
			:right="[{ text: '完成' }, { text: '删除', backgroundColor: '#E53A40' }]"
			:content="{ title: '测试标题', desc: '测试描述' }"
		/>

		<xt-swiper-cell
			style="margin-bottom: 10rpx;"
			:left="[{ text: '完成' }]"
			:right="[{ text: '完成' }]"
			:content="{ title: '测试标题', desc: '测试描述' }"
		/>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style lang="scss"></style>
