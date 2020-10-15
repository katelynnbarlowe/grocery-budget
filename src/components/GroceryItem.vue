<template>
	 <tr role="row" valign="middle" :class="{ isChecked:item.checked }">
		<td @click="checkRow()">
			<input type="checkbox" :checked="item.checked" />
		</td>
		<td @click="checkRow()">
			{{item.name}}
		</td>
		<td>
			<input type="number" class="form-control form-control-sm text-right"  min="0" v-model="item.qty" @change="updateChecked" />
		</td>
		<td>
			$<select v-model="item.cost" class="form-control form-control-sm text-right" @change="updateChecked">
				<option v-for="index in 600" :value=" index/4 ">{{ (index/4).toFixed(2) }}</option>
			</select>
		</td>
		<td class="text-right">
			{{rowTotal}}
		</td>
	</tr>
</template>

<script>
import helper from '@/helper';
export default {
    name: "GroceryItem",
    props: ['item','keyVal'],
	computed:{
		rowTotal:function(){
			return helper.formatPrice(this.item.qty*this.item.cost);
		}
	},
	methods:{
		checkRow(){
			this.item.checked = !this.item.checked;
			this.$emit('checkList');
		},
		updateChecked(){		
			this.$emit('checkList');
		}
	}
};
</script>