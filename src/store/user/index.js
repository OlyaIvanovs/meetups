import * as firebase from 'firebase'

export default {
    state: {
        user: null
    },
    mutations: {
        registerUserForMeetup (state, payload) {
            const id = payload.id
            if (state.user.registeredMeetups.findIndex(meetupId => {
                meetupId === id
            }) >= 0) {
                return
            }
            state.user.registeredMeetups.push(id)
            state.user.fbKeys[id] = payload.fbKey
        },
        unregisterUserFromMeetup (state, payload) {
            const registeredMeetups = state.user.registeredMeetups
            registeredMeetups.splice(registeredMeetups.findIndex(meetup => meetup.id === payload), 1)
            Reflect.deleteProperty(state.user.fbKeys, payload)
        },
        setUser (state, payload) {
            state.user = payload
        }
    },
    actions: {
        logout ({commit}) {
            firebase.auth().signOut()
            commit('setUser', null)
        },
        registerUserForMeetup ({commit, getters}, payload) {
            commit('setLoading', true)
            const user = getters.user
            firebase.database().ref('/users/' + user.id).child('/registrations/')
            .push(payload).then(data => {
                commit('setLoading', false)
                commit('registerUserForMeetup', {
                    id: payload,
                    fbKey: data.key
                })
            })
            .catch((error) => {
                console.log(error)
                commit('setLoading', false)
            })
        },
        unregisterUserFromMeetup ({commit, getters}, payload) {
            commit('setLoading', true)
            const user = getters.user
            if (!user.fbKeys) {
                return
            }
            const fbKey = user.fbKeys[payload]
            firebase.database().ref('/users/' + user.id + '/registrations/')
            .child(fbKey)
            .remove()
            .then(() => {
                commit('setLoading', false)
                commit('unregisterUserFromMeetup', payload)
            }).catch(error => {
                console.log(error)
                commit('setLoading', false)
            })
        },
        signUserUp ({commit}, payload) {
            commit('setLoading', true)
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
            .then(
                user => {
                    commit('setLoading', false)
                    commit('clearError')
                    const newUser = {
                        id: user.uid,
                        registeredMeetups: [],
                        fbKeys: {}
                    }
                    commit('setUser', newUser)
                } 
            )
            .catch(
                error => {
                    commit('setLoading', false)
                    commit('setError', error)
                }
            )
        },
        signUserIn ({commit}, payload) {
            commit('setLoading', true)
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
            .then(
                user => {
                    commit('setLoading', false)
                    commit('clearError')
                    const newUser = {
                        id: user.uid,
                        registeredMeetups: [],
                        fbKeys: {}
                    }
                    commit('setUser', newUser)
                } 
            )
            .catch(
                error => {
                    commit('setLoading', false)
                    commit('setError', error)
                }
            )
        },
        autoSignIn ({commit}, payload) {
            commit('setUser', {
                id: payload.uid, 
                registeredMeetups: [],
                fbKeys: {}
            })
        },
        fetchUserData ({commit, getters}) {
            commit('setLoading', true)
            firebase.database().ref('/users/' + getters.user.id + '/registrations/')
            .once('value').then(data => {
                const dataPairs = data.val()
                let registeredMeetups = []
                let swappedPairs = {}
                for (let key in dataPairs) {
                    registeredMeetups.push(dataPairs[key])
                    swappedPairs[dataPairs[key]] = key
                }
                const updatedUser = {
                    id: getters.user.id,
                    registeredMeetups: registeredMeetups,
                    fbKeys: swappedPairs
                }
                commit('setLoading', false)
                commit('setUser', updatedUser)
            }).catch(error => {
                commit('setLoading', false)
                console.log(error)
            })
        }
    },
    getters: {
        user (state) {
            return state.user
        }
    }
}