
<template>

  <div class="container">

    <div class="card o-hidden border-0 shadow-lg my-5">
      <div class="card-body p-0">
        <!-- Nested Row within Card Body -->
        <div class="row">
          <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
          <div class="col-lg-7">
            <div class="p-5">
              <div class="text-center">
                <h1 class="h4 text-gray-900 mb-4">Create an Account</h1>
              </div>
              <form @submit.prevent="validate" class="user">
                <div class="alert alert-danger" v-if="error" v-html="error"></div>
                <div class="alert alert-danger" v-if="validation.length" v-html="validation.join('<br />')"></div>

                <div class="form-group row">
                  <div class="col-sm-6 mb-3 mb-sm-0">
                    <input v-model="fields.first_name" type="text" class="form-control form-control-user" :class="!fields.first_name&&validation.length?'is-invalid':''" placeholder="First Name">
                  </div>
                  <div class="col-sm-6">
                    <input type="text" v-model="fields.last_name" class="form-control form-control-user" :class="!fields.last_name&&validation.length?'is-invalid':''" placeholder="Last Name">
                  </div>
                </div>

                <div class="form-group">
                  <input v-model="fields.email" type="email" class="form-control form-control-user" :class="!fields.email&&validation.length?'is-invalid':''" placeholder="Email Address">
                </div>
                <div class="form-group row">
                  <div class="col-sm-6 mb-3 mb-sm-0">
                    <input v-model="fields.password" type="password" class="form-control form-control-user" :class="!fields.password&&validation.length?'is-invalid':''" placeholder="Password">
                  </div>
                  <div class="col-sm-6">
                    <input type="password" v-model="fields.password_confirmation" class="form-control form-control-user" :class="!fields.password_confirmation&&validation.length?'is-invalid':''" placeholder="Repeat Password">
                  </div>
                </div>

                <button type="submit" class="btn btn-primary btn-user btn-block">Register</button>
<hr>
                <div class="text-center"><router-link to="/" class="small">Sign In</router-link></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Signup',
  data () {
    return {
      fields:{
        first_name:'',
        last_name:'',
        email:'',
        password:'',
        password_confirmation: ''
      },
      error: '',
      validation:[]
    }
  },
  created () {
    this.checkedSignedIn()
  },
  updated () {
    this.checkedSignedIn()
  },
  methods: {
    validate(){
      this.validation=[];
      let empty = false;
      
      Object.keys(this.fields).map(key => {
        if(this.fields[key]==''||this.fields[key]===undefined){
          empty=true;
        }
      });

      if(empty)
        this.validation.push("All fields are required.");

      if(this.fields.password!=this.fields.password_confirmation)
        this.validation.push("Password and Password Confirmation must match.");

      if(!this.validation.length)
        this.signup();
    },
    signup () {
      this.$http.plain.post('/signup', this.fields)
        .then(response => this.signupSuccessful(response))
        .catch(error => this.signupFailed(error))
    },
    signupSuccessful (response) {
      if (!response.data.csrf) {
        this.signupFailed(response)
        return
      }

      localStorage.csrf = response.data.csrf
      localStorage.signedIn = true
      this.error = ''
      this.$router.replace('/dashboard')
    },
    signupFailed (error) {
      console.log(error);
      this.error = (error.response && error.response.data && error.response.data.error) || 'Something went wrong'
      delete localStorage.csrf
      delete localStorage.signedIn
    },
    checkedSignedIn () {
      if (localStorage.signedIn) {
        this.$router.replace('/dashboard')
      }
    }
  }
}
</script>