import Api from '@/axios/Word'

export default {
    getWord (params) {
        return Api().get('/wordwise/entries?limit=1&headword=' + params.word)
    }
}