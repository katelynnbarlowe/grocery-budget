<template>
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-xl-10 col-lg-12 col-md-9">
				<div class="card o-hidden border-0 shadow-lg my-5">
					<div class="card-body p-0">
						<div class="row">
							<div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
							<div class="col-lg-6">
								<div class="p-5">
									<div class="text-center">
										<h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
										<form class="user" @submit.prevent="signin">
											<div class="alert alert-danger" v-if="error">{{ error }}</div>

											<div class="form-group">
												<input type="email" v-model="email" class="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address...">
											</div>
											<div class="form-group">
												<input type="password" v-model="password" class="form-control form-control-user" id="exampleInputPassword" placeholder="Password">
											</div>
											<button type="submit" class="btn btn-primary btn-user btn-block">
												Login
											</button>
											<hr>
											<div class="text-center"><router-link to="/signup" class="small">Create an Account!</router-link></div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Signin',
	data () {
		return {
			email: '',
			password: '',
			error: ''
		}
	},
	created () {
		this.checkSignedIn()
	},
	updated () {
		this.checkSignedIn()
	},
	methods: {
		signin () {
			this.$http.plain.post('/signin', { email: this.email, password: this.password })
				.then(response => this.signinSuccessful(response))
				.catch(error => this.signinFailed(error))
		},
		signinSuccessful (response) {
			if (!response.data.csrf) {
				this.signinFailed(response)
				return
			}
			localStorage.csrf = response.data.csrf
			localStorage.signedIn = true
			this.error = ''
			this.$router.replace('/dashboard')
		},
		signinFailed (error) {
			this.error = (error.response && error.response.data && error.response.data.error) || ''
			delete localStorage.csrf
			delete localStorage.signedIn
		},
		checkSignedIn () {
			if (localStorage.signedIn) {
				this.$router.replace('/dashboard')
			}
		}
	}
}
</script>
