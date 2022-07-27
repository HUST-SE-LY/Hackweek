import {
  showToast
} from "./wx-event";
class Axios {
  constructor(options) {
    options = options || {};
    //待定
    this.baseUrl = options.baseUrl || "https://";
    this.method = options.method || "get";
    this.data = options.data;
    this.header = options.header || {
      // wx.requeset的话Content-Type默认值是application/json
      'Content-Type': 'application/json; charset=UTF-8',
      // 用storage来存登录时后端给的token
      'Authorization': wx.getStorageSync('token')
    };
  }
  request(url, data, method, header) {
    this.url = url;
    this.data = data;
    this.method = method;
    this.header = header;
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.baseUrl || ''}${this.url}`,
        method: this.method,
        data: this.data,
        header: this.header,
        enableCache: this.enableCache,
        success(req) {
          if (req.statusCode >= 200 && req.statusCode < 300) {
            resolve(req);
          } else {
            // 这个看后端有没有好好写errMsg，好好写的话可以统一拿errMsg做toast内容
            // showToast(err.errMsg);
            reject(req);
          }
        },
        fail(err) {
          // 这个fail触发的话就是url没配置，请求失败的话在上面的url
          showToast(err.errMsg);
        },
      });
    });
  }
  get(url, data) {
    return this.request(url, data, 'get');
  }

  post(url, data, customHeader) {
    return this.request(url, JSON.stringify(data), 'post');
  }

  put(url, data) {
    return this.request(url, data, 'put');
  }

  delete(url, data, customHeader) {
    return this.request(url, data, 'delete');
  }
}
module.exports = new Axios()