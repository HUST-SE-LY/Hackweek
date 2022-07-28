export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

export const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

//把2022/07/27 18:02:01转换成呈现出来的内容
export const correctTime = formatDate => {
  let res;
  const date = new Date(formatDate);
  const timeBetween = new Date() - date;
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  if (timeBetween / day > 9) {
    res = `${date.getFullYear()}-${
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1
    }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;
  } else if (timeBetween / day >= 1) {
    res = `${Math.floor(timeBetween / day)}天前`;
  } else if (timeBetween / hour >= 1) {
    res = `${Math.floor(timeBetween / hour)}小时前`;
  } else if (timeBetween / minute >= 1) {
    res = `${Math.floor(timeBetween / minute)}分钟前`;
  } else res = '刚刚';
  return res
}
