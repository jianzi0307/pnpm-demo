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
