// 时间转换
export const toDateString = (d, format) => {
  if (!d) return '';
  if (typeof d === 'string') { // ie兼容
    d = d.replace(/-/g, '/')
  }
  const date = new Date(d || new Date()),
    ymd = [
      this.digit(date.getFullYear(), 4), this.digit(date.getMonth() + 1), this.digit(date.getDate())
    ],
    hms = [
      this.digit(date.getHours()), this.digit(date.getMinutes()), this.digit(date.getSeconds())
    ];

  format = format || 'yyyy-MM-dd HH:mm:ss';

  return format
    .replace(/yyyy/g, ymd[0])
    .replace(/MM/g, ymd[1])
    .replace(/dd/g, ymd[2])
    .replace(/HH/g, hms[0])
    .replace(/mm/g, hms[1])
    .replace(/ss/g, hms[2]);
}
// 补零
export const digit = (num, length) => {
  let str = '';
  num = String(num);
  length = length || 2;
  for (let i = num.length; i < length; i++) {
    str += '0';
  }
  return num < Math.pow(10, length) ? str + (num | 0) : num;
}
