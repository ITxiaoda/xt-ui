<template>
	<view id="cus__tabs" class="xt__tabs">
		<scroll-view scroll-x scroll-with-animation :scroll-left="scrollLeft" @scroll="onScroll">
			<view :class="['tabs-list', list.length > 5 ? 'tabs-list-more' : 'tabs-list-normal']">
				<template v-for="(item, index) in list">
					<view
						id="tab__item"
						:key="item.value"
						:class="['tabs-item', list.length > 5 ? 'tabs-item-more' : 'tabs-item-normal']"
						:style="{ color: tabsIndex === index ? activeColor : normalColor }"
						@click="changeTabs(value || index)"
					>
						<text class="item-text">{{ item.label }}</text>
					</view>
				</template>
			</view>

			<view
				class="underline"
				:style="{
					width: tabsLineWidth + 'px',
					transform: `translateX(${tabsItemMove}px) `,
					backgroundColor: lineColor || activeColor
				}"
			></view>
		</scroll-view>
	</view>
</template>
<script>
export default {
	name: 'xt-tabs',
	props: {
		list: {
			type: Array,
			default: () => []
		},
		normalColor: {
			type: String,
			default: () => '#CCCCCC'
		},
		activeColor: {
			type: String,
			default: () => '#18A0FB'
		},
		lineColor: {
			type: String,
			default: () => ''
		},
		value: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			tabsIndex: 0,
			tabsLineWidth: 0,
			tabsItemMove: 0,
			scrollLeft: 0,
			cusTabsItemElem: null, // 整个tabs 实例
			tabsItemInfoList: [], // 初始化获取每个tab的实例
			scrollLeftNum: 0, // 保存每次滚动条改变的位置
			diffValue: 30, // 手动改变滚动条时添加的差值
			lineWidthRatio: 0.7 // 下划线相对于tab宽度比例
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			const { lineWidth = 0.7, value, list } = this;
			if (lineWidth > 1) {
				throw new Error('lineWidth must be less than 1');
			} else {
				this.lineWidthRatio = lineWidth;
			}
			if (typeof value !== 'undefined') {
				if (typeof value === 'number' && (value >= 0 || value < list.length)) {
					this.tabsIndex = value;
				} else {
					throw new Error('value must be index value of list');
				}
			}

			this.getTabsItemElem();
		},
		getTabsItemElem() {
			setTimeout(() => {
				this.getElem('#tab__item', res => {
					this.tabsItemInfoList = res;
					this.changeLine();
				});
				this.getElem('#cus__tabs', res => {
					this.cusTabsItemElem = res[0];
				});
			}, 300);
		},
		// 获取节点
		getElem(el, callback) {
			uni
				.createSelectorQuery()
				.in(this)
				.selectAll(el)
				.boundingClientRect()
				.exec(data => {
					callback(data[0]);
				});
		},

		// 点击tab回调
		changeTabs(index) {
			this.setScrollLeft(index);
			this.tabsIndex = index;
			this.changeLine();
			this.$emit('change', index, this.list[index]);
		},

		// 改变下划线的位置
		changeLine() {
			const width = this.tabsItemInfoList[this.tabsIndex].width;
			const move = this.tabsItemInfoList[this.tabsIndex].left;
			this.tabsLineWidth = width * this.lineWidthRatio;
			this.tabsItemMove = move + width * (0.5 - this.lineWidthRatio / 2);
		},

		// 设置滚动条位置
		setScrollLeft(index) {
			this.getElem('#tab__item', res => {
				if (res[index].right > this.cusTabsItemElem.right) {
					this.scrollLeftNum += res[index].right - this.cusTabsItemElem.right;
					this.scrollLeft = this.scrollLeftNum + this.diffValue;
				}
				if (res[index].left < this.cusTabsItemElem.left) {
					this.scrollLeftNum += res[index].left;
					this.scrollLeft = this.scrollLeftNum - this.diffValue;
				}
			});
		},
		onScroll(event) {
			this.scrollLeftNum = event.detail.scrollLeft;
		}
	}
};
</script>
<style lang="scss" scoped>
.xt__tabs {
	width: 100%;
	overflow-x: auto;
	position: relative;
	border-bottom: 1px solid #cccccc;
	scrollbar-width: 0;

	&::-webkit-scrollbar {
		display: none;
	}

	.tabs-list {
		height: 70rpx;
		line-height: 70rpx;
		scrollbar-width: 0;
		white-space: nowrap;
		box-sizing: border-box;

		&::-webkit-scrollbar {
			display: none;
		}

		&-normal {
			display: flex;
		}

		&-more {
			display: block;
		}

		.tabs-item {
			text-align: center;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			box-sizing: border-box;

			&-normal {
				flex: 1;
			}

			&-more {
				display: inline-block;
				width: 18.5%;
			}

			.item-text {
				font-size: 28rpx;
				white-space: nowrap;
			}
		}
	}

	.underline {
		height: 6rpx;
		transition: all 0.3s ease;
	}
}
</style>
