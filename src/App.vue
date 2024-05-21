<template>
  <div id="app">
    <!-- Header -->
    <header>
      <nav>
        <ul>
          <li :class="{ active: activeMenu === 'todos' }" @click="showTodos">Todos</li>
          <li :class="{ active: activeMenu === 'posts' }" @click="showPosts">Posts</li>
        </ul>
      </nav>
    </header>

    <!-- Main Content -->
    <main>
      <div v-if="activeMenu === 'todos'">
        <!-- Fitur Todos -->
        <section class="create-todo">
          <h3>Kegiatan Latihan</h3>

          <form id="new-todo-form" @submit.prevent="addTodo">
            <h4>Latihan Apa yang Ingin dirimu Lakukan?</h4>
            <input 
              type="text" 
              name="content" 
              id="content" 
              placeholder="contoh: exploring genshin"
              v-model="input_content" />
            <input type="submit" value="Tambah Kegiatan" />
          </form>
        </section>

        <TodoList
          :todos="todos"
          :filter="filter"
          @remove-todo="removeTodo"
          @update-todos="updateTodos"
          @update-filter="updateFilter"
        />
      </div>

      <div v-else-if="activeMenu === 'posts'">
        <!-- Fitur Postingan -->
        <PostsList
          :users="users"
          :posts="posts"
          :selected-user="selectedUser"
          @update:selectedUser="updateSelectedUser"
        />
      </div>
    </main>

    <footer class="footer">
      <p>&copy; 2024 ebby arrahman tarif</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import TodoList from './Components/TodoList.vue'
import PostsList from './Components/PostsList.vue'

// Todos functionality
const todos = ref([])
const input_content = ref('')
const filter = ref('all')

watch(todos, (newVal) => {
  localStorage.setItem('todos', JSON.stringify(newVal))
}, {
  deep: true
})

const addTodo = () => {
  if (input_content.value.trim() === '') {
    return
  }
  todos.value.push({
    content: input_content.value,
    done: false,
    editable: false,
  })
  input_content.value = ''  // Clear input field after adding todo
}

const removeTodo = (todo) => {
  todos.value = todos.value.filter((t) => t !== todo)
}

const updateTodos = (updatedTodos) => {
  todos.value = updatedTodos
}

const updateFilter = (newFilter) => {
  filter.value = newFilter
}

onMounted(() => {
  todos.value = JSON.parse(localStorage.getItem('todos')) || []
})

// Posts functionality
const activeMenu = ref('todos')
const users = ref([])
const posts = ref([])
const selectedUser = ref(null)

const showTodos = () => {
  activeMenu.value = 'todos'
}

const showPosts = () => {
  activeMenu.value = 'posts'
}

const updateSelectedUser = (userId) => {
  selectedUser.value = parseInt(userId)
}

onMounted(() => {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => {
      users.value = data
    })

  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
      posts.value = data
    })
})
</script>

<style scoped>
/* Gaya umum */
body, html {
  margin: 0;
  padding: 0;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

/* Header */
header {
  background-color: #34495e;
  color: #ecf0f1;
  padding: 10px 0;
  text-align: center;
}

nav ul {
  list-style-type: none;
  padding: 0;
}

nav li {
  display: inline;
  margin-right: 20px;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

nav li.active, nav li:hover {
  background-color: #2c3e50;
}

/* Main Content */
main {
  padding: 20px;
  background-color: #ecf0f1;
  min-height: 400px;
}

/* Footer */
footer {
  background-color: #34495e;
  color: #ecf0f1;
  text-align: center;
  padding: 10px 0;
  position: absolute;
  bottom: 0;
  width: 100%;
}

/* Animasi */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Menerapkan animasi ke semua elemen masuk */
.create-todo, .footer, header, main {
  animation: fadeIn 1s;
}

/* Gaya khusus untuk form */
#create-todo-form {
  background-color: #bdc3c7;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

#create-todo-form h4 {
  margin: 0;
  color: #34495e;
}

#create-todo-form input[type="text"] {
  width: calc(100% - 22px);
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
}

#create-todo-form input[type="submit"] {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

#create-todo-form input[type="submit"]:hover {
  background-color: #2980b9;
}
</style>
