<template>
  <div id="app">
    <q-layout>
      <q-header elevated style="background-color: #34495e;">
        <q-toolbar style="margin-left: 40%;"> 
          <q-toolbar-title>
            <q-btn flat label="Todos" :to="{ path: '/todos' }" :class="{ active: $route.path === '/todos' }"></q-btn>
            <q-btn flat label="Posts" :to="{ path: '/posts' }" :class="{ active: $route.path === '/posts' }"></q-btn>
            <q-btn flat label="Albums" :to="{ path: '/albums' }" :class="{ active: $route.path === '/albums' }"></q-btn>
          </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <router-view></router-view>
      </q-page-container>

      <app-footer></app-footer>
    </q-layout>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { QLayout, QHeader, QToolbar, QToolbarTitle, QBtn, QPageContainer } from 'quasar';

const router = useRouter();

const navigate = (path) => {
  router.push(path);
};
</script>

<style scoped>
body, html {
  margin: 0;
  padding: 0;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.q-header, .q-footer, main {
  animation: fadeIn 1s;
}
</style>

<script>
import AppFooter from './Components/AppFooter.vue';

export default {
  components: {
    AppFooter
  }
}
</script>
