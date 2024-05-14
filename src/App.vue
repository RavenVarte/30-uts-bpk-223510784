<script setup>
import { ref, onMounted, computed, watch } from 'vue'

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

onMounted(() => {
  todos.value = JSON.parse(localStorage.getItem('todos')) || []
})

const filtered_todos = computed(() => {
  if (filter.value === 'uncompleted') {
    return todos.value.filter(todo => !todo.done)
  } else {
    return todos.value
  }
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

const filteredPosts = computed(() => {
  return posts.value.filter(post => post.userId === parseInt(selectedUser.value))
})
</script>

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

        <section class="todo-list">
          <h3>LIST Latihan</h3>

          <div class="filters">
            <label>
              <button :class="{ active: filter === 'all' }" @click="filter = 'all'">Semua</button>
            </label>
            <label>
              <button :class="{ active: filter === 'uncompleted' }" @click="filter = 'uncompleted'">Belum Selesai</button>
            </label>
          </div>
          <div class="list" id="todo-list">
            <div v-for="todo in filtered_todos" :key="todo.content" :class="'todo-item ' + (todo.done ? 'done' : '')">
              <label>
                <input type="checkbox" v-model="todo.done" />
              </label>
              <div class="todo-content">
                <input type="text" v-model="todo.content" />
              </div>
              <div class="actions">
                <button class="delete" @click="removeTodo(todo)">Hapus</button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div v-else-if="activeMenu === 'posts'">
        <!-- Fitur Postingan -->
        <h2>Postingan</h2>
        <select v-model="selectedUser">
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
        <div v-if="selectedUser">
          <div v-for="post in filteredPosts" :key="post.id">
            <h3>{{ post.title }}</h3>
            <p>{{ post.body }}</p>
          </div>
        </div>
        <div v-else>
          <p>Silakan pilih pengguna untuk melihat postingan mereka.</p>
        </div>
      </div>
    </main>

    <footer class="footer">
      <p>&copy; 2024 ebby arrahman tarif</p>
    </footer>
  </div>
</template>

<style scoped>
/* Common styles */
body {
  background-image: url(https://assets.pepnews.com/img/2y1580622101455/ba6de-sewa%20mobil%20rental.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

h1 {
  color: black;
  background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLascdafiwscuRNE3D5_pqzZqHj83iMAlDRA&s);
  border-radius: 50px;
  font-size: 70px;
  text-align: center;
  margin-top: 20px;
}

.depan {
  border-radius: 30px;
}

.todo-list {
  font-family: sans-serif;
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
}

.todo-list form {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.todo-list input[type="text"],
.todo-list input[type="datetime-local"] {
  flex: 1;
  font-size: 18px;
  padding: 10px;
  border: 2px solid black;
  border-radius: 5px;
  margin-right: 10px;
}

.todo-list button {
  font-size: 18px;
  padding: 10px;
  background-color: #ecd60c;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.todo-list button.tambahkan {
  margin-left: 10px;
}

.todo-list h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.todo-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.todo-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.todo-list li span.date {
  font-size: 16px;
  color: #666;
}

.todo-list button.remove {
  background-color: #f44336;
}

.todo-list button.remove:hover {
  background-color: #da190b;
}

.todo-list button.remove:active {
  background-color: #da190b;
}

.done {
  text-decoration: line-through;
}

.footer {
  color: #0c0000;
  text-align: center;
  padding: 20px;
  position: fixed;
  bottom: 0;
  width: 100%;
  background: rgba(12, 11, 11, 0.8);
}

/* Header styles */
header {
  background-color: #333;
  padding: 15px 0;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
}

nav ul {
  list-style: none;
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0;
}

nav ul li {
  margin: 0 20px;
  padding: 10px 20px;
}

nav ul li.active {
  background-color: #ecd60c;
  border-radius: 5px;
}

nav ul li:hover {
  background-color: #444;
  cursor: pointer;
  border-radius: 5px;
}

nav ul li.active a,
nav ul li:hover a {
  color: white;
}

nav ul li a {
  color: white;
  text-decoration: none;
  font-size: 20px;
  transition: color 0.3s ease;
}
</style>