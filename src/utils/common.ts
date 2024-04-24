// 防抖
export function   (fn: { apply: (arg0: any, arg1: any) => void }, t: number) {
  let timeId: any = null
  const delay = t || 5000
  return function (this: any, ...args: any) {
    if (timeId) {
      clearTimeout(timeId)
    }
    timeId = setTimeout(() => {
      timeId = null
      fn.apply(this, args)
      console.log('执行了一次+++++++++++++++++++++++++++++++++++++');
    }, delay)
  }
}

export function imdebounce(
  func: Function,
  wait: number = 500,
  immediate: boolean = true
): (...args: any[]) => void {
  let timeout: number | null;

  return function (this: any, ...args: any[]): void {
    const context = this;

    const later = function () {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };

    const callNow = immediate && !timeout;

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, wait);

    if (callNow) {
      func.apply(context, args);
    }
  };
}

// 节流
export function throttle(fn: { apply: (arg0: any, arg1: any[]) => void }, t: number) {
  let flag = true
  const interval = t || 500
  return function (this: any, ...args: any) {
    console.log('执行了一次+++++++++++++++++++++++++++++++++++++', flag);
    if (flag) {
      console.log('执行了一次');

      fn.apply(this, args)
      flag = false
      setTimeout(() => {
        flag = true
      }, interval)
    }
  }
}