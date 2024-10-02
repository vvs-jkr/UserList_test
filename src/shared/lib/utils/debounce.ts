export const debounce = (func: Function, delay: number) => {
  let timeout: NodeJS.Timeout
  return (...args: any[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), delay)
  }
}


// function debounce(func: (...args: any[]) => void, delay: number) {
// 	let timeout: ReturnType<typeof setTimeout>;
 
// 	return function (...args: any[]) {
// 	  clearTimeout(timeout);
// 	  timeout = setTimeout(() => {
// 		 func.apply(this, args);
// 	  }, delay);
// 	};
//  }