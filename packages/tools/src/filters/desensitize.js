// 姓名
// 邮箱
// 银行卡号

// 身份证脱敏
export const desensitizeIdCard = (value) => {
  if (!value) {
    return "-";
  }
  return value.replace(/^(.{6})(?:\d+)(.{4})$/, "$1****$2");
};

// 手机号脱敏
export const desensitizePhone = (value) => {
  if (!value) {
    return "-";
  }
  return value.replace(/^(.{3})(?:\d+)(.{4})$/, "$1****$2");
};
