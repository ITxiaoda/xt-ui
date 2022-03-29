'use strict';
const XtCloudEmail = require("xt-cloud-email")
exports.main = async (event, context) => {

	const wyConfig = {
		host: 'smtp.163.com',
		auth: {
			user: '13729760905@163.com',
			pass: 'OYCQATISLLYTEZOK'
		}
	}
	const wyDefaults = {
		name: "Notes",
		to: '1010161292@qq.com',
		subject: '测试',
		text: '测试邮箱'
	}
	//event为客户端上传的参数
	const qqConfig = {
		host: 'smtp.qq.com',
		auth: {
			user: '1010161292@qq.com',
			pass: 'nzuvjswjvfndbbeg'
		}
	}
	const qqDefaults = {
		name: "Notes",
		to: '13729760905@163.com',
		subject: '测试',
		text: '测试邮箱'
	}

	const xtCloudEmail = XtCloudEmail(wyConfig)

	let flag = await xtCloudEmail.verify()
	if (flag) {
		xtCloudEmail.sendTextMail({
			name: "Test",
			to: "1010161292@qq.com",
			subject: "基本使用",
			text: "基本使用内容"
		})
	}

	console.log("验证邮件是否连接成功", flag)
	//返回数据给客户端
	return event
};
