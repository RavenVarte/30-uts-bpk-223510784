import { createRouter, createWebHistory } from 'vue-router'
import Todos from '../Components/TodoList.vue'
import Posts from '../Components/PostsList.vue'
import Albums from '../Components/Albums.vue'
import AlbumDetail from '../Components/AlbumDetail.vue'

const routes = [
  { path: '/', redirect: '/todos' },
  { path: '/todos', component: Todos },
  { path: '/posts', component: Posts },
  { path: '/albums', component: Albums },
  { path: '/albums/:id', component: AlbumDetail }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
