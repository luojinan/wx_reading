function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export function throttle(func, wait, trailing) {
  console.log('执行函数');
  /* options的默认值
   *  表示首次调用返回值方法时，会马上调用func
   *  否则仅会记录当前时刻，当第二次调用的时间间隔超过wait时，才调用func
   *
   *  options.leading = true;
   * 表示当调用方法时，未到达wait指定的时间间隔，则启动计时器延迟调用func函数，
   * 若后续在既未达到wait指定的时间间隔和func函数又未被调用的情况下调用返回值方法，则被调用请求将被丢弃。
   *  options.trailing = true
   * 注意：当options.trailing = false时，效果与上面的简单实现效果相同
   */
  // var context, args, result
  let timer = null
  let start = 0
  // if (!options) options = {}

  return function () {
    let now = new Date()
    // if (!start && options.leading === false) start = now
    // 计算剩余时间
    let remaining = wait - (now - start) // 拦截：延迟时间>多次点击间隔时间，执行：多次点击间隔时间>延迟时间
    // context = this
    // args = arguments
    // 执行：多次点击间隔时间>延迟时间或相减小于0（非频繁操作）
    // 延迟时间减间隔时间 大于延迟时间(间隔时间小于0 现在-上一次时间小于0)
    console.log(remaining);
    if ((now - start) >= wait) {
      // 由于setTimeout存在最小时间精度问题，因此会存在到达wait的时间间隔
      // 但之前设置的setTimeout操作还没被执行，因此为保险起见，这里先清理setTimeout操作
      timer && clearTimeout(timer)
      timer = null
      start = now
      console.log('1、上一次时间', start, '延迟时间与间隔时间的差', remaining)
      return func()
      // if (!timer) context = args = null
    } else if (!timer && trailing) {
      // options.trailing=true时，延时执行func函数
      // timer = setTimeout(later, remaining)
      console.log('看看有没有定时器', timer);
      timer = setTimeout(() => {
        // start = options.leading === false ? 0 : new Date()
        timer = null
        console.log('2、上一次时间', start, '延迟时间与间隔时间的差', remaining)
        return func
        // if (!timer) context = args = null
      }, remaining)
    }
    // return result // return null不执行，执行则有值
  }
}

export function throttle2(func, wait, trailing) {
  console.log('执行函数') // 这是闭包，函数只要引入页面就执行了
  let timer = null
  let start = 0
  let now = new Date()
  let remaining = wait - (now - start)
  console.log(start)
  // 拦截：延迟时间>多次点击间隔时间，执行：多次点击间隔时间>延迟时间
  if ((now - start) >= wait) {
    // 由于setTimeout存在最小时间精度问题，因此会存在到达wait的时间间隔
    // 但之前设置的setTimeout操作还没被执行，因此为保险起见，这里先清理setTimeout操作
    timer && clearTimeout(timer)
    timer = null
    start = now
    console.log('1、延迟时间与间隔时间的差', remaining)
    return func
  } else if (!timer && trailing) {
    // trailing有值时，延时执行func函数
    // 频繁操作，第一次设置定时器之后，之后的不会再走到这里创建定时器
    // 清除问题，只能在第二有效点击的时候才会清除
    timer = setTimeout(() => {
      timer = null
      console.log('定时器延时执行')
      return func
    }, remaining)
  }
}

export function add () {
  let a = 0
  console.log('初始化执行add外部 局部变量',a)
  return function () {
    a++
    console.log('内部方法累加后',a)
  }
}
export default {
  add,
  formatNumber,
  formatTime,
  throttle,
  throttle2
}
