<template>
	<nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
		<button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
			<i class="fa fa-bars"></i>
		</button>
		<ul class="navbar-nav ml-auto">
			<li class="nav-item dropdown no-arrow">
				<a class="nav-link dropdown-toggle" href="#" id="userDropdown" @click.prevent="menuShow=!menuShow">
					<span class="mr-2 d-none d-lg-inline text-gray-600 small" v-html="user"></span>
					<img class="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60">
				</a>
				<div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" :class="menuShow?'show':''">
					<router-link to="/settings" class="dropdown-item">
						<i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
						Settings
					</router-link>
					<div class="dropdown-divider"></div>
					<a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal" @click.prevent="logout">
						<i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
						Logout
					</a>
				</div>
			</li>
		</ul>
	</nav>
</template>
<script>
export default {
	name: 'Topbar',
	props: ['user'],
	data: function () {
		return {
			menuShow: false
		}
	},
	methods: {
		logout: function () {
			this.$http.secured.delete('/signin')
				.then(response => {
					delete localStorage.csrf
					delete localStorage.signedIn
					this.$router.replace('/')
				})
				.catch(error => this.setError(error, 'Cannot sign out'))
		}
	}
}
</script>
