type DebouncedFunction<F extends (...args: never[]) => unknown> = {
  (ctx: ThisParameterType<F>, ...args: Parameters<F>): void
  cancel: () => void
}

export function debounce<F extends (...args: never[]) => unknown>(
  func: F,
  wait: number,
  immediate?: boolean,
): DebouncedFunction<F> {
  let timeout: ReturnType<typeof setTimeout> | null = null

  const debounced = function (ctx: ThisParameterType<F>, ...args: Parameters<F>) {
    const context = ctx

    const later = () => {
      timeout = null
      if (!immediate) {
        func.apply(context, args)
      }
    }

    const callNow = immediate && !timeout

    if (timeout !== null) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(later, wait)

    if (callNow) {
      func.apply(context, args)
    }
  }

  debounced.cancel = () => {
    if (timeout !== null) {
      clearTimeout(timeout)
      timeout = null
    }
  }

  return debounced as DebouncedFunction<F>
}
