'use strict';
const XtCloudEmail = require("xt-cloud-email")
exports.main = async (event, context) => {


	const defaults = {
		name: ""
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
