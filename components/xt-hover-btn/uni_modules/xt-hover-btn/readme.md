# xt-hover-btn 悬浮按钮
> 可根据设置悬浮在 左上、右上、左下、右下，也可以设置距离页面边界的距离

## 引入方法
```vue
<xt-hover-btn></xt-hover-btn>
```


## 参数
|属性				|类型					|说明																												|默认值									|
|--					|--						|--																													|--											|
|type				|String				|按钮位置 可选值:left-top/left-bottom/right-top/right-bottom|right-bottom						|
|size				|Number/String|按钮大小																										|默认: 60 单位默认: px	|
|horizontal	|Number/String|水平方向上与页面边的距离																		|默认: 20，单位默认: px	|
|vertical		|Number/String|垂直方向上与页面边的距离																		|默认: 20，单位默认: px	|
|bgColor		|String				|背景色																											|默认: #0486fe					|
## 事件
|事件	|说明							|
|--		|--								|
|click|点击按钮触发事件	|

## slot
|slot		|说明			|
|--			|--				|
|default|图标插槽	|



