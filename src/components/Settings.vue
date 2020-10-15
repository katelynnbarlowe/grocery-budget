<template>
	<div class="wrap">
		<Sidebar></Sidebar>
	    <!-- Content Wrapper -->
	    <div id="content-wrapper" class="d-flex flex-column">
	      <!-- Main Content -->
		    <div id="content">
		      	<Topbar v-bind:user="userName"></Topbar>
		        <!-- Begin Page Content -->
		        <div class="container-fluid">
		          <!-- Page Heading -->
					<a href="#" @click.prevent="validate" class="float-right btn btn-icon-split btn-secondary"><span class="icon text-white-50"><i class="far fa-save"></i></span>
		                	<span class="text">Save</span>
		                </a>	
		            <h1 class="h3 mb-4 text-gray-800">Settings</h1>
	                <div class="alert alert-danger" v-if="error" v-html="error"></div>
	                <div class="alert alert-danger" v-if="validation.length" v-html="validation.join('<br />')"></div>
		            <div class="alert" :class="success?'alert-success':'alert-danger'" v-if="message" v-html="message"></div>
		            <div class="row">
		            	<div class="col-lg-6 ">
				            <div class="card border-left-secondary shadow">
					          	<div class="card-header text-secondary">User Settings</div>
					          	<div class="card-body">		          		
									<div class="row mb-4">
										<div class="col">
											<label for="" class="text-xs font-weight-bold text-uppercase mb-1">First Name</label>
											<input type="text" class="form-control" v-model="fields.user_first_name" :class="!fields.user_first_name&&validation.length?'is-invalid':''" />
										</div>
										<div class="col">
											<label for="" class="text-xs font-weight-bold text-uppercase mb-1">Last Name</label>
											<input type="text" class="form-control" v-model='fields.user_last_name' :class="!fields.user_last_name&&validation.length?'is-invalid':''" />
										</div>
									</div>      		
									<div class="row mb-4">
										<div class="col">
											<label for="" class="text-xs font-weight-bold text-uppercase mb-1">Email</label>
											<input type="text" class="form-control" v-model="fields.user_email" :class="!fields.user_email&&validation.length?'is-invalid':''" />
										</div>
									</div>
					                <div class="form-group row">
					                  <div class="col-sm-6 mb-3 mb-sm-0">
										<label for="" class="text-xs font-weight-bold text-uppercase mb-1">New Password</label>
					                    <input v-model="password" type="password" class="form-control form-control-user" id="exampleInputPassword" >
					                  </div>
					                  <div class="col-sm-6">
										<label for="" class="text-xs font-weight-bold text-uppercase mb-1">New Password Confirmation</label>
					                    <input type="password" v-model="password_confirmation" class="form-control form-control-user" id="exampleRepeatPassword">
					                  </div>
					                </div>
					          	</div>
					        </div>
				        </div>
		            	<div class="col-lg-6 ">
				            <div class="card border-left-secondary shadow">
					          	<div class="card-header text-secondary">Budget Settings</div>
					          	<div class="card-body">		          		
									<div class="row">
										<div class="col">
											<label for="" class="text-xs font-weight-bold text-uppercase mb-1">Default Grocery Budget Amount</label>
											<div class="input-group">
												<div class="input-group-prepend">
													<span class="input-group-text">$</span>
												</div>
												<input type="text" class="form-control" v-model="settings.default_budget" />
											</div>
										</div>
										<div class="col">
											<label for="" class="text-xs font-weight-bold text-uppercase mb-1">Sales Tax (%)</label>
											<input type="text" class="form-control" v-model='settings.sales_tax' />
										</div>
									</div>
					          	</div>
					        </div>
				        </div>
		            </div>
					<div class="row">
						<div class="col full text-center m-2">
						</div>
					</div>
				</div>	
			</div>	
		</div>	
	</div>	
</template>
<script>
import Sidebar from "@/components/layout/Sidebar"
import Topbar from "@/components/layout/Topbar"
import ListService from '@/backend/services'

export default {
    name: "Settings",
    data:function(){
    	return {
    		settings:{
    			sales_tax:0,
    			default_budget:0
    		},
    		settingIDs:[],
	        fields:{
		        user_first_name:'',
		        user_last_name:'',
		        user_email:''
	        },
	        password:'',
	        password_confirmation: '',
    		message:'',
    		validation:[],
    		error:'',
    		success:true
    	}
    },
    computed:{
    	userName(){
    		return this.fields.user_first_name+" "+this.fields.user_last_name
    	}
    },
	components:{
	  	Sidebar,
	  	Topbar
	},
	mounted:async function(){
		if (!localStorage.signedIn) {
	      this.$router.replace('/')
	    }
	    
		// retrieve user settings
		var settings = await ListService.getSettings(); 
		if(!settings.error){
			settings.data.forEach((e)=>{
      			this.settings[e.code] = e.value;
      			this.settingIDs[e.code]= e.id;
      		})
		}

      	// retrieve user
		var user = await ListService.getUser(); 
    	this.fields.user_first_name=user.first_name;
    	this.fields.user_last_name=user.last_name;
    	this.fields.user_email=user.email;
	},
	methods:{
		validate:function(){
	        this.validation=[];
	        let empty = false;
	      
		    Object.keys(this.fields).map(key => {
		        if(this.fields[key]==''||this.fields[key]===undefined){
		          empty=true;
		        }
		    });

	      	if(empty)
	        	this.validation.push("Names and email are required.");

	      	if(this.password!=this.password_confirmation)
	        	this.validation.push("Password and Password Confirmation must match.");

	      	if(!this.validation.length)
	        	this.save();
		},
		async save(){
			this.success=true;
			this.error='';
			this.message='';

			// save budget settings
			var settingsResp = await ListService.updateSettings(this.settings,this.settingIDs); 
			if(settingsResp.error){
	        	this.success=false;
	        	this.error += settingsResp.error;
			}

			var userUpdate={
	        	first_name:this.fields.user_first_name,
	        	last_name:this.fields.user_last_name,
	        	email:this.fields.user_email
	        };
	        if(this.password)
	        	userUpdate.password=this.password;
	        
			// save user settings
			var response = await ListService.updateUser(userUpdate); 
			if(response.error){
				this.success=false;
				this.error+=response.error
			}

			if(this.success){				
		        this.message = 'Your settings have been updated successfully.'
		        setTimeout(() => this.message='', 6000);
			}
		}
	}
}
</script>