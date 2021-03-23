# xt-swiper-cell 滚动的单元格

## 使用方法
```js
import XtSwiperCell from 'components/xt-swiper-cell/xt-swiper-cell.vue'

Vue.component('xt-swiper-cell', XtSwiperCell)
```

```html
<xt-swiper-cell
	style="margin-bottom: 10rpx;"
	:left="[{ text: '完成' }]"
	:right="[{ text: '完成' }, { text: '删除', backgroundColor: '#E53A40' }]"
	:content="{ title: '测试标题', desc: '测试描述' }"
/>

```

## Props
|  参数		| 说明			| 类型	| 默认值|
|  ----		| ----			| ----	| ----	|
| content	| 主要内容		| Object| null	|
| left		| 左边按钮数组	| Array	| []	|
| right		| 右边按钮数组	| Array	| []	|

## content 参数说明
|  参数		| 说明	|类型		|默认值	|
|  ----		| ----	|----		|----	|
| image	| 图片地址| String	| 自动生成一个图片|
|  title| 标题		| String	|''
| desc	| 描述		| String	|''

## left/right 按钮对象参数说明
|  参数   | 说明  | 类型 | 默认值
|  ----   | ----  | ---- | ---- 
| text			| 文本				| String|
| color			| 文本颜色			| String|
|backgroundColor| 按钮背景颜色		| String|
| style			| 自定义样式		| Object	|
| callback		| 点击按钮的回调事件| (index:number) => void/Promise	|

> callback 是Promise函数，根据 resolve(true), reject(false) 控制是否隐藏按钮 

## slot 插槽
|  参数		| 说明		|
|  ----		| ----		|
| defalut	| 主要内容	|
|  left		| 左边按钮	|
| right		| 右边按钮	|