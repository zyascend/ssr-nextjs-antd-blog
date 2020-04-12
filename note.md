- pages/下 的文件代表一个页面(除了_app.js, _document.js)
- link本身不渲染任何节点 其子元素必须满足：1. 只有一个 2. 能够响应点击事件 
```html
<Link href="/a" title="a"">
	<button>to /a </button>
</Link>
```

- getInitialProps向pages/下的文件夹注入props

```js
Page.getInitialProps = async () => {
  const data = await getData()
  return data
}
```
- _app.js 

	1. 渲染固定的layout
	2. 存放共用的数据状态
	3. 给页面传入自定义的数据


