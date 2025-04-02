import { ref } from 'vue'

interface Item {
  title: string
  value: string
  active: boolean
}

export function useFilterField(items: Item[]) {
  const selectedItems = ref<string[]>([])

  const onChangeField = (item: Item) => {
    if (!item.active) {
      item.active = true
      selectedItems.value.push(item.value)
    } else {
      item.active = false
      selectedItems.value = selectedItems.value.filter((i) => i !== item.value)
    }
  }

  const onResetField = () => {
    selectedItems.value = []
    items.forEach((item) => {
      item.active = false
    })
  }

  return { selectedItems, onChangeField, onResetField }
}
