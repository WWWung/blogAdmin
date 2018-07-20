import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
//import AdminPage from '@/views/adminPage'

import Blog from '@/views/blog'
import User from '@/views/user'
import Words from '@/views/words'

Vue.use(Router)

export default new Router({
	mode: 'history',
  routes: [
//  {
//    path: '/',
//    name: 'AdminPage',
//    component: AdminPage
//  },
    {
  		path: '/blog',
  		name: 'Blog',
  		component: Blog
  	},
  	{
  		path: '/user',
  		name: 'User',
  		component: User
  	},
   	{
  		path: '/words',
  		name: 'Words',
  		component: Words
  	}
  ]
})
