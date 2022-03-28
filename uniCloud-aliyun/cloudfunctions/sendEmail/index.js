'use strict';
const XtEmail = require("xt-email")
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const config = {
		host: 'smtp.qq.com',
		auth: {
			user: '1010161292@qq.com',
			pass: 'nzuvjswjvfndbbeg'
		}
	}
	const xtEmailManager = XtEmail(config, {
		to: '13729760905@163.com',
		subject: '测试',
		text: '测试邮箱'
	})

	let flag = await xtEmailManager.verify()
	if (flag) {
		xtEmailManager.sendTextMail()
	}

	console.log("验证邮件是否连接成功", flag)
	//返回数据给客户端
	return event
};
