# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## useContext 很灵活

通过 createContext 创建一个 contextProvider 就可以在任意组件里面传递数据，而且很灵活，可以直接在跟组件里面用 contextProvider 来包裹根组件。
也可以用它包裹任意你想传递数据的组件当中。

## 上传文件功能中的一些问题

```tsx
<label>
  <input
    type='file'
    onChange={handleUploadImage}
    className='hidden'
  />
  <Button
    variant='flat'
    isIconOnly
    as='span'>
    <UploadLogo />
  </Button>
</label>
```

这里的 `as=span` 是因为有一些默认行为，会影响事件上传功能的执行，所以这里用 `as='span'` 来修复这个问题。我试了一下用 `button` 来代替 `Button`,删除了一个特定的事件监听器之后，文件上传功能可以执行了，不过我忘记是哪个特定的事件了，但是那个事件不是 button 本身的监听器而是其他的，会针对 button。

```tsx
<input
  accept={accept}
  multiple={multiple}
  onChange={fileChange}
  type="file"
  ref={inputRef}
  style={{ display: 'none' }}
></input>
<Button handleClick={uploadClick} style={{ margin: '8px' }} type="primary">
  <UploadOutlined />
  上传
</Button>
```

- 第一种用`<label>`的方式是基于 HTML 标准的行为。标准的 HTML`<label>`元素可以关联到其它字段，当用户点击`<label>`时相当于点击了这些字段，甚至当这些字段不可见时也是这样。

- 第二种是更灵活的 JavaScript 方法。它不依赖于 HTML 的默认行为，而是需要额外的 JavaScript 代码来实现。通常在 uploadClick 函数内部会有一个额外的步骤来手动调用`<input>`元素的点击事件（比如 inputRef.current.click()）。与第一种方法不同的是，这个`<Button>`和`<input>`之间的行为不是通过 HTML 结构来实现的，而是通过 JavaScript 来控制的。

## 添加切换字体

记录一下过程：

1. 添加字体文件到 `src/assets/fonts` 目录下
2. 在 `inedx.css` 中引入（我这里没有使用 tailwind 的导入）
3. 定义 `fontValue` 的 state，和一个用于展示字体值的数组 `font_list`
   context 中传递 `fontValue` 和 `setFontValue` 还有 `handleChangeFont` 用于切换字体的方法

4. RightBoard 中接收 `handleChangeFont`，CenterBoard 中接收 `fontValue`

![图片](/src/assets/images/font.png)

## 下载功能

1. 定义了一个新的 `ImageDownloadContext`, 并且在其中提供了一个 `imageContainerRef` 和 `handleDownloadImage`
2. 在 `RightBoard` 中接收 `handleDownloadImage`，在 `CenterBoard` 中接收 `imageContainerRef`


