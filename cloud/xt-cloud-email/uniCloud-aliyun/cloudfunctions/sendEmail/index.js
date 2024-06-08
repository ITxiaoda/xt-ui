'use strict';
const XtCloudEmail = require("xt-cloud-email")
exports.main = async (event, context) => {

	const config = {
		host: "smtp.qq.com",
		auth: {
			user: '',
			pass: ''
		}
	}

	const defaults = {
		name: "测试邮箱123",
		to: "",
		subject: "测试74188",
		text: "测试内容"
	};
	const xtCloudEmail = XtCloudEmail(config,
		defaults)

	let flag = await xtCloudEmail.verify()
	if (flag) {
		console.log("验证邮件是否连接成功", flag)
		try {
			const res = await xtCloudEmail.sendTextMail()
		} catch (e) {
			console.log("sendTextMailError", e)
			//TODO handle the exception
		}
	}


	//返回数据给客户端
	return event
};
