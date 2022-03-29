/**
 * @typeref XtConfig
 * @property {string} mailType = ['qq'|'163']  - 防止以后要去做邮箱兼容
 * @property {string} host - 邮箱服务器地址
 * @property {number} port - 端口 - 默认 465
 * @property {boolean} secure - 是否使用默认端口，true : 端口为465，false：端口必填
 * @property {Object} auth - 发送人信息
 * 	- user: string - 账号 - 发送人邮箱地址
 * 	- pass: string - 密码或授权码
 */

/**
 * @typeref XtDefaults
 * @property {string} name - 自定义发送人名称 
 * @property {string|Array<string>} to - 收件人邮箱地址，需要发送多个邮箱，传入字符串时需要用逗号`,`在邮箱之间隔开，也可以传入一个字符串数组。
 * @property {string} subject - 主题
 * @property {string} text - 文本内容
 * @property {string} html - html 模板 
 * @property {Array<Object>} attachments - 附件信息
 * 				@param {string} filename - 附件名称
 * 				@param {string} path - 附件地址 - 网络地址
 */
const nodemailer = require("nodemailer");
const {
	initConfig
} = require("./index.js")
const ruleFun = require("../utils/rules.js")
const {
	initRuleConfig
} = require("./rules.js")

class XtEmail {
	// 配置项
	_config = null;
	_defaults = null;
	// 邮箱manager
	_transporter = null;

	/**
	 * @param {XtConfig} config
	 * @param {XtDefaults} default
	 
	 */
	constructor(config,
		defaults = {}) {
		if (!ruleFun(initRuleConfig, config)) {
			return;
		}
		if (!config.auth.user) {
			console.error("auth.user 发送邮箱账号不能为空")
			return;
		}
		if (!config.auth.pass) {
			console.error("auth.pass 发送邮箱账号密码或授权码不能为空")
			return;
		}
		if (config.secure === false && !config.port) {
			console.error("secure 为false 时, port 属性必填")
			return;
		}
		this._init(config, defaults)
	}

	/**
	 * 初始化
	 * @param {Object} - 初始化配置
	 * @param {Object} - 发送消息时，默认配置  
	 */
	_init(config,
		defaults = {}) {
		this.config = {
			...initConfig,
			...config
		};
		this._defaults = {
			from: {
				name: defaults.name || this.config.auth.user,
				address: this.config.auth.user
			}, //	发送人
			...defaults
		}
		this._transporter = nodemailer.createTransport(this.config, this._defaults);
	}

	/**
	 * 发送邮件 - 文本
	 * @property {string} from - 发送邮箱地址 - 不填则使用auth.user  
	 * @property {string} to - 收件邮箱地址 - 必传
	 * @property {string} subject - 标题 - 必传
	 * @property {string} content - 邮件内容 - 必传
	 */
	sendTextMail(config = {}) {
		if (!config.from && !this._defaults.from) {
			console.error("from - 发送邮箱地址不能为空");
			return;
		}
		if (!config.to && !this._defaults.to) {
			console.error("to - 收件邮箱地址不能为空");
			return;
		}
		if (!config.subject && !this._defaults.subject) {
			console.error("subject - 邮箱标题不能为空");
			return;
		}
		if (!config.text && !this._defaults.text) {
			console.error("text - 邮件内容不能为空");
			return;
		}
		const from = this._defaults.from;
		if (config.name) {
			// 发送人名称
			from.name = config.name
		}
		this._transporter.sendMail({
			...this._defaults,
			...config,
			from,
			text: this._defaults.text || config.text
		})
	}

	/**
	 * 发送邮件 - 文本
	 * @property {string} from - 发送邮箱地址 - 不填则使用auth.user  
	 * @property {string} to - 收件邮箱地址 - 必传
	 * @property {string} subject - 标题 - 必传
	 * @property {string} content - 邮件内容 - 必传
	 */
	sendHtmlMail(config = {}) {
		if (!config.from && !this._defaults.from) {
			console.error("from - 发送邮箱地址不能为空");
			return;
		}
		if (!config.to && !this._defaults.to) {
			console.error("to - 收件邮箱地址不能为空");
			return;
		}
		if (!config.subject && !this._defaults.subject) {
			console.error("subject - 邮箱标题不能为空");
			return;
		}
		if (!config.html && !this._defaults.html) {
			console.error("html - 邮件内容不能为空");
			return;
		}
		const from = this._defaults.from;
		if (config.name) {
			// 发送人名称
			from.name = config.name
		}
		this._transporter.sendMail({
			...this._defaults,
			...config,
			html: this._defaults.html || config.html
		})
	}

	/**
	 * 验证是否连接成功
	 * @return {boolean} - true : 邮箱连接成功， false : 邮箱连接失败
	 */
	verify() {
		return new Promise((resolve, reject) => {
			this._transporter.verify((err, success) => {
				if (err) {
					console.error("verify - 邮箱连接失败: ", err)
					reject(err);
				} else {
					console.log("verify - 邮箱连接成功")
					resolve(true)
				}
			})
		})
	}
}


module.exports = XtEmail;
