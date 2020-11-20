import { securedAxiosInstance, plainAxiosInstance } from '@/backend/axios'

export default {
	getUser () {
		return securedAxiosInstance.get('/user')
			.then(response => {
				return response.data
			})
			.catch(error => console.log(error))
	},
	getSetting (code) {
		return securedAxiosInstance.get('/api/v1/settings/code/' + code).then(response => {
			return {data: response.data.value, error: false}
		})
			.catch((error) => {
				return {error: error}
			})
	},
	getSettings () {
		return securedAxiosInstance.get('/api/v1/settings').then(response => {
			return {data: response.data, error: false}
		})
			.catch((error) => {
				return {error: error}
			})
	},
	updateUser (userUpdate) {
		return securedAxiosInstance.patch('/signin/', userUpdate).then(response => {
			return { error: false, message: 'Your settings have been updated successfully.' }
		})
			.catch(error => {
				return { error: error.response.data.error }
			})
	},
	updateSettings (settings, settingIds) {
		var error = ''
		for (const [c, v] of Object.entries(settings)) {
			var id = settingIds[c]
			if (id !== undefined) {
				securedAxiosInstance.patch('/api/v1/settings/' + id, {
					value: v
				}).then(response => {})
					.catch(error => {
						error += error
					})
			}
		};
		return error
	},

	allLists () {
		return securedAxiosInstance.get('/api/v1/grocery_lists/').then(response => {
			return { data: response.data, error: false }
		})
			.catch(error => {
				return {error: error}
			})
	},

	loadList (id) {
		return securedAxiosInstance.get('/api/v1/grocery_lists/' + id).then(response => {
			return response
		})
			.catch(error => {
				return error
			})
	},

	saveListSettings (list) {
		var listId = list.listId

		if (listId === 0) { // create
			return securedAxiosInstance.post('/api/v1/create_full_list/', list).then(response => {
				response.error = false
				return response
			})
				.catch(error => {
					return {error: error}
				})
		} else {
			return securedAxiosInstance.patch('/api/v1/grocery_lists/' + list.listId, { name: list.name, budget: list.budget, sales_tax: list.sales_tax }).then(response => {
				response.error = false
				response.data.listId = response.data.id
				return response
			})
				.catch(error => {
					return {error: error}
				})
		}
	},

	saveList (list) {
		var listId = list.listId

		if (listId === 0) { // create
			return securedAxiosInstance.post('/api/v1/create_full_list/', list).then(response => {
				response.error = false
				return response
			})
				.catch(error => {
					return {error: error}
				})
		} else { // patch
			return securedAxiosInstance.patch('/api/v1/edit_full_list/' + listId, list).then(response => {
				response.error = false
				return response
			})
				.catch(error => {
					return {error: error}
				})
		}
	},

	deleteList (id) {
		return securedAxiosInstance.delete('/api/v1/grocery_lists/' + id).then(response => {
			response.error = false
			return response
		})
			.catch(error => {
				return {error: error}
			})
	}
}
