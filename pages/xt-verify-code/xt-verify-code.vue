<template>
	<view style="padding:10px"><xt-verify-code type="bottom" isPassword v-model="verifyCode" :size="6" @confirm="confirm"></xt-verify-code></view>
</template>

<script>
export default {
	data() {
		return {
			verifyCode: ''
		};
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

<style lang="scss"></style>
