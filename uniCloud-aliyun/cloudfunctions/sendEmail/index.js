'use strict';
const XtCloudEmail = require("xt-cloud-email")
exports.main = async (event, context) => {

	const xtCloudEmail = XtCloudEmail(wyConfig)

	let flag = await xtCloudEmail.verify()
	if (flag) {
		xtCloudEmail.sendTextMail()
	}

	console.log("验证邮件是否连接成功", flag)
	//返回数据给客户端
	return event
};
