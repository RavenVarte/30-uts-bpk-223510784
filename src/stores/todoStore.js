import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: JSON.parse(localStorage.getItem('todos')) || [],
    filter: 'all'
  }),
  actions: {
    addTodo(content) {
      if (content.trim() === '') {
        return
      }
      this.todos.push({
        content,
        done: false,
        editable: false,
      })
      localStorage.setItem('todos', JSON.stringify(this.todos))
    },
    removeTodo(todo) {
      this.todos = this.todos.filter(t => t !== todo)
      localStorage.setItem('todos', JSON.stringify(this.todos))
    },
    updateTodos(updatedTodos) {
      this.todos = updatedTodos
      localStorage.setItem('todos', JSON.stringify(this.todos))
    },
    updateFilter(newFilter) {
      this.filter = newFilter
    }
  },
  getters: {
    filteredTodos() {
      if (this.filter === 'uncompleted') {
        return this.todos.filter(todo => !todo.done)
      }
      return this.todos
    }
  },
  setup() {
    watch(() => this.todos, (newVal) => {
      localStorage.setItem('todos', JSON.stringify(newVal))
    }, { deep: true })
  }
})

