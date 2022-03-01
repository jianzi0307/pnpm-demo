## postcss-px-to-viewport适配

- html模板添加meta

```html
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"/>
```

- 安装 postcss-px-to-viewport

```
npm install -S postcss-px-to-viewport
```

- 创建postcss.config.js

```javascript
module.exports = {
  plugins: {
    "postcss-px-to-viewport": {
      // 这里配置设计尺寸 1920px = 100vw
      viewportWidth: 1920,
      unitPrecision: 6,
      unitToConvert: "px",
      propList: ["*"],
    },
  },
};

```