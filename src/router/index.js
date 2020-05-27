import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "../Layout"
import Login from '../views/Layout/Login'
import FenceConfiguration from '../views/FenceConfiguration/Index'
import FenceDesignerIndex from '../views/FenceDesigner/Index'
import FenceConfigurationShow from '../views/FenceDesignerBundle/FDConfiguration/Show'
import i18n from '../assets/languages/languages.js'

Vue.use(VueRouter)
Vue.use(i18n)

  const routes = [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        auth: false,
        title: 'login'
      }
    },
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      meta: {
        title: 'routes.layout'
      },
      children: [
        {
          path: '/',
          name: 'FenceDesignerIndex',
          component: FenceDesignerIndex,
          meta: {
            title: 'routes.fencedesignerindex'
          }
        },
        {
          path: '/fenceconfiguration',
          name: 'FenceConfiguration',
          component: FenceConfiguration,
          meta: {
            title: 'routes.fenceconfiguration'
          }
        },
        {
          path: '/fenceconfiguration/:id',
          name: 'FenceConfigurationShow',
          component: FenceConfigurationShow,
          meta: {
            title: 'routes.fenceconfigurationshow'
          }
        }
      ]
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
