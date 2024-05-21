<template>
  <section class="todo-list">
    <h3>LIST Latihan</h3>

    <div class="filters">
      <label>
        <button :class="{ active: filter === 'all' }" @click="$emit('update:filter', 'all')">Semua</button>
      </label>
      <label>
        <button :class="{ active: filter === 'uncompleted' }" @click="$emit('update:filter', 'uncompleted')">Belum Selesai</button>
      </label>
    </div>
    <div class="list" id="todo-list">
      <div v-for="todo in filteredTodos" :key="todo.content" :class="'todo-item ' + (todo.done ? 'done' : '')">
        <label>
          <input type="checkbox" v-model="todo.done" @change="updateTodos" />
        </label>
        <div class="todo-content">
          <input type="text" v-model="todo.content" @input="updateTodos" />
        </div>
        <div class="actions">
          <button class="delete" @click="removeTodo(todo)">Hapus</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    todos: Array,
    filter: String
  },
  computed: {
    filteredTodos() {
      if (this.filter === 'uncompleted') {
        return this.todos.filter(todo => !todo.done);
      } else {
        return this.todos;
      }
    }
  },
  methods: {
    removeTodo(todo) {
      this.$emit('remove-todo', todo);
    },
    updateTodos() {
      this.$emit('update-todos', this.todos);
    }
  }
}
</script>

<style scoped>
/* Masukkan style yang relevan untuk TodoList di sini */
</style>
