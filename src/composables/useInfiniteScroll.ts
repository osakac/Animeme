import taxios from '@/plugins/axios/axios.config'
import { onBeforeUnmount, onMounted, ref, type ShallowRef } from 'vue'

interface Meta {
  pagination: {
    total_pages: number
  }
}

export function useInfiniteScroll<T>(
  url: string,
  observerTarget: Readonly<ShallowRef<HTMLDivElement | null>>,
) {
  const data = ref<T[]>([])
  const page = ref(1)
  const totalPages = ref()
  const loading = ref(false)
  let observer: IntersectionObserver

  const loadData = async () => {
    if (loading.value || page.value > totalPages.value) return

    loading.value = true

    try {
      const { data: response } = await taxios.get<{ data: T[]; meta: Meta }>(
        `${url}?page=${page.value}`,
      )
      data.value = [...data.value, ...response.data] as T[]
      totalPages.value ??= response.meta.pagination.total_pages
      page.value++
    } catch (error) {
      console.log('Ошибка:', error)
    }

    loading.value = false
  }

  const initObserver = () => {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadData()
        }
      },
      {
        root: null,
        rootMargin: '100px',
        threshold: 0.1,
      },
    )

    if (observerTarget.value) {
      observer.observe(observerTarget.value)
    }
  }

  onMounted(() => initObserver())

  onBeforeUnmount(() => {
    if (observer) observer.disconnect()
  })

  return { data }
}
