import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Posts from '../views/Posts.vue'
import Post from '../views/Post.vue'
import Author from '../views/Author.vue'
import Tag from '../views/Tag.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/posts/:id',
      name: 'post',
      component: Post
    },
    {
      path: '/posts',
      name: 'posts',
      component: Posts
    },
    {
      path: '/authors/:id',
      name: 'author',
      component: Author
    },
    {
      path: '/tags/:id',
      name: 'tag',
      component: Tag
    },
  ]
})

export default router
