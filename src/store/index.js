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
            console.log(payload)
            console.log('gjkdfjgkj')
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
                        imageUrl: obj[key].imageUrl
                    })
                }
                commit('setLoadedMeetups', meetups)
                commit('setLoading', false)
            }).catch((error) => {
                    console.log(error)
                    commit('setLoading', true)
                }
            )
        },
        createMeetup ({commit}, payload) {
            const meetup = {
                title: payload.title,
                location: payload.location,
                imageUrl: payload.imageUrl,
                description: payload.description,
                date: payload.date.toISOString()
            }
            firebase.database().ref('meetups').push(meetup).then(
                (data) => {
                    const key = data.key
                    commit('createMeetup', {
                        ...meetup,
                        id: key
                    })
                }
            ).catch((error) => console.log(error))
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