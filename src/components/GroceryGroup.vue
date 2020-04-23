<template>
	 <div class='card mb-4'>
		<div class='card-header font-weight-bold'>
			<span class="float-right total" v-if="checkedTotal>0">Selected Total: {{checkedTotal}} <span class="text-xs font-weight-normal">({{selectedPercent}}% of current total)</span></span>
			<span class="label text-dark" @click="startEditing" v-if="!editing">{{area.groupName}}</span> 
			<input type="text" v-if="editing" ref="editField" @blur="editing=false" @keyup.enter="editing=false" class="bare" v-model="area.groupName" />
		</div>
		<div class='card-body'>
			<table class="table dataTable">
				<thead>
					<th width="25"><input type="checkbox" :checked="allCheck" @change="addRemoveAll" /></th>
					<th><a href="#" class="text-red" @click.prevent="removeItems" v-if="checkedTotal">Remove</a></th>
					<th class="text-center" width="10%">QTY</th>
					<th class="text-center" width="11%">UNIT COST</th>
					<th class="text-right" width="10%">TOTAL COST</th>
				</thead>

				<draggable v-bind="dragOptions" tag="tbody" :list="area.items" :move="saveState">
					<groceryItem 
						v-for='(item,key,index) in area.items'
						:item="item"
						:index="index"
						:key="key"
						:keyVal="key"
						v-on:checkList="updateCheckedTotal"
						>
					</groceryItem>
				</draggable>
				<tfoot>
					<tr v-for="n in newItems">
						<td>&nbsp;</td>
						<td>
							<input type="text" class="form-control form-control-sm" v-model="n.name" />
						</td>
						<td>
							<input type="number" class="form-control form-control-sm text-right" min="0" v-model="n.qty" />
						</td>
						<td>
							$<select class="form-control form-control-sm text-right" v-model="n.cost">
								<option v-for="index in 600" :value=" index/4 ">{{ (index/4).toFixed(2) }}</option>
							</select>
						</td>
						<td>&nbsp;</td>
					</tr>
					<tr>
						<td colspan="5">
							<a href="#" class="btn btn-success float-right" @click.prevent="addItem">
								Add Items
							</a>
							<input type="number" class="form-control form-control-sm text-right float-right" v-model="addingNum" />
						</td>
					</tr>
				</tfoot>
			</table>
		</div>
	</div>
</template>

<script>
import GroceryItem from "@/components/GroceryItem";
import draggable from 'vuedraggable';
export default {
    name: "GroceryGroup",
		props: ['area','index','keyVal'],
		data:function(){
			return {
				editing:false,
				checkedTotal:0,
				selectedPercent:0,
				allCheck:false,
				adding:false,
				addingNum:1,
				newItems:[
					{
						name:"",
						qty:"",
						cost:""
					}
				]
			}
		},
		watch:{
			area:{
				deep:true,
				handler:function(){
					this.$store.dispatch('saveState');
				}
			},
			addingNum:function(newValue,oldValue){
				if(newValue<oldValue){
					this.newItems=this.newItems.slice(0,newValue);
				}else{
					while(this.newItems.length<newValue){
						var newItem = {
							name:"",
							qty:"",
							cost:""
						};
						this.newItems.push(newItem);
					}					
				}
			}
		},
		components:{
			GroceryItem,
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
			startEditing(){
				this.editing=true;
			    this.$nextTick(function() { // will happen immediately after the next DOM update cycle
					this.$refs.editField.select();
			    });
			},
			addRemoveAll(){
				var newVal=false;
				this.allCheck=!this.allCheck;
				var items = this.$props.area.items;
				for(var item in items){
					if(!items[item].checked&&this.allCheck){
						newVal=true;
					} 
				}
				for(var item in items){
					items[item].checked=newVal;
				}
				this.allCheck=newVal;
				this.updateCheckedTotal();
			},
			updateCheckedTotal:function(){
				this.checkedTotal=0;
				for(var i in this.$props.area.items){
					var item = this.$props.area.items[i];
					if(item.checked)
						this.checkedTotal+=(item.qty*item.cost);
				}
				this.selectedPercent=Math.ceil(this.checkedTotal/this.$store.getters.currentTotal*100);
			},
			removeItems:function(){
				for(var i in this.$props.area.items){
					var item = this.$props.area.items[i];
					if(item.checked)
						this.$store.commit('removeItem',{ itemIndex:i,areaIndex:this.keyVal});
				}		
				this.updateCheckedTotal();		
			},
			addItem:function(){
				for(var item in this.newItems){
					var i=this.newItems[item];
					i.checked=false;
					if(i.name)
						this.$store.commit('addItem',{item:i,areaIndex:this.keyVal});
				}
				this.newItems=[{name:"", qty:"", cost:""} ]; 
				this.addingNum=1;
			},
			saveState:function(){
				console.log("saving");
				this.$store.dispatch('saveState');
			}
		}
};
</script>