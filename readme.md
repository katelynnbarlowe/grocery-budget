Grocery Budget 
========================
By: Katelynn Barlowe

## Project Description
Manage a grocery list budget. First, plan your trip by making your list of items you need (grouped by area of the store or food groups or however you want!) along with a quantity and estimated unit cost. Add items until you reach your budgeted amount. Then in the store, use your list and adjust your items by putting in the actual unit cost (round up to the nearest 25 cent). Watch your amount available change - allowing you to make on-the-fly item changes based on how much or how little you have left. Put stuff back if you've gone over or add more if you have extra. 

This is a Sandbox Project used for me (Katelynn) to learn Vue. There are many things I'd like to add at a later time as I continue to learn. The app is built to communicate with the [grocery budget api](https://github.com/katelynnbarlowe/grocery-budget-api) running on localhost:3000. The API is expecting requests from localhost:8080 or localhost:8081. Requests from other places will be blocked. Redis must also be running.

## Setup 
```
yarn install
npm run dev
``` 

### Current Features
+ A list of "groups" with editable names that can be used to categorize the grocery items however the user wants. Ex: aisles in the store, food groups, etc.
    ++ The ability to add more groups
+ A list of grocery items within the group with editable quantities and unit costs, calculating a row total dynamically
+ A progress bar at the top to display how much money is still available based on the budget - (item row totals * sales tax).
+ The ability to remove these items individually or in multiples
+ The ability to add one or more items at a time
+ A subtotal display of all selected grocery items
+ The ability to edit list settings 
    ++ budgeted amount
    ++ sales tax
    ++ name
+ Alerts when you've gone over budget
+ The ability to sort list items and groups
+ The ability to load previously-saved lists
+ User Management
    ++ Ability to update name/email/password
    ++ Ability to set default list budget and sales tax

### Future Features
+ Deploy to production
+ Fully responsive UI
+ Dashboard with useful information
+ Automatic saving (without pressing save button)
+ Fully fleshed out unit testing

### Future Future Features 
+ Touch controls at the mobile level (swiping especially)
+ The ability to create a custom template list that is loaded by default

### Sources
+ Theme: Start Bootstrap - [SB Admin 2](https://startbootstrap.com/template-overviews/sb-admin-2)
+ Icons: [FontAwesome](https://fontawesome.com/)
+ [Vue.js](http://vuejs.org/)
+ [Vuex](https://vuex.vuejs.org/)
+ [SortableJS / Vue.Draggable](https://github.com/SortableJS/Vue.Draggable)
+ [Webkpack](https://webpack.js.org/)

### Known Issues
- Not redirecting nicely when logged out because of time out. *(11/10/20)*