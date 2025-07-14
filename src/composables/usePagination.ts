// src/composables/usePagination.ts
import { ref, computed, type Ref, type ComputedRef } from 'vue'

export function usePagination<T>(source: Ref<T[]> | ComputedRef<T[]>, initialPageSize = 10) {
  const page = ref(1)
  const pageSize = ref(initialPageSize)

  // total items & pages
  const totalItems = computed(() => source.value.length)
  const totalPages = computed(() => Math.max(1, Math.ceil(totalItems.value / pageSize.value)))

  // the “window” of items for the current page
  const paginatedItems = computed(() => {
    const start = (page.value - 1) * pageSize.value
    return source.value.slice(start, start + pageSize.value)
  })

  function setPage(n: number) {
    page.value = Math.min(Math.max(1, n), totalPages.value)
  }

  function setPageSize(n: number) {
    pageSize.value = n
    // optional: reset to first page if out of range
    page.value = 1
  }

  return {
    page,
    pageSize,
    totalItems,
    totalPages,
    paginatedItems,
    setPage,
    setPageSize,
  }
}
