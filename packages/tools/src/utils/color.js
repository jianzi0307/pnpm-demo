/**
 * JS颜色十六进制转换为rgb或rgba,返回的格式为 rgba（255，255，255，0.5）字符串
 * @param {*} sHex  十六进制的色值
 * @param alpha为rgba的透明度
 */
function colorHex2Rgba(sHex, alpha = 1) {
  // 十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  /* 16进制颜色转为RGB格式 */
  let sColor = sHex.toLowerCase()
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = '#'
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
      }
      sColor = sColorNew
    }
    //  处理六位的颜色值
    var sColorChange = []
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
    }
    // return sColorChange.join(',')
    // 或
    return 'rgba(' + sColorChange.join(',') + ',' + alpha + ')'
  } else {
    return sColor
  }
}

export { colorHex2Rgba }
