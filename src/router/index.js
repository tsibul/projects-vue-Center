import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/maket',
            component: () => import('../views/MaketMainApp.vue'),
            children: [
                {
                    path: '',
                    name: 'maket',
                    component: () => import('../components/maket/MaketApp.vue')
                },
                {
                    path: 'layout',
                    name: 'maket_layout',
                    component: () => import('../components/maket/maket_layout/MaketLayoutComponent.vue')
                }
            ]
        }
    ]
})

export default router
