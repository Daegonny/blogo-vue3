import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Posts from '../views/Posts.vue'
import Author from '../views/Author.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/posts',
      name: 'posts',
      component: Posts
    },
    {
      path: '/author/:id',
      name: 'author',
      component: Author
    },
  ]
})

export default router
