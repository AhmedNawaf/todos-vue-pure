<script setup lang="ts">
import { ref } from 'vue'
import type { Todo } from '../composables/useTodos'
const props = defineProps<{
  todo: Todo
}>()
const emit = defineEmits(['markTodo', 'editTodo', 'deleteTodo'])
const isEditing = ref(false)
const editTitle = ref(props.todo.title)

function editTodo() {
  emit('editTodo', props.todo.id, editTitle.value)
  isEditing.value = false
}
</script>

<template>
  <div
    class="flex items-center p-4 gap-4 border border-gray-300 mx-auto w-full rounded-lg"
    :class="{ 'justify-between': !isEditing }"
  >
    <form class="flex items-center gap-2 flex-1">
      <div class="flex items-center gap-2 flex-1">
        <template v-if="!isEditing">
          <input
            @click="$emit('markTodo', todo.id)"
            type="checkbox"
            :checked="todo.completed"
            class="w-6 h-6 border border-gray-300 text-blue-500 cursor-pointer"
          />
          <h2 v-if="!isEditing" class="text-xl font-bold">{{ todo.title }}</h2>
        </template>
        <input
          v-else
          type="text"
          v-model="editTitle"
          class="bg-gray-200 text-gray-700 rounded-lg w-full"
        />
      </div>
      <div class="flex">
        <template v-if="!isEditing">
          <button
            @click="isEditing = true"
            class="bg-blue-500 hover:bg-blue-500/90 cursor-pointer uppercase text-white px-4 py-2 rounded-l-lg"
          >
            Edit
          </button>
          <button
            @click="$emit('deleteTodo', todo.id)"
            class="bg-red-500 hover:bg-red-500/90 cursor-pointer uppercase text-white px-4 py-2 rounded-r-lg"
          >
            Delete
          </button>
        </template>
        <template v-else>
          <button
            @click="isEditing = false"
            type="button"
            class="bg-white text-blue-500 border border-blue-500 hover:bg-gray-50 cursor-pointer uppercase px-4 py-2 rounded-l-lg"
          >
            Cancel
          </button>
          <button
            @click="editTodo"
            type="submit"
            class="bg-blue-500/90 cursor-pointer uppercase text-white px-4 py-2 rounded-r-lg"
          >
            Save
          </button>
        </template>
      </div>
    </form>
  </div>
</template>
