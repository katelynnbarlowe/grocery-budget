<template>
	<div class='preview-bar totalsBar shadow bg-white sticky-top p-2 mb-4 border-bottom-success' @mouseover="editable=true" @mouseleave="editable=false" ref="totals">
		<a href="#" class="text-secondary editButton" v-if="editable&&!editing" @click.prevent="editing=true; editable=false"><span class="fa fa-cog "></span> List Settings</a>
		<div class="editBar mb-1" v-if="editing">
			<div class="row">
				<div class="col">
					<div class="row">
						<div class="col">
							<label for="" class="text-xs font-weight-bold text-uppercase mb-1">List Name</label>
							<div class="input-group input-group-lg">
								<input type="text" v-bind:autofocus="editing" class="form-control" v-model='name' />
							</div>
						</div>
						<div class="col">
							<label for="" class="text-xs font-weight-bold text-uppercase mb-1">Grocery Budget</label>
							<div class="input-group input-group-lg">
								<div class="input-group-prepend">
									<span class="input-group-text">$</span>
								</div>
								<input type="text" class="form-control" v-model="budget" />
							</div>
						</div>
						<div class="col">
							<label for="" class="text-xs font-weight-bold text-uppercase mb-1">Sales Tax</label>
							<div class="input-group input-group-lg">
								<input type="text" class="form-control" v-model='sales_tax' />
							</div>
						</div>
					</div>
				</div>
				<div class="col-1">
					<a href="#" @click.prevent="editing=false; saveSettings()" class="closeLink btn btn-success btn-lg col mb-1">save</a>
					<a href="#" @click.prevent="deleteList()" class="deleteLink btn btn-danger btn-sm col">delete list</a>
				</div>
			</div>
			<div class="row mb-2 text-center">
				<div class="col">
					<a href="#" @click.prevent="editing=false">close</a>
				</div>
			</div>
		</div>
		<div class='row mb-2'>
			<div class='col'>
				<div class='text-xs font-weight-bold text-success text-uppercase mb-1'>Current Total</div>
				<div class='h5 mb-0 font-weight-bold text-gray-800'>{{totalDisplay}}
					<span class="text-xs">({{percentUsed}}%)</span>
				</div>
			</div>
			<div class='col text-right'>
				<div class='text-xs font-weight-bold text-success text-uppercase mb-1'>Left to Budget</div>
				<div class='h5 mb-0 font-weight-bold text-gray-800' :class='{ "text-red":negative }'>{{moneyLeftDisplay}}</div>
			</div>
		</div>
		<div class="text-red text-sm mb-1 text-center overbudget" v-if="moneyLeft<0">You are over budget.</div>
		<div class="progress">
			<div class="progress-bar" :class="{ 'bg-warning':(percentUsed>90),'bg-success':(moneyLeft==0),'bg-danger':(moneyLeft<0) }" role="progressbar" :style="progress" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100"></div>
		</div>
	</div>
</template>

<script>
import helper from '@/helper'

export default {
	name: 'Totals',
	props: [ 'currentTotal' ],
	computed: {
		progress: function () {
			return 'width:' + ((this.currentTotal / this.budget) * 100) + '%'
		},
		moneyLeft: function () {
			return this.budget - this.currentTotal
		},
		negative: function () {
			return this.left < 0
		},
		percentUsed: function () {
			return Math.ceil(this.currentTotal / this.budget * 100)
		},
		totalDisplay: function () {
			return helper.formatPrice(this.currentTotal)
		},
		moneyLeftDisplay: function () {
			return helper.formatPrice(this.moneyLeft)
		}
	},
	data: function () {
		return {
			name: this.$store.state.name,
			editable: false,
			editing: false,
			budget: this.$store.state.budget,
			sales_tax: this.$store.state.sales_tax,
			nameUpdated: false
		}
	},
	watch: {
		name: function (newValue, oldValue) {
			this.$store.commit('updateName', newValue)
			this.nameUpdated = true
		},
		budget: function (newValue, oldValue) {
			this.$store.commit('updateBudget', newValue)
		},
		sales_tax: function (newValue, oldValue) {
			this.$store.commit('updateTax', newValue)
			this.$emit('taxUpdate', newValue)
		}
	},
	mounted: async function () {
	},
	methods: {
		saveSettings: async function () {
			var listId = this.$store.state.listId
			await this.$store.dispatch('saveList')

			if (this.$store.state.listId !== listId) {
				this.$router.replace('/list/' + this.$store.state.listId)
				this.reload()
			}
			if (this.nameUpdated) { // what will happen for new list?
				this.$emit('updateName')
				this.nameUpdated = false
			}
		},
		reload: function () {
			this.budget = this.$store.state.budget
			this.sales_tax = this.$store.state.sales_tax
			this.name = this.$store.state.name
		},
		toggle: function () {
			this.editing = !this.editing
		},
		deleteList: function () {
			this.$emit('deleteList')
		}
	}
}
</script>
