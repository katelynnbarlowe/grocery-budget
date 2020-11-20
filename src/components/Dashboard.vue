<template>
	<div class="wrap">
		<Sidebar></Sidebar>

		<div id="content-wrapper" class="d-flex flex-column">
			<div id="content">
				<Topbar v-bind:user="userName"></Topbar>
				<div class="container-fluid">
					<h1 class="h3 mb-4 text-gray-800">Blank Page</h1>

				</div>
			</div>
		</div>
	</div>
</template>
<script>
import Sidebar from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'

export default {
	name: 'Dashboard',
	data: function () {
		return {
			userName: '',
			user_first_name: '',
			user_last_name: '',
			user_email: ''
		}
	},
	components: {
		Sidebar,
		Topbar
	},
	mounted: function () {
		this.$http.secured.get('/user')
			.then(response => {
				this.userName = response.data.first_name + ' ' + response.data.last_name
				this.user_first_name = response.data.first_name
				this.user_last_name = response.data.last_name
				this.user_email = response.data.email
			})
			.catch(error => console.log(error))
	}
}
</script>
