type AnyFunction = (...args: any[]) => void;

export function debounce<T extends AnyFunction>(fn: T, delay = 300) {
  let timer: ReturnType<typeof setTimeout> | undefined;

  return (...args: Parameters<T>) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

export function throttle<T extends AnyFunction>(fn: T, delay = 300) {
  let lastRunTime = 0;

  return (...args: Parameters<T>) => {
    const now = Date.now();

    if (now - lastRunTime < delay) {
      return;
    }

    lastRunTime = now;
    fn(...args);
  };
}
