/*
 * @Author: 月魂
 * @Date: 2022-11-21 10:07:24
 * @LastEditTime: 2022-11-21 10:18:41
 * @LastEditors: 月魂
 * @Description: 
 * @FilePath: \zhuan\src\router\index.js
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
