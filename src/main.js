import Vue from 'vue'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'
import App from './App.vue'
import '../assets/sb-admin-2.scss'

Vue.use(Vuex);
Vue.use(VueCookies);

const store = new Vuex.Store({
  	state: {
	    budget: 70,
	    salesTax: .025,
	    list:[
			{ 
				groupName:"Aisle One",
				items:[
					{ cost:1, name:"Crackers", qty:1, checked:false }, 
					{ cost:1, name:"Raisins", qty:1, checked:false },
					{ cost:1.5, name:"Cheese-its", qty:1, checked:false }, 
					{ cost:1, name:"Pretzels", qty:1, checked:false }, 
					{ cost:2, name:"Bananas", qty:1, checked:false }
				]
			 },
			{ 
				groupName:"Aisle Four",
				items:[
					{ cost:1.5, name:"Eggs", qty:1, checked:false }, 
					{ cost:2.75, name:"Milk", qty:2, checked:false }
				]			
			},
		]
  	},
  	getters:{
	  	currentTotal:function(state){
	  		var total = 0;
	  		for(var area in state.list){
	  			for(var item in state.list[area].items){	  			
	  				total+=(state.list[area].items[item].cost*state.list[area].items[item].qty);
	  			}
	  		}
	  		return total+total*state.salesTax;
	  	}
  	},
	mutations: {
	    clearChecks(state){
		  	for(var area in state.list){
		  		for(var item in state.list[area].items){
		  			state.list[area].items[item].checked=false;
		  		}
		  	}
	    },
	    addItem(state,payload){
	    	var item = payload.item;
	    	var areaIndex=payload.areaIndex;
		  	if(!item.cost) item.cost=1;
		  	if(!item.qty) item.qty=1;
		  	state.list[areaIndex].items.push(item);
		  	
			var stateToSave = ''+JSON.stringify(state);
			Vue.$cookies.remove('state');
			Vue.$cookies.set('state', stateToSave, (60 * 60 * 24 * 30));
	    },
	    addArea(state){
		  	state.list.push({
		  		groupName:"New Group",
		  		items:{}
		  	})

			var stateToSave = ''+JSON.stringify(state);
			Vue.$cookies.remove('state');
			Vue.$cookies.set('state', stateToSave, (60 * 60 * 24 * 30));
	    },
	    removeItem(state,payload){
	    	var itemIndex = payload.itemIndex;
	    	var areaIndex=payload.areaIndex;
	  		Vue.delete(state.list[areaIndex].items,itemIndex);
		  	
			var stateToSave = ''+JSON.stringify(state);
			Vue.$cookies.remove('state');
			Vue.$cookies.set('state', stateToSave, (60 * 60 * 24 * 30));
	  	},
	  	overrideState(state,newState){
	  		state.list = newState.list;
	  		state.buddget = newState.buddget;
	  		state.salesTax = newState.salesTax;
	  	},
	  	updateBudget(state,newValue){
	  		state.budget=newValue;
		  	
			var stateToSave = ''+JSON.stringify(state);
			Vue.$cookies.remove('state');
			Vue.$cookies.set('state', stateToSave, (60 * 60 * 24 * 30));
	  	},
	  	updateTax(state,newValue){
	  		state.salesTax=newValue;
		  	
			var stateToSave = ''+JSON.stringify(state);
			Vue.$cookies.remove('state');
			Vue.$cookies.set('state', stateToSave, (60 * 60 * 24 * 30));
	  	}
	},
	actions: {
	    loadState(context){
		  	var jsonState = Vue.$cookies.get('state');
		  	if(jsonState)
		  		context.commit('overrideState',jsonState);
		  	context.commit('clearChecks');
	    },
	    saveState(context){
			var stateToSave = ''+JSON.stringify(context.state);
			Vue.$cookies.remove('state');
			Vue.$cookies.set('state', stateToSave, (60 * 60 * 24 * 30));
	    }
	}
})

new Vue({
  el: '#wrapper',
  store,	
  render: h => h(App)
})