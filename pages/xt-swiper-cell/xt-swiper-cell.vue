<template>
	<view>
		<xt-swiper-cell :left="[{ text: '完成' }]" :right="[{ text: '完成' }, { text: '删除', backgroundColor: '#E53A40' }]" :content="{ title: '测试标题', desc: '测试描述' }" />
		<xt-swiper-cell :left="[{ text: '完成' }]" :right="[{ text: '完成' }, { text: '删除', backgroundColor: '#E53A40' }]">
			<view style="height: 60px;border: 1px solid red;">测试</view>
		</xt-swiper-cell>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style lang="scss" scoped></style>
