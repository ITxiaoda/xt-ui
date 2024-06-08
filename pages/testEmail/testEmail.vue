<template>
	<view><button type="default" @click="sendMail">测试邮箱</button></view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		sendMail() {
			uniCloud.callFunction({
				name: 'sendEmail',
				data: {
					name: '测试邮箱'
				}
			});
		}
	}
};
</script>

<style lang="scss"></style>
