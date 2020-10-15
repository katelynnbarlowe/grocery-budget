<template>
	<div class="wrap">
		<Sidebar ref='sidebar'></Sidebar>
	    <!-- Content Wrapper -->
	    <div id="content-wrapper" class="d-flex flex-column position-relative">
			<TotalsBar 
				ref="totals"
			v-on:taxUpdate="updateSalesTax"	
			v-on:updateName="updateName"	
			v-on:deleteList="deleteList"	
				:currentTotal='currentTotal'> 
			</TotalsBar>
	      	<!-- Main Content -->
		    <div id="content">
		      	<!-- <Topbar v-bind:user="userName"></Topbar> -->
		        <!-- Begin Page Content -->
		        <div class="container-fluid" :style="containerStyles">
					 <div class="gList">
					 	<h2 @mouseenter="hover=true" @mouseleave="hover=false">{{name}} &nbsp;<a href="#" v-if="hover" @click.prevent="$refs.totals.toggle()"><i class="fas fa-cog text-gray-200"></i></a></h2>

					 	<draggable v-bind="dragOptions" :list="list" :move="saveState" @start="drag=true" @end="drag=false">
							<groceryGroup
								v-for='(area,key,index) in list'
								:area="area"
								:key="index"
								:keyVal="key"
								:index="index"
							>
							</groceryGroup>
						</draggable>
						
						<a href="#" class="btn btn-success btn-icon-split float-left" @click.prevent="saveState">
							<span class="icon text-white-50">
		                      <i class="fas fa-check"></i>
		                    </span>
		                	<span class="text">Save</span>
		                </a>
						<a href="#" class="btn btn-primary btn-icon-split float-right" @click.prevent="addGroup">
							<span class="icon text-white-50">
		                      <i class="fas fa-plus"></i>
		                    </span>
		                	<span class="text">
								Add Group
							</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import TotalsBar from "@/components/Totals";
import GroceryGroup from "@/components/GroceryGroup";
import draggable from 'vuedraggable'
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import ListService from '@/backend/services'

export default {
    name: "GroceryList",
    data:function(){
    	return {
    		user_first_name:"",
    		user_last_name:"",
		    list:this.$store.state.list,
		    salesTax: this.$store.state.sales_tax,		    
		    budget: this.$store.state.budget,		   
		    name: this.$store.state.name, 
		    containerStyles:{},
		    hover:false
    	}
    },
	components:{
		GroceryGroup,
		draggable,
	  	Sidebar,
	  	Topbar,
	  	TotalsBar
	},
	mounted:function(){
		this.startup();
	},
	watch:{
		'$route.path': function(val, oldVal){
			this.startup();
		}
	},
	computed:{
    	userName(){
    		return this.user_first_name+" "+this.user_last_name
    	},
	    dragOptions() {
	      return {
	        animation: 200,
	        group: "description",
	        disabled: false,
	        ghostClass: "ghost"
	      };
	    },	    
	  	currentTotal:function(){
    		return this.$store.getters.currentTotal;
	  	}
	},
	methods:{
		startup:async function(){
			if (!localStorage.signedIn) {
		      this.$router.replace('/')
		    }

	      	// retrieve user
			var user = await ListService.getUser(); 
	    	this.user_first_name=user.first_name;
	    	this.user_last_name=user.last_name;

	    	var id=(this.$route.params.id?this.$route.params.id:0);

			this.$store.commit('setList',id);	
		  	await this.$store.dispatch('loadState');
			if (this.$store.state.listId==-1) { // 404
		      this.$router.replace('/list/new')
		    }

		  	this.list=this.$store.state.list;
		  	this.budget=this.$store.state.budget;
		    this.sales_tax= this.$store.state.sales_tax;
		    this.name= this.$store.state.name;
		    
		    this.$refs.totals.reload();
		},
		addGroup:function(){
			this.$store.commit('addArea');
		},
		saveState:async function(){
			var listId = this.$store.state.listId;
			var response = await this.$store.dispatch('saveState');
			if(this.$store.state.listId!=listId)
      			this.$router.replace('/list/'+this.$store.state.listId);
		},		
		updateSalesTax:function(value){
			this.salesTax=value;
		},
		heightUpdate:function(value){
			Vue.set(this.containerStyles,"margin-top",value);
		},
		updateName:function(){			
		    this.$refs.sidebar.updateListName(this.$store.state.listId,this.$store.state.name);
		    this.name=this.$store.state.name;
		},
		deleteList:async function(){	
			if(confirm("Do you really want to the "+this.name+" list?")){
				var resp = await ListService.deleteList(this.$store.state.listId);
				if(!resp.error)
	      			this.$router.replace('/dashboard');
	      	}
		}
	}
};
</script>