//https://www.joshwcomeau.com/snippets/javascript/debounce/
export default function debounce(callback: Function, wait: number) {
  // let timeoutId: ReturnType<typeof setTimeout> | undefined = undefined;
  let timeoutId: number | undefined;

  return (...args: any) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}
