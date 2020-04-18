export function dateFormat(dateString, fmt = 'YYYY-mm-dd HH:MM') {
  const date = new Date(parseInt(dateString))
  let ret
  const opt = {
    'Y+': date.getFullYear().toString(),        // 年
    'm+': (date.getMonth() + 1).toString(),     // 月
    'd+': date.getDate().toString(),            // 日
    'H+': date.getHours().toString(),           // 时
    'M+': date.getMinutes().toString(),         // 分
    'S+': date.getSeconds().toString()          // 秒
  }
  for (let k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
    }
  }
  return fmt
}

// base64 转 string
export async function base64ToString(content) {
  return await Buffer.from(content, 'base64').toString('utf-8')
}

// string 转 base64
export async function stringToBase64(content) {
  return await Buffer.from(content, 'utf-8').toString('base64')
}

//获取页面顶部被卷起来的高度
export function getScrollTop() {
  return Math.max(
    //chrome
    document.body.scrollTop,
    //firefox/IE
    document.documentElement.scrollTop,
  );
}

//获取页面文档的总高度
export function getDocumentHeight() {
  //现代浏览器（IE9+和其他浏览器）和IE8的document.body.scrollHeight和document.documentElement.scrollHeight都可以
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
  );
}

//页面浏览器视口的高度
export function getWindowHeight() {
  return document.compatMode === 'CSS1Compat'
    ? document.documentElement.clientHeight
    : document.body.clientHeight;
}

export function getSessionStorage(key) {
  return sessionStorage.getItem(key) || null
}

export function setSessionStorage(key, data) {
  return sessionStorage.setItem(key, data)
}


