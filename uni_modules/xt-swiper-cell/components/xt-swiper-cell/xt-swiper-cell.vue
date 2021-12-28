<template>
	<view class="xt-swiper-cell">
		<view
			:class="{ 'xt_swiper--container': true, 'xt_add-index': offsetWidth !== 0 }"
			:style="{ transform: `translate3d(${offsetWidth}px, 0, 0)` }"
			@touchstart.stop="compTouchstart"
			@touchmove.stop="compTouchmove"
			@touchend.stop="compTouchend"
		>
			<!-- 左边按钮 -->
			<view class="xt_swiper--btn-left-container">
				<slot name="left">
					<template v-if="left.length > 0">
						<view v-for="(leftBtn, index) in left" :key="index" class="xt_swiper--btn">
							<view
								class="xt_swiper--btn-text"
								:style="[
									{
										color: leftBtn.color || '#FFFFFF',
										'background-color': leftBtn.backgroundColor || '#30a9de'
									},
									leftBtn.style ? leftBtn.style : {}
								]"
								@click.stop="handleBtn(leftBtn.callback, index)"
							>
								{{ leftBtn.text }}
							</view>
						</view>
					</template>
				</slot>
			</view>
			<!-- 内容 -->
			<view class="xt_swiper--content">
				<slot name="default">
					<template v-if="content">
						<view class="xt_swiper--content-container">
							<image class="default_content-image" :src="content.image || 'https://picsum.photos/200'"></image>
							<view class="default_content">
								<view class="default_content-title" v-if="content.title">
									<text>{{ content.title }}</text>
								</view>
								<view class="default_content-desc" v-if="content.desc">
									<text>{{ content.desc }}</text>
								</view>
							</view>
						</view>
					</template>
				</slot>
			</view>

			<!-- 右边按钮 -->
			<view class="xt_swiper--btn-right-container">
				<slot name="right">
					<template v-if="right.length > 0">
						<view v-for="(rightBtn, index) in right" :key="index" class="xt_swiper--btn">
							<view
								class="xt_swiper--btn-text"
								:style="[
									{
										color: rightBtn.color || '#FFFFFF',
										'background-color': rightBtn.backgroundColor || '#30a9de'
									},
									rightBtn.style ? rightBtn.style : {}
								]"
								@click.stop="handleBtn(rightBtn.callback, index)"
							>
								{{ rightBtn.text }}
							</view>
						</view>
					</template>
				</slot>
			</view>
		</view>
		<view class="xt_swiper--mask" v-if="offsetWidth !== 0" @touchstart.stop="handleMask"></view>
	</view>
</template>

<script>
/**
 * @typedef LeftOrRigthProps
 * @property {string} text - 名称
 * @property {string} color - 字体颜色
 * @property {string} backgroundColor - 背景颜色
 * @property {Object} style - 自定义样式
 * @event {Function()} callback - 点击回调
 */
/**
	 * @typedef ContentProps
	 * @property {string} image - 图片地址
	 * @property {string} title - 标题
	 * @property {string} desc - 解释

	 */
/**
 * @description 左右滑动显示按钮
 * @property {ContentProps} content - 主要内容
 * @property {Array<LeftOrRigthProps>} right - 右边按钮
 * @property {Array<LeftOrRigthProps>} left - 左边按钮
 */
export default {
	name: 'xt-swiper-cell',
	props: {
		content: {
			type: Object,
			default: () => {
				return null;
			}
		},
		right: {
			type: Array,
			default: () => []
		}, // 右边按钮
		left: {
			type: Array,
			default: () => []
		} // 右边按钮
	},
	data() {
		return {
			offsetWidth: 0, // 偏移量 -: 向左 +: 向右
			rightBtnWidth: 0, // 右边按钮的总宽度
			leftBtnWidth: 0, // 左边按钮的总宽度
			clickClientX: 0 // 开始触摸时X轴
		};
	},
	mounted() {
		this.getBtnWidth();
	},
	methods: {
		/**
		 * 开始触摸
		 */
		compTouchstart(event) {
			this.clickClientX = parseInt(event.changedTouches[0].clientX);
		},
		compTouchmove(event) {
			const move = parseInt(event.changedTouches[0].clientX - this.clickClientX);
			let res = 0;
			if (move < 0 && this.rightBtnWidth) {
				res = move > this.rightBtnWidth ? move : this.rightBtnWidth;
			} else if (move > 0 && this.leftBtnWidth) {
				res = move < this.leftBtnWidth ? move : this.leftBtnWidth;
			} else {
				res = 0;
			}
			this.offsetWidth = res;
		},
		/**
		 * 结束触摸
		 */
		compTouchend(event) {
			const endOffset = parseInt(event.changedTouches[0].clientX - this.clickClientX);
			let res = 0;
			if (endOffset < 0 && this.rightBtnWidth) {
				res = endOffset > this.rightBtnWidth / 2 ? 0 : this.rightBtnWidth;
			} else if (endOffset > 0 && this.leftBtnWidth) {
				res = endOffset < this.leftBtnWidth / 2 ? 0 : this.leftBtnWidth;
			} else {
				res = 0;
			}

			this.offsetWidth = res;
		},

		async handleBtn(callback, index) {
			let flag = true;
			if (!!callback && (typeof callback === 'object' || typeof callback === 'function') && typeof callback.then === 'function') {
				flag = await callback(index);
			} else {
				callback(index);
				flag = true;
			}
			if (flag) {
				this.offsetWidth = 0;
			}
		},

		/**
		 * 触摸蒙版回调
		 */
		handleMask() {
			this.offsetWidth = 0;
		},

		/**
		 * 获取按钮部分的总长度
		 */
		getBtnWidth() {
			this.getElement('.xt_swiper--btn-right-container', elements => {
				this.rightBtnWidth = elements[0] ? 0 - elements[0].width : 0;
			});
			this.getElement('.xt_swiper--btn-left-container', elements => {
				this.leftBtnWidth = elements[0] ? elements[0].width : 0;
			});
		},
		/**
		 * 获取元素
		 */
		getElement(el, callback) {
			uni
				.createSelectorQuery()
				.in(this)
				.selectAll(el)
				.boundingClientRect()
				.exec(data => {
					callback(data[0]);
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.xt-swiper-cell {
	.xt_swiper--container {
		font-size: 28rpx;
		width: 100vw;
		min-height: 120rpx;
		white-space: nowrap;
		transition-duration: 0.6s;
		position: relative;

		.xt_swiper--content {
			display: inline-block;
			width: 100vw;
			height: 100%;
			vertical-align: top;

			.xt_swiper--content-container {
				display: flex;
				padding: 0 10rpx;
				.default_content-image {
					width: 120rpx;
					height: 120rpx;
					border-radius: 12rpx;
				}
				.default_content {
					padding-left: 20rpx;
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.default_content-title {
						font-size: 28rpx;
						color: #333333;
					}
					.default_content-desc {
						font-size: 24rpx;
						color: #999999;
					}
				}
			}
		}
	}

	// 按钮
	.xt_swiper--btn-container {
		display: inline-block;
		height: 100%;
		// scroll-snap-align: end;
	}

	.xt_swiper--btn-left-container {
		@extend .xt_swiper--btn-container;
		position: absolute;
		left: 0;
		transform: translate3d(-100%, 0, 0);
	}
	.xt_swiper--btn-right-container {
		@extend .xt_swiper--btn-container;
		position: absolute;
		right: 0;
		transform: translate3d(100%, 0, 0);
	}

	// 按钮
	.xt_swiper--btn {
		display: inline-block;
		height: 100%;

		.xt_swiper--btn-text {
			font-size: 28rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 30rpx;
			height: 100%;
			color: #ffffff;
		}
	}

	// 组件设置层级
	.xt_add-index {
		z-index: 100;
	}

	// 蒙版
	.xt_swiper--mask {
		position: fixed;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		z-index: 99;
		background-color: rgba(0, 0, 0, 0);
	}
}
</style>
