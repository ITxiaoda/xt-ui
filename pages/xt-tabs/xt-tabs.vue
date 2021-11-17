<template>
	<view class="container">
		<xt-tabs :list="list" :value="current" @change="tabChange"></xt-tabs>
		<view class="swiper-content">
			<swiper class="swiper" :current="current" @change="swiperChange">
				<swiper-item>服务器1</swiper-item>
				<swiper-item>服务器2</swiper-item>
				<swiper-item>服务器3</swiper-item>
				<swiper-item>服务器4</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [{ label: '服务器', value: '服务器1' }, { label: '服务器', value: '服务器2' }, { label: '服务器', value: '服务器3' }, { label: '服务器', value: '服务器4' }],
			current: 0
		};
	},
	methods: {
		tabChange(index) {
			this.current = index;
			console.log('index', index);
		},
		swiperChange(e) {
			this.current = e.detail.current;
			console.log('e', e.detail.current);
		}
	}
};
</script>

<style lang="scss">
.container {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	width: 100vw;
	height: 100vh;
}
.swiper-content {
	flex: 1;

	.swiper {
		width: 100%;
		height: 100%;
	}
}
</style>
