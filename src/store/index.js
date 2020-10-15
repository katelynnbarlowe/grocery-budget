import Vue from 'vue'
import Vuex from 'vuex'
import ListService from '@/backend/services'

Vue.use(Vuex)

// currently active list
export default new Vuex.Store(
{
    state: {
        listId: 0,
        budget: 0,
        default_budget: 0,
        name:"Default Name",
        sales_tax: 0,
        default_sales_tax:0,
        list:[            
            { 
                groupName:"New Group",
                items:[]
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
            return total+total*(state.sales_tax/100);
        }
    },
    mutations: {
        setList(state,payload){
            state.listId=payload;
        },
        emptyList(state){
            state.list=[            
                { 
                    groupName:"New Group",
                    items:[]
                 },
            ];
            state.name="Default Name";
        },
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
        },
        addArea(state){
            state.list.push({
                groupName:"New Group",
                items:[]
            })
        },
        removeItem(state,payload){
            var itemIndex = payload.itemIndex;
            var areaIndex=payload.areaIndex;
            Vue.delete(state.list[areaIndex].items,itemIndex);
        },
        removeGroup(state,payload){
            var areaIndex=payload.areaIndex;
            Vue.delete(state.list,areaIndex);
        },
        overrideState(state,newState){
            state.name = newState.name;
            state.list = newState.list;
            state.budget = newState.budget;
            state.sales_tax = newState.sales_tax;
        },
        updateBudget(state,newValue){
            state.budget=newValue;
        },
        updateTax(state,newValue){
            state.sales_tax=newValue;
        },
        updateName(state,newValue){
            state.name=newValue;
        }
    },
    actions: {
        async loadState({dispatch, commit, state}){
            if(state.listId!=0){                
                var response = await ListService.loadList(state.listId);    
                if(response.data){
                    commit('overrideState',response.data);
                    var response = await dispatch('loadDefaults');
                }else{
                    commit('setList',-1);
                }
            }else{
                var response = await dispatch('loadDefaults'); 
                commit('emptyList');
            }

            commit('clearChecks');
        },
        async loadDefaults(context){ // load default settings
            if(context.state.budget==0){
                var value = await ListService.getSetting('default_budget');
                if(value.data)
                    context.commit('updateBudget',value.data);
            }
            if(context.state.sales_tax==0){
                var value = await ListService.getSetting('sales_tax');
                if(value.data)
                    context.commit('updateTax',value.data);
            }
        },
        async saveState(context){
            var response = await ListService.saveList(context.state); 

            context.commit('setList',response.data.listId);
        },
        async saveList(context){
            var response = await ListService.saveListSettings(context.state); 

            context.commit('setList',response.data.listId);
        }
    }
}   
)
