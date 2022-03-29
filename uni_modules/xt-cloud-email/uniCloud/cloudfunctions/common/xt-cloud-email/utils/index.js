module.exports = {
	/**
	 * 获取数据的基本类型
	 * @param {Object} value
	 */
	typeOf(value) {
		return Object.prototype.toString.call(value)
			.replace(/\[object (.+)\]/g, '$1')
			.toLowerCase();
	}
}
