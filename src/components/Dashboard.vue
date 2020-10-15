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
	          <h1 class="h3 mb-4 text-gray-800">Blank Page</h1>

	        </div>
	      </div>
	  </div>
  </div>
</template>
<script>
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default {
    name: "Dashboard",
    data:function(){
    	return {
    		userName:"",
    		user_first_name:"",
    		user_last_name:"",
    		user_email:""    		
    	}
    },
	components:{
	  	Sidebar,
	  	Topbar
	},
	mounted:function(){
		console.log("here");
      this.$http.secured.get('/user')
        .then(response => {
        	console.log(response.data);
        	this.userName=response.data.first_name+" "+response.data.last_name;
        	this.user_first_name=response.data.first_name;
        	this.user_last_name=response.data.last_name;
        	this.user_email=response.data.email;
        })
        .catch(error => console.log(error))
	}
}
</script>