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

export function correctCreatedAt(date) {//将CreatedAt转换的函数
  let Array1=date.split("-");
  const year=parseInt(Array1[0]);
  const month=parseInt(Array1[1]);
  let Array2=Array1[2].split("T");
  const day=parseInt(Array2[0]);
  const Array3=Array2[1].split(":");
  const hour=parseInt(Array3[0]);
  const minute=parseInt(Array3[1]);
  const Array4=Array3[2].split(".");
  const second=parseInt(Array4[0]);
  let now=new Date();
  let yearNow=now.getFullYear();
  let monthNow=now.getMonth();
  let dayNow=now.getDate();
  let hourNow=now.getHours();
  let minuteNow=now.getMinutes();
  let secondNow=now.getSeconds();
  console.log(hour)
  if(yearNow-year>=1) {
    return `${year}年${month}月${day}日`;
  } else if(monthNow-month>=1) {
    return `${month}月${day}日`;
  } else if(dayNow - day>=1) {
    return `${dayNow - day}天前`
  } else if(hourNow-hour-8>=1) {
    return `${hourNow-hour-8}小时前`
  } else if(minuteNow - minute>=1) {
    return `${minuteNow - minute}分钟前`
  } else {
    return `刚刚`
  }

}
