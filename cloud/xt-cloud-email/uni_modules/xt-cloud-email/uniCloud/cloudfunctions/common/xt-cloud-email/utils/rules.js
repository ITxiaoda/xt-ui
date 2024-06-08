const utils = require('./index.js')

/**
 * 规则校验
 * @param {Object} rule - 规则对象
 * @param {Object} target - 校验目标
 */
module.exports = (rule, target) => {
	if (typeof target === 'object') {
		for (let key in rule) {
			if (rule[key].required) {
				if (['null', 'undefined'].includes(utils.typeOf(target[key]))) {
					console.error(rule[key].message)
					return false
				}
			}
		}
		return true;
	} else {
		return false
	}
}
