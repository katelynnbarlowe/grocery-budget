
import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'
import Dashboard from '@/components/Dashboard'
import Settings from '@/components/Settings'
import GroceryList from '@/components/GroceryList'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Signin',
			component: Signin
		},
		{
			path: '/signup',
			name: 'Signup',
			component: Signup
		},
		{
			path: '/dashboard',
			name: 'Dashboard',
			component: Dashboard
		},
		{
			path: '/settings',
			name: 'Setting',
			component: Settings
		},
		{
			path: '/list/new',
			name: 'New List',
			component: GroceryList
		},
		{
			path: '/list/:id',
			name: 'List',
			component: GroceryList
		}
	]
})
