<template>
	 <div class='preview-bar totalsBar shadow bg-white fixed-top p-2 border-bottom-success' @mouseover="editable=true" @mouseleave="editable=false" ref="totals">
		<a href="#" class="text-secondary editButton" v-if="editable&&!editing" @click.prevent="editing=true; editable=false"><span class="fa fa-cog "></span> Edit</a>
		<div class="editBar mb-1" v-if="editing">
			<div class="row">
				<div class="col">
					<label for="" class="text-xs font-weight-bold text-uppercase mb-1">Grocery Budget</label>
					<input type="text" class="form-control" v-model="budget" />
				</div>
				<div class="col">
					<label for="" class="text-xs font-weight-bold text-uppercase mb-1">Sales Tax</label>
					<input type="text" class="form-control" v-model='salesTax' />
				</div>
			</div>
			<div class="row">
				<div class="col full text-center m-2">
					<a href="#" @click.prevent="editing=false" class="closeLink">save</a>
				</div>
			</div>
		</div>
		<div class='row mb-2'>
			<div class='col'>
				<div class='text-xs font-weight-bold text-success text-uppercase mb-1'>Current Total</div>
				<div class='h5 mb-0 font-weight-bold text-gray-800'>{{currentTotal}}
					<span class="text-xs">({{percentUsed}}%)</span>
				</div>
			</div>
			<div class='col text-right'>
				<div class='text-xs font-weight-bold text-success text-uppercase mb-1'>Left to Budget</div>
				<div class='h5 mb-0 font-weight-bold text-gray-800' :class='{ "text-red":negative }'>{{moneyLeft}}</div>
			</div>
		</div>
		<div class="text-red text-sm mb-1 text-center overbudget" v-if="moneyLeft<0">You are over budget.</div>
		<div class="progress">
        	<div class="progress-bar" :class="{ 'bg-warning':(percentUsed>90),'bg-success':(moneyLeft==0),'bg-danger':(moneyLeft<0) }" role="progressbar" :style="progress" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100"></div>
      	</div>
	</div>
</template>

<script>
export default {
    name: "Totals",
	props:[ 'currentTotal' ],
	computed:{
		progress:function(){
			return "width:"+((this.currentTotal/this.budget)*100)+"%";
		},
		moneyLeft:function(){
			return this.budget-this.currentTotal;
		},
		negative:function(){
			return this.left<0;
		},
		percentUsed:function(){
			return Math.ceil(this.currentTotal/this.budget*100);
		}
	},
	data:function(){
		return {
			editable:false,
			editing:false,
			budget:this.$store.state.budget,
			salesTax:this.$store.state.salesTax
		}
	},
    watch:{
	  	budget:function(newValue,oldValue){
	  		this.$store.commit('updateBudget',newValue);
		},
		salesTax:function(newValue,oldValue){
	  		this.$store.commit('updateTax',newValue);
			this.$emit('taxUpdate',newValue);
		}
    },
    mounted:function(){
	  	this.$store.dispatch('loadState');
	  	this.budget=this.$store.state.budget;
	  	this.salesTax=this.$store.state.salesTax;
	    var height = (this.$refs.totals.clientHeight+30)+"px";
		this.$emit('heightUpdate',height);		
    }
};
</script>