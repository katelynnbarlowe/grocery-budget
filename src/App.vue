<template>
	 <div id='wrapper' class='bg-primary'>
			<div class="container">
				<div class='col' :style="containerStyles">
					<TotalsBar 
					v-on:taxUpdate="updateSalesTax"	
					v-on:heightUpdate="heightUpdate"	
						:salesTax='salesTax'
						:currentTotal='currentTotal'> 
					</TotalsBar>
					<GroceryList 
						v-bind:groceryList='list'
						>
					</GroceryList>
			</div>
		</div>
	</div>
</template>
                    
<script>
import TotalsBar from "@/components/Totals";
import GroceryList from "@/components/GroceryList";
import Vue from 'vue'

export default {
    name: "App",
	data: function(){
		return {
		    list:this.$store.state.list,
		    salesTax: this.$store.state.salesTax,
		    containerStyles:{}
	    }
	},
    computed:{
	  	currentTotal:function(){
    		return this.$store.getters.currentTotal;
	  	}
	},
    mounted:function(){
	  	this.$store.dispatch('loadState');
	  	this.list=this.$store.state.list;
	    this.salesTax= this.$store.state.salesTax;
    },
	components:{
	  	TotalsBar,
	  	GroceryList
	},
    methods: {
	  	formatPrice:function(value) {
		    let val = (value/1).toFixed(2);
		    return '$'+val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
		},
		updateSalesTax:function(value){
			this.salesTax=value;
		},
		heightUpdate:function(value){
			Vue.set(this.containerStyles,"margin-top",value);
		}
    }
};
</script>