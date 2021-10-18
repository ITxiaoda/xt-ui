<template>
	<view style="padding:10px"><xt-verify-code type="bottom" v-model="verifyCode" size="5" @confirm="confirm"></xt-verify-code></view>
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
		},
		clear() {
			this.verifyCode = '';
		}
	}
};
</script>

<style lang="scss"></style>
