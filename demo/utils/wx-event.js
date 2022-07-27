export const showToast = (title, icon = 'none', image = null, durcation = 1500, mask = false) => {
  let trueTitle = title;
  if (typeof title.data === 'string') {
    trueTitle = title.data;
  }
  if (typeof title.data === 'object') {
    trueTitle = title.data.msg;
  }
  return wx.showToast({
    title: trueTitle,
    icon,
    image,
    durcation,
    mask,
  });
};