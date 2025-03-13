import { ref, watch } from 'vue'

export function useSearch(fn: () => void) {
  const search = ref('')

  watch(search, fn)

  return { search }
}
