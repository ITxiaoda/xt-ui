<template>
	<view style="padding:120px">
		<xt-verify-code v-model="verifyCode" :isPassword="false" color="#ccc" type="box" :size="4" boxActiveColor="#4e92df" cursor-color="#ccc" @confirm="confirm"></xt-verify-code>
	</view>
</template>

<script>
export default {
	data() {
		return {
			verifyCode: '123'
		};
	},
	mounted() {
	},
	methods: {
		confirm(data) {
			console.log('data', data);
			console.log('verifyCode', this.verifyCode);
		},
		clear() {
			this.verifyCode = '';
		}
	}
};
</script>

<style lang="scss" scoped>
/deep/ .xt__verify-code .xt__input-ground .xt__box {
	width: 40rpx !important;
	height: 60rpx !important;
}

/deep/ .xt__input-ground .xt__box .xt__code-text {
	font-size: 28rpx !important;
}
</style>
