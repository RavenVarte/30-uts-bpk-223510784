<template>
  <section class="todo-list">
    <q-card class="q-pa-md" style="max-width: 600px; margin: auto;">
      <q-card-section>
        <h3 class="text-h6">LIST Latihan</h3>

        <!-- Form untuk menambahkan kegiatan -->
        <section class="create-todo">
          <h4>Tambah Kegiatan Baru</h4>
          <form id="new-todo-form" @submit.prevent="addTodo">
            <q-input
              type="text"
              v-model="input_content"
              placeholder="Contoh: exploring genshin"
            />
            <q-btn type="submit" label="Tambah Kegiatan" color="primary" />
          </form>
        </section>

        <!-- Daftar Todos -->
        <div class="filters">
          <q-btn
            v-for="filterOption in filterOptions"
            :key="filterOption.value"
            flat
            :label="filterOption.label"
            :class="{ 'q-ml-sm': filterOption !== filterOptions[0] }"
            @click="updateFilter(filterOption.value)"
            :color="filter === filterOption.value ? 'primary' : 'secondary'"
          />
        </div>
        <div class="list" id="todo-list">
          <div v-for="todo in filteredTodos" :key="todo.content" class="q-mb-md">
            <q-item>
              <q-item-section>
                <q-checkbox v-model="todo.done" @change="updateTodos(filteredTodos)" />
              </q-item-section>
              <q-item-section>
                <q-input
                  v-model="todo.content"
                  @input="updateTodos(filteredTodos)"
                  dense
                />
              </q-item-section>
              <q-item-section side>
                <q-btn
                  class="q-ml-sm"
                  flat
                  color="negative"
                  label="Hapus"
                  @click="removeTodo(todo)"
                />
              </q-item-section>
            </q-item>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useTodoStore } from '../stores/todoStore';

const store = useTodoStore();
const input_content = ref('');

const addTodo = () => {
  if (input_content.value.trim() === '') {
    return;
  }
  store.addTodo(input_content.value);
  input_content.value = '';
};

const removeTodo = (todo) => {
  store.removeTodo(todo);
};

const updateTodos = (updatedTodos) => {
  store.updateTodos(updatedTodos);
};

const filter = ref('all');
const filterOptions = [
  { label: 'Semua', value: 'all' },
  { label: 'Belum Selesai', value: 'uncompleted' },
];

const updateFilter = (newFilter) => {
  filter.value = newFilter;
  store.updateFilter(newFilter);
};

const filteredTodos = computed(() => {
  return store.filteredTodos;
});
</script>

<style scoped>
/* Gaya CSS khusus untuk TodoList */
.todo-list {
  margin-top: 20px;
  text-align: center;
}

.filters {
  margin-top: 10px;
  text-align: center;
}

.list {
  margin-top: 20px;
}

.actions {
  text-align: right;
}

.actions button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.actions button:hover {
  background-color: #c0392b;
}
</style>
