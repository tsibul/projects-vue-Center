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
            component: () => import('../views/MaketApp.vue'),
            children: [
                {
                    path: '', // Пустой путь для отображения MaketApp.vue
                    name: 'maket',
                    component: () => import('../views/MaketApp.vue')
                },
                {
                    path: 'layout', // Путь layout относится к родительскому пути /maket
                    name: 'maket_layout',
                    component: () => import('../components/maket/maket_layout/MaketLayoutComponent.vue')
                }
            ]
        }
    ]
})

export default router
