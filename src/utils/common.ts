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