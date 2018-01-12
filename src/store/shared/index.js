export default {
    state: {
        loading: false,
        error: null
    },
    mutations: {
        setLoading (state, payload) {
            state.loading = payload
        },
        setError (state, payload) {
            state.error = payload
        },
        clearError (state, payload) {
            state.error = null
        }
    },
    actions: {
        clearError ({commit}) {
            commit('clearError')
            commit('setLoading', false)
        }
    },
    getters: {
        loading (state) {
            return state.loading
        },
        error (state) {
            return state.error
        }
    }
}