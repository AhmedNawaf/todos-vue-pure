import { ref, type Ref, onMounted, watch } from 'vue'

export default function useLocalStorage<T>(key: string, initial: T) {
  const data = ref(initial) as Ref<T>
  onMounted(() => {
    try {
      const stored = localStorage.getItem(key)
      if (stored != null) data.value = JSON.parse(stored)
    } catch {}
  })
  watch(
    data,
    (val) => {
      localStorage.setItem(key, JSON.stringify(val))
    },
    { deep: true },
  )
  return data
}
