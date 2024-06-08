<template>
	<view
		:class="['xt-hover-btn', `xt-hover-btn__${type}`]"
		:style="{ '--btn-size': btnSize, '--horizontal': horizontalSpace, '--vertical': verticalSpace, '--bg-color': bgColor }"
		@click.stop="handleClick"
	>
		<view class="xt-hover-btn-content">
			<slot><view class="xt-hover-btn-content__icon"></view></slot>
		</view>
	</view>
</template>

<script>
/**
 * @property {String} type =[left-top|left-bottom|right-top|right-bottom] - 按钮位置，默认：right-bottom
 * @property {Number|String} size - 按钮大小,默认: 60 单位默认: px
 * @property {Number|String} horizontal - 水平方向上与页面边的距离 默认: 20，单位默认: px
 * @property {Number|String} vertical - 垂直方向上与页面边的距离 默认: 20，单位默认: px
 * @property {String} bgColor - 背景色 默认: #0486fe
 */
export default {
	name: 'xt-hover-btn',
	props: {
		type: {
			type: String,
			default: () => 'right-bottom'
		},
		size: {
			type: Number | String,
			default: () => 60
		},
		horizontal: {
			type: Number | String,
			default: () => 20
		},
		vertical: {
			type: Number | String,
			default: () => 20
		},
		bgColor: {
			type: String,
			default: () => '#0486fe'
		}
	},
	data() {
		return {};
	},
	methods: {
		/**
		 * 校验 val 是否为 Number 或 String, 样式的大小
		 * @param {Object} val - 值
		 */
		verifyNumberString(val) {
			if (typeof val === 'number') {
				return val + 'px';
			} else if (typeof val === 'string') {
				return val;
			} else {
				console.error(`${val} is not number or string`);
				return 0 + px;
			}
		},
		handleClick() {
			this.$emit('click');
		}
	},
	computed: {
		btnSize() {
			return this.verifyNumberString(this.size);
		},
		horizontalSpace() {
			return this.verifyNumberString(this.horizontal);
		},
		verticalSpace() {
			return this.verifyNumberString(this.vertical);
		}
	}
};
</script>

<style scoped>
.xt-hover-btn {
	position: fixed;
	display: inline-block;
	width: var(--btn-size);
	height: var(--btn-size);
	box-sizing: border-box;
	background-color: var(--bg-color);
	border-radius: 50%;
	border-width: 1px;
	border-style: solid;
	border-color: var(--bg-color);
}

.xt-hover-btn:active {
	lighting-color: rgba(255, 255, 255, 0.7);
}

.xt-hover-btn .xt-hover-btn-content {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
}

.xt-hover-btn-content__icon {
	width: 100%;
	height: 100%;
	position: relative;
	box-sizing: border-box;
}

.xt-hover-btn-content__icon::before {
	display: inline-block;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	content: '';
	width: 4px;
	height: 70%;
	background-color: #ffffff;
	border-radius: 30px;
}

.xt-hover-btn-content__icon::after {
	display: inline-block;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	content: '';
	height: 4px;
	width: 70%;
	background-color: #ffffff;
	border-radius: 30px;
}

.xt-hover-btn__left-top {
	top: var(--vertical);
	left: var(--horizontal);
}
.xt-hover-btn__left-bottom {
	left: var(--horizontal);
	bottom: var(--vertical);
}
.xt-hover-btn__right-top {
	top: var(--vertical);
	right: var(--horizontal);
}
.xt-hover-btn__right-bottom {
	right: var(--horizontal);
	bottom: var(--vertical);
}
</style>
