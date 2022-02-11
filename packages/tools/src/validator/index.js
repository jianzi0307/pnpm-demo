import isValidIdCard from "./idCard";

// 手机号验证
function isValidPhone(str) {
  const reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
  return reg.test(str);
}

// 邮箱验证
function isValidEmail(str) {
  const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
  return reg.test(str);
}

/**
 * 4位验证短信验证码格式
 * @param {string} code
 */
function isValidSmsCode(code) {
  return /^\d{4}$/.test(code);
}

/**
 * 验证昵称格式
 * @param {string} nickname
 */
function isValidNickName(nickname) {
  return /^[\u4E00-\u9FA5A-Za-z][\u4E00-\u9FA5A-Za-z0-9]+$/.test(nickname);
}

// 企业信用代码
function isValidSocialCreditCode(code) {
  const patrn = /^[0-9A-Z]+$/;
  // 信用代码为14位时，验证规则为14位
  const numberPatern = /^\d{14}$/;
  if (code.length === 14) {
    return numberPatern.test(code);
  }
  // 18位校验及大写校验
  if (code.length !== 18 || patrn.test(code) === false) {
    console.info("不是有效的统一社会信用编码！");
    return false;
  } else {
    var Ancode; // 统一社会信用代码的每一个值
    var Ancodevalue; // 统一社会信用代码每一个值的权重
    var total = 0;
    var weightedfactors = [
      1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28,
    ]; // 加权因子
    var str = "0123456789ABCDEFGHJKLMNPQRTUWXY";
    // 不用I、O、S、V、Z
    for (var i = 0; i < code.length - 1; i++) {
      Ancode = code.substring(i, i + 1);
      Ancodevalue = str.indexOf(Ancode);
      total = total + Ancodevalue * weightedfactors[i];
      // 权重与加权因子相乘之和
    }
    var logiccheckcode = 31 - (total % 31);
    if (logiccheckcode === 31) {
      logiccheckcode = 0;
    }
    var Str = "0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,J,K,L,M,N,P,Q,R,T,U,W,X,Y";
    var arrayStr = Str.split(",");
    logiccheckcode = arrayStr[logiccheckcode];
    var checkcode = code.substring(17, 18);
    if (logiccheckcode !== checkcode) {
      return false;
    } else {
      return true;
    }
  }
}

export {
  isValidIdCard,
  isValidPhone,
  isValidEmail,
  isValidSocialCreditCode,
  isValidSmsCode,
  isValidNickName,
};
