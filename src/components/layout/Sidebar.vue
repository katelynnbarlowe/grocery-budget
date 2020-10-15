<template>
    <!-- Sidebar -->
    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" :class="sidebarToggled ? 'toggled':''" id="accordionSidebar">

      <!-- Sidebar - Brand -->
      <a class="sidebar-brand d-flex align-items-center justify-content-center" href="/">
        <div class="sidebar-brand-icon rotate-n-15">
          <i class="fab fa-raspberry-pi"></i>
        </div>
        <div class="sidebar-brand-text mx-3">Grocery Budget</div>
      </a>

      <!-- Divider -->
      <hr class="sidebar-divider my-0">

      <!-- Nav Item - Dashboard -->
      <li class="nav-item">
        <router-link to="/dashboard" class="nav-link">
          <i class="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span></a>
        </router-link>
      </li>

      <!-- Divider -->
      <hr class="sidebar-divider">

      <!-- Heading -->
      <div class="sidebar-heading">
        Lists
      </div>
      <li class="nav-item" v-if="lists.length">
        <a href="#" class="nav-link" :class="!recentToggled?'collapsed':''" data-toggle="collapse" data-target="#collapseOne" @click.prevent="recentToggled=!recentToggled">
          <i class="fas fa-list"></i> Recent Lists
        </a>
        <div id="collapseOne" class="collapse" :class="recentToggled ? 'show':''" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
          <div class="bg-white py-2 collapse-inner rounded">
            <!-- <h6 class="collapse-header">Custom Components:</h6> -->
            <span class="" v-for="l in lists">
              <router-link :to="{name: 'List',params:{ id:l.id } }" class="collapse-item">
                <span>{{l.name}}</span>
              </router-link>
            </span>
          </div>
        </div>
      </li>
      <li class="nav-item">
        <router-link to="/list/new" class="nav-link">
          <i class="fas fa-fw fa-plus"></i>
          <span>New List</span>
        </router-link>
      </li>

      <hr class="sidebar-divider d-none d-md-block">
      <!-- Nav Item - Pages Collapse Menu -->
      <li class="nav-item">
        <router-link to="/settings" class="nav-link">
          <i class="fas fa-fw fa-cog"></i>
          <span>Settings</span>
        </router-link>
      </li>

      <!-- Divider -->
      <hr class="sidebar-divider d-none d-md-block">

      <!-- Sidebar Toggler (Sidebar) -->
      <div class="text-center d-none d-md-inline">
        <button class="rounded-circle border-0" id="sidebarToggle" @click="sidebarToggled = !sidebarToggled"></button>
      </div>

    </ul>
    <!-- End of Sidebar -->
</template>
<script>	
import ListService from '@/backend/services'
export default {
  name: 'Sidebar',
  data: function(){
    return {
        sidebarToggled:false,
        recentToggled:false,
        lists:[]
      }
  },
  mounted:async function(){    
    var response = await ListService.allLists();
    if(!response.error){
      this.lists=response.data;
      this.lists.sort(function(a,b){
        return Date.parse(b.updated_at) - Date.parse(a.updated_at);
      });
    }
    /*$("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
      $("body").toggleClass("sidebar-toggled");
      $(".sidebar").toggleClass("toggled");
      if ($(".sidebar").hasClass("toggled")) {
        $('.sidebar .collapse').collapse('hide');
      };
    });*/
  },
  methods:{
    updateListName:function(id,name){ 
      var found=false;
      this.lists.forEach((v)=>{
        if(id==v.id){
          v.name=name;
          // move to the front
          this.lists.sort(function(x,y){ return x.id == id ? -1 : y == id ? 1 : 0; });
          found=true;
        }
      });
      if(!found)
        this.lists.push({ id:id, name:name });
    }
  }
}
</script>