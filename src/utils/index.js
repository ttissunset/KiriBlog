/**
 * 防抖函数
 * @param {Function} fn 需要防抖的函数
 * @param {number} delay 延迟时间，单位毫秒
 * @returns {Function} 防抖后的函数
 */
export const debounce = (fn, delay = 300) => {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

/**
 * 节流函数
 * @param {Function} fn 需要节流的函数
 * @param {number} delay 延迟时间，单位毫秒
 * @returns {Function} 节流后的函数
 */
export const throttle = (fn, delay = 300) => {
  let timer = null;
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= delay) {
      fn.apply(this, args);
      lastTime = now;
    } else {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args);
        lastTime = Date.now();
      }, delay);
    }
  };
};

/**
 * 日期格式化
 * @param {Date|string|number} date 日期对象/日期字符串/时间戳
 * @param {string} format 格式化模板，如 'YYYY-MM-DD HH:mm:ss'
 * @returns {string} 格式化后的日期字符串
 */
export const formatDate = (date, format = 'YYYY-MM-DD HH:mm:ss') => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');

  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
};

/**
 * 文件大小格式化
 * @param {number} bytes 文件大小（字节）
 * @returns {string} 格式化后的文件大小
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * 深拷贝
 * @param {*} obj 需要深拷贝的对象
 * @returns {*} 深拷贝后的对象
 */
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  const clone = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clone[key] = deepClone(obj[key]);
    }
  }
  return clone;
};

/**
 * 随机字符串生成
 * @param {number} length 字符串长度
 * @returns {string} 随机字符串
 */
export const randomString = (length = 32) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * 获取URL参数
 * @param {string} name 参数名
 * @returns {string|null} 参数值
 */
export const getUrlParam = (name) => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  const r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURIComponent(r[2]);
  return null;
};

/**
 * 数组去重
 * @param {Array} arr 需要去重的数组
 * @returns {Array} 去重后的数组
 */
export const uniqueArray = (arr) => {
  return [...new Set(arr)];
};

/**
 * 获取数据类型
 * @param {*} data 需要判断类型的数据
 * @returns {string} 数据类型
 */
export const getType = (data) => {
  return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
};

/**
 * 判断是否为空值
 * @param {*} value 需要判断的值
 * @returns {boolean} 是否为空
 */
export const isEmpty = (value) => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string' && value.trim() === '') return true;
  if (Array.isArray(value) && value.length === 0) return true;
  if (typeof value === 'object' && Object.keys(value).length === 0) return true;
  return false;
};

/**
 * 数字千分位格式化
 * @param {number} num 需要格式化的数字
 * @returns {string} 格式化后的字符串
 */
export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * 颜色值转换
 * @param {string} color 颜色值
 * @returns {Object} RGB对象
 */
export const colorToRGB = (color) => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return { r, g, b };
};

/**
 * 复制文本到剪贴板
 * @param {string} text 需要复制的文本
 * @returns {Promise} Promise对象
 */
export const copyToClipboard = (text) => {
  return navigator.clipboard.writeText(text);
};

/**
 * 获取浏览器信息
 * @returns {Object} 浏览器信息对象
 */
export const getBrowserInfo = () => {
  const ua = navigator.userAgent;
  const browser = {
    isChrome: /chrome/i.test(ua),
    isFirefox: /firefox/i.test(ua),
    isSafari: /safari/i.test(ua),
    isEdge: /edge/i.test(ua),
    isIE: /msie|trident/i.test(ua),
    isOpera: /opera/i.test(ua),
    version: ua.match(/(?:chrome|firefox|safari|edge|msie|trident|opera)\/?\s*([\d.]+)/i)?.[1] || 'unknown'
  };
  return browser;
}; 