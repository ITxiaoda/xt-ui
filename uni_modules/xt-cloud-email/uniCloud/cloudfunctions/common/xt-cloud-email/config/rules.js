exports.initRuleConfig = {
	'host': {
		required: true,
		message: "host 发送邮箱服务器地址不能为空",
	},
	'auth': {
		required: true,
		message: "auth 发送账号信息不能为空",
	},
}
