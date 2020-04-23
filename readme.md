Grocery Budget (Built Version)
========================
By: Katelynn Barlowe

**NOTE: this is a built, single-file component version of the initial project [here](https://github.com/katelynnbarlowe/grocery-budget). This will be the repo for the final version of the project.**

## Project Description
Manage a grocery list budget. First, plan your trip by making your list of items you need (grouped by area of the store or food groups or however you want!) along with a quantity and estimated unit cost. Add items until you reach your budgeted amount. Then in the store, use your list and adjust your items by putting in the actual unit cost (round up to the nearest 25 cent). Watch your amount available change - allowing you to make on-the-fly item changes based on how much or how little you have left. Put stuff back if you've gone over or add more if you have extra. 

This is a Sandbox Project used for me (Katelynn) to learn Vue. There are many things I'd like to add at a later time as I continue to learn. For state management, I'm using a basic store model with browser cookies.

### Current Features
+ A list of "groups" with editable names that can be used to categorize the grocery items however the user wants. Ex: aisles in the store, food groups, etc.
++ The ability to add more groups
+ A list of grocery items within the group with editable quantities and unit costs, calculating a row total dynamically
+ A progress bar at the top to display how much money is still available based on the budget - (item row totals * sales tax).
+ The ability to remove these items individually or in multiples
+ The ability to add one or more items at a time
+ A subtotal display of all selected grocery items
+ Regularly saving your list to browser cookies.
+ The ability to edit list settings 
++ budgeted amount
++ sales tax
+ Alerts when you've gone over budget
+ The ability to sort list items and groups

### Future Features
+ Fully fleshed out unit testing

### Future Future Features (the dream!)
+ Touch controls at the mobile level (swiping especially)
+ The ability to save and load previous lists
+ The ability to create a custom template list that is loaded by default
++ Migration to a MongoDB (MEVN stack)
+ Adding VUE CLI and project builds (using Webpack)
+ Adding Vue Router
+ User management

### Sources
+ Theme: Start Bootstrap - [SB Admin 2](https://startbootstrap.com/template-overviews/sb-admin-2)
+ Icons: [FontAwesome](https://fontawesome.com/)
+ [Vue.js](http://vuejs.org/)
+ [Vuex](https://vuex.vuejs.org/)
+ [SortableJS / Vue.Draggable](https://github.com/SortableJS/Vue.Draggable)
+ [Vue Cookies](https://www.npmjs.com/package/vue-cookies)
+ [Webkpack](https://webpack.js.org/)

### Known Issues
- Assert is not importing (for unit testing) *(3.3.20)*
- When new grocery items are added, checkbox and background not reflecting when checked. *(3.29.20)*
- Small styling issue when adding multiple rows - borders are weird. *(3.30.20)*