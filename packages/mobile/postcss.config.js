module.exports = {
  plugins: {
    "postcss-px-to-viewport": {
      // 这里配置设计尺寸 750px = 100vw
      viewportWidth: 750,
      unitPrecision: 6,
      unitToConvert: "px",
      propList: ["*"],
    },
  },
};
