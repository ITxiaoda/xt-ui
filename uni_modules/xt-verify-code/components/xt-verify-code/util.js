/**
 * @description 获取元素节点 - 大小等信息
 * @param {string} elm - 节点的id、class 相当于 document.querySelect的参数 -eg: #id
 * @param {string} type = [single|array] - 单个元素获取多个元素 默认是单个元素
 * @param {Function} callback - 回调函数
 * @param {object} that - 上下文环境 vue2：this ,vue3: getCurrentInstance();
 */
export const getElementRect = (that) => (elm, type = 'single', callback) => {
	uni
		.createSelectorQuery()
		.in(that)[type === 'array' ? 'selectAll' : 'select'](elm)
		.boundingClientRect()
		.exec(data => {
			callback(data[0]);
		});
}