import BasicLayout from '@/components/Layouts/basic.vue'
import type { RouteRecordRaw } from 'vue-router'

const basicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'root',
    redirect: '/home',
    meta: {
      title: '根路由'
    },
    component: BasicLayout,
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue'),
        meta: {
          title: '登陆'
        }
      },
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页'
        }
      },
      {
        path: '/technician',
        name: 'technician',
        component: () => import('@/views/technician/index.vue'),
        meta: {
          title: '技师'
        }
      },
      {
        path: '/order',
        name: 'order',
        component: () => import('@/views/order/index.vue'),
        meta: {
          title: '订单'
        }
      },
      {
        path: '/center',
        name: 'center',
        component: () => import('@/views/center/index.vue'),
        meta: {
          title: '我的'
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404'
  },
  {
    path: '/404',
    component: () => import('@/components/SpecPage/404.vue')
  }
]

export default basicRoutes
