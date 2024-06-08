# xt-tabs 标签页
## 使用方法
```vue
<xt-tabs :list="list"></xt-tabs>
```
## 插件使用了scss，安装本插件之前，请选择安装scss

| 属性			| 类型																			| 默认值| 必填| 说明																		|
| ----			| ----																			| ----	| ----| ----																		|
|list				|Array<{label: string,value: string}>				|[]			|是		|标签数组																	|
|value			|number																			| --		|否		|设置激活 tab 的 索引值										|
|normalColor|string																			|#CCCCCC|否		|tab 未激活的颜色													|
|activeColor|string																			|#18A0FB|否		|当前 tab 激活的颜色											|
|lineColor	|string																			|#18A0FB|否		|当前 tab 的下划线的颜色会覆盖 activeColor|
|lineWidth	|number																			|0.7		|否		|相对于 tab 宽度的比例										|
|@change		| (tabsIndex: number, item: ListMap) => void|--			|否		|切换 tab 回调事件												|
