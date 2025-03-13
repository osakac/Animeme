import { ref } from 'vue'

export function useTouchVisible() {
  const isVisible = ref(false)

  let touchTimer: number

  const onTouchStart = () => {
    if (isVisible.value) {
      isVisible.value = false
      clearTimeout(touchTimer)
    } else isVisible.value = true
  }

  const onTouchEnd = () => {
    if (!isVisible.value) return
    touchTimer = setTimeout(() => {
      isVisible.value = false
    }, 3000)
  }

  return {
    isVisible,
    onTouchStart,
    onTouchEnd,
  }
}
