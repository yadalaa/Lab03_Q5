import { createRouter, createWebHistory } from 'vue-router'
import PassengerListView from '../views/PassengerListView.vue'
import AirlineDetailView from '../views/passenger/AirlineDetailView.vue'
import PassengerDetailView from '../views/passenger/PassengerDetailView.vue'
import PassengerLayoutView from '../views/passenger/PassengerLayoutView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import NetWorkErrorView from '../views/NetWorkErrorView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'passenger-list',
      component: PassengerListView,
      props: (route) => ({
        page: parseInt((route.query?.page as string) || '1')
      })
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },

    {
      path: '/passenger/:id',
      name: 'passenger-layout',
      component: PassengerLayoutView,
      props: true,
      children: [
        {
          path: '/passenger/:id',
          name: 'passenger-detail',
          component: PassengerDetailView,
          props: true
        },
        {
          path: '/passenger/:id/airline',
          name: 'passenger-airline',
          component: AirlineDetailView,
          props: true
        },
      ]
    },
    {
      path: '/404/:resource',
      name: '404-resource',
      component: NotFoundView,
      props: true
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    },
    {
      path: '/network-error',
      name: 'network-error',
      component: NetWorkErrorView
    }
  ]
})

export default router
