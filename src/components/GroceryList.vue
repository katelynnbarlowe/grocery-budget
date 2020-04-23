<template>
	 <div class="gList">
	 	<draggable v-bind="dragOptions" :list="groceryList" :move="saveState" @start="drag=true" @end="drag=false">
			<groceryGroup 
				v-for='(area,key,index) in groceryList'
				:area="area"
				:key="index"
				:keyVal="key"
				:index="index"
			>
			</groceryGroup>
		</draggable>
		<a href="#" class="btn btn-dark float-right" @click.prevent="addGroup">Add Group</a>
	</div>
</template>

<script>
import GroceryGroup from "@/components/GroceryGroup";
import draggable from 'vuedraggable'

export default {
    name: "GroceryList",
	props:['groceryList'],
	components:{
		GroceryGroup,
		draggable
	},
	computed:{
	    dragOptions() {
	      return {
	        animation: 200,
	        group: "description",
	        disabled: false,
	        ghostClass: "ghost"
	      };
	    }
	},
	methods:{
		onSort:function(){
	      //this.groceryList.splice(event.newIndex, 0, this.list.splice(event.oldIndex, 1)[0]);	
		},
		addGroup:function(){
			this.$store.commit('addArea');
		},
		saveState:function(){
			console.log("saving");
			this.$store.dispatch('saveState');
		}
	}
};
</script>