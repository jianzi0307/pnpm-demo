/**
 * base64格式转File
 * let file = base64toFile('你需要转成file的base64','filename')
 * @param {string} base64Str
 * @param {string} filename
 * @returns {File}
 */
function base64toFile(base64Str, filename) {
  let arr = base64Str.split(',')
  let mime = arr[0].match(/:(.*?);/)[1]
  let suffix = mime.split('/')[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], `${filename}.${suffix}`, {
    type: mime
  })
}

/**
 * 下载文件
 * @param { BlobPart } data 后台返回的文件内容
 * @param { string } fileName 下载生成的文件名
 * @param { string } meta 文件类型
 */
function download(data, fileName = 'a.pdf', meta = "application/pdf") {
  if (!data) return;
  const blob = new Blob([data], { type: meta })
  let url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.style.display = 'none'
  a.download = fileName
  a.href = url
  a.click()
  URL.revokeObjectURL(a.href)
  if (document.body.contains(a)) {
    document.body.removeChild(a)
  }
}

export { base64toFile, download }
