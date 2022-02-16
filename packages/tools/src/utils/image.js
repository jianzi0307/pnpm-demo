import Exif from "exif-js";

/**
 * 图片压缩处理工具
 */
class ImageUtil {
  /**
   * 处理图片
   * @param file 文件
   * @param quality 质量 0~1
   */
  async handle(file, quality = 0.1) {
    let self = this;
    let orientation = await self.getOrientation(file);
    return new Promise((resolve, reject) => {
      // 看支持不支持FileReader
      if (!file || !window.FileReader) {
        reject(new Error("false"));
      }
      if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader();
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file);
        // 读取成功后的回调
        reader.onloadend = function () {
          let result = reader.result;
          let img = new Image();
          img.src = result;
          // 判断图片是否大于100K,是就压缩，反之直接上传
          if (reader.result.length <= 100 * 1024) {
            let contentType = self.base64ContentType(reader.result);
            let realData = self.base64RealData(reader.result);
            let blob = self.b64toBlob(realData, contentType);
            resolve(blob);
          } else {
            img.onload = function () {
              let baseData = self.compress(img, orientation, quality);
              let contentType = self.base64ContentType(baseData);
              let realData = self.base64RealData(baseData);
              let blob = self.b64toBlob(realData, contentType);
              resolve(blob);
            };
          }
        };
      }
    });
  }

  /**
   * base64转Blob
   * @param b64Data
   * @param contentType
   * @param sliceSize
   * @returns {Blob}
   */
  b64toBlob(b64Data, contentType = "", sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, {
      type: contentType,
    });
  }

  /**
   * dataUrl图片类型
   * @param b64Data
   * @returns {string}
   */
  base64ContentType(b64Data) {
    let block = b64Data.split(";");
    let contentType = block[0].split(":")[1];
    return contentType;
  }

  /**
   * dataUrl中的base64数据
   * @param b64Data
   * @returns {string}
   */
  base64RealData(b64Data) {
    let block = b64Data.split(";");
    let realData = block[1].split(",")[1];
    return realData;
  }

  /**
   * 去获取拍照时的信息，解决拍出来的照片旋转问题
   * @param file
   * @returns {Promise<*>}
   */
  async getOrientation(file) {
    return new Promise((resolve, reject) => {
      Exif.getData(file, function () {
        let orientation = Exif.getTag(this, "Orientation");
        resolve(orientation);
      });
    });
  }

  /**
   * 旋转图片
   * @param img
   * @param direction
   * @param canvas
   */
  rotateImg(img, direction, canvas) {
    // 最小与最大旋转方向，图片旋转4次后回到原方向
    const minStep = 0;
    const maxStep = 3;
    if (img == null) return;
    // img的高度和宽度不能在img元素隐藏后获取，否则会出错
    let height = img.height;
    let width = img.width;
    let step = 2;
    if (step == null) {
      step = minStep;
    }
    if (direction === "right") {
      step++;
      // 旋转到原位置，即超过最大值
      step > maxStep && (step = minStep);
    } else {
      step--;
      step < minStep && (step = maxStep);
    }
    // 旋转角度以弧度值为参数
    let degree = (step * 90 * Math.PI) / 180;
    let ctx = canvas.getContext("2d");
    switch (step) {
      case 0:
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0);
        break;
      case 1:
        canvas.width = height;
        canvas.height = width;
        ctx.rotate(degree);
        ctx.drawImage(img, 0, -height);
        break;
      case 2:
        canvas.width = width;
        canvas.height = height;
        ctx.rotate(degree);
        ctx.drawImage(img, -width, -height);
        break;
      case 3:
        canvas.width = height;
        canvas.height = width;
        ctx.rotate(degree);
        ctx.drawImage(img, -width, 0);
        break;
    }
  }

  /**
   * 压缩图片
   * @param img
   * @param Orientation
   * @param quality
   * @returns {string}
   */
  compress(img, Orientation, quality = 0.1) {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    // 瓦片canvas
    let tCanvas = document.createElement("canvas");
    let tctx = tCanvas.getContext("2d");
    let initSize = img.src.length;
    let width = img.width;
    let height = img.height;
    // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
    let ratio;
    if ((ratio = (width * height) / 4000000) > 1) {
      console.log("大于800万像素");
      ratio = Math.sqrt(ratio);
      width /= ratio;
      height /= ratio;
    } else {
      ratio = 1;
    }
    canvas.width = width;
    canvas.height = height;
    // 铺底色
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // 如果图片像素大于100万则使用瓦片绘制
    let count;
    if ((count = (width * height) / 400000) > 1) {
      console.log("超过100W像素");
      count = ~~(Math.sqrt(count) + 1); // 计算要分成多少块瓦片
      // 计算每块瓦片的宽和高
      let nw = ~~(width / count);
      let nh = ~~(height / count);
      tCanvas.width = nw;
      tCanvas.height = nh;
      for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; j++) {
          tctx.drawImage(
            img,
            i * nw * ratio,
            j * nh * ratio,
            nw * ratio,
            nh * ratio,
            0,
            0,
            nw,
            nh
          );
          ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
        }
      }
    } else {
      ctx.drawImage(img, 0, 0, width, height);
    }
    // 修复ios上传图片的时候 被旋转的问题
    if (Orientation !== "" && Orientation !== 1) {
      switch (Orientation) {
        case 6: // 需要顺时针（向左）90度旋转
          this.rotateImg(img, "left", canvas);
          break;
        case 8: // 需要逆时针（向右）90度旋转
          this.rotateImg(img, "right", canvas);
          break;
        case 3: // 需要180度旋转
          // 转两次
          this.rotateImg(img, "right", canvas);
          this.rotateImg(img, "right", canvas);
          break;
      }
    }
    // 进行最小压缩
    let ndata = canvas.toDataURL("image/jpeg", quality);
    console.log("压缩前：" + initSize);
    console.log("压缩后：" + ndata.length);
    console.log(
      "压缩率：" + ~~((100 * (initSize - ndata.length)) / initSize) + "%"
    );
    tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
    return ndata;
  }
}

export default new ImageUtil();
