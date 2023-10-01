export const debounceMethod =(timeout:null | NodeJS.Timeout, fn: () => void, delay: number = 1000) => {
    if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => fn(), delay);
      return timeout;
}