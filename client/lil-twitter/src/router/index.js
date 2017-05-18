import Vue from 'vue'
import Router from 'vue-router'
import signup from '@/components/signup'
import home from '@/components/home'
import grouptweet from '@/components/grouptweet'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Signup',
    component: signup
  }, {
    path: '/home',
    component: home,
    children: [{
      path: '/',
      component: grouptweet
    }]
  }]
})
