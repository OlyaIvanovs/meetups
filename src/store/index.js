import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loadedMeetups:[
            { imageUrl: 'https://media.timeout.com/images/103444978/image.jpg', 
                id: 'jjhjhj', 
                title: 'Meetup in New York', 
                date: new Date(), 
                location: 'New York', 
                description: "dksghdjkfhgkjh" },
            { imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Auckland_Skyline_as_seen_from_Devonport_20100128_3.jpg/1200px-Auckland_Skyline_as_seen_from_Devonport_20100128_3.jpg', 
                id: 'asasasasjjhjhj', 
                title: 'Meetup in Auckland', 
                date: new Date(), 
                location: 'Auckland' },
        ],
        user: null,
        loading: false,
        error: null,
        loadedMeetups: []
    },
    mutations: {
        createMeetup (state, payload) {
            state.loadedMeetups.push(payload)
        },
        updateMeetup (state, payload) {
            const meetup = state.loadedMeetups.find(meetup => {
                return meetup.id === payload.id
            })
            if (payload.title) {
                meetup.titile = payload.title
            }
            if (payload.description) {
                meetup.description = payload.description
            }
            if (payload.date) {
                meetup.date = payload.date
            }
        },
        setUser (state, payload) {
            state.user = payload
        },
        setLoading (state, payload) {
            state.loading = payload
        },
        setError (state, payload) {
            state.error = payload
        },
        clearError (state, payload) {
            state.error = null
        },
        setLoadedMeetups (state, payload) {
            state.loadedMeetups = payload
        }
    },
    actions: {
        loadMeetups ({commit}) {
            commit('setLoading', true)
            firebase.database().ref('meetups').once('value').then((data) => {
                const meetups = []
                const obj = data.val()
                for (let key in obj) {
                    meetups.push({
                        id: key,
                        title: obj[key].title,
                        location: obj[key].location,
                        description: obj[key].description,
                        date: obj[key].date,
                        imageUrl: obj[key].imageUrl,
                        creatorId: obj[key].creatorId
                    })
                }
                commit('setLoadedMeetups', meetups)
                commit('setLoading', false)
            }).catch((error) => {
                    commit('setLoading', true)
                }
            )
        },
        createMeetup ({commit, getters}, payload) {
            const meetup = {
                title: payload.title,
                location: payload.location,
                description: payload.description,
                date: payload.date.toISOString(),
                creatorId: getters.user.id
            }
            let imageUrl
            let key
            firebase.database().ref('meetups').push(meetup).then(
                (data) => {
                    key = data.key
                    return key
                }
            )
            .then(key => {
                const filename = payload.image.name
                const ext = filename.slice(filename.lastIndexOf('.'))
                return firebase.storage().ref('meetups/' + key + '.' + ext).put(payload.image)
            })
            .then(fileData => {
                imageUrl = fileData.metadata.downloadURLs[0]
                return firebase.database().ref('meetups').child(key).update({
                    imageUrl: imageUrl
                })
            })
            .then(() => {
                commit('createMeetup', {
                    ...meetup,
                    imageUrl: imageUrl,
                    id: key
                })
            })
            .catch((error) => console.log(error))
        },
        updateMeetupData ({commit}, payload) {
            commit('setLoading', true)
            const updateObj = {}
            if (payload.title) {
                updateObj.title = payload.title
            }
            if (payload.description) {
                updateObj.description = payload.description
            }
            if (payload.date) {
                updateObj.date = payload.date
            }
            firebase.database().ref('meetups').child(payload.id).update(updateObj)
            .then(() => {
                commit('setLoading', false)
                commit('updateMeetup', payload)
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
                        registeredMeetups: []
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
                        registeredMeetups: []
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
        clearError ({commit}) {
            commit('clearError')
            commit('setLoading', false)
        },
        autoSignIn ({commit}, payload) {
            commit('setUser', {id: payload.uid, registeredMeetups: []})
        },
        logout ({commit}) {
            firebase.auth().signOut()
            commit('setUser', null)
        }
    },
    getters: {
        loadedMeetups (state) {
            return state.loadedMeetups.sort((meetupA, meetupB) =>
                meetupA.date > meetupB.date
            )
        },
        loadedMeetup (state, meetupId) {
            return (meetupId) => {
                return state.loadedMeetups.find((meetup) => {
                    return meetup.id == meetupId
                })
            }
        },
        featuredMeetups(state, getters) {
            return getters.loadedMeetups.slice(0, 5)
        },
        user (state) {
            return state.user
        },
        loading (state) {
            return state.loading
        },
        error (state) {
            return state.error
        }
    }
})