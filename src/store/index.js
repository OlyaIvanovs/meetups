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
        user: null
    },
    mutations: {
        createMeetup (state, payload) {
            state.loadedMeetups.push(payload)
        },
        setUser (state, payload) {
            state.user = payload
        }
    },
    actions: {
        createMeetup ({commit}, payload) {
            const meetup = {
                title: payload.title,
                location: payload.location,
                imageUrl: payload.imageUrl,
                description: payload.description,
                date: payload.date,
                id: 'djgkldjfglkjdfklgjkldfjglk'
            }
            commit('createMeetup', meetup)
        },
        signUserUp ({commit}, payload) {
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
            .then(
                user => {
                    const newUser = {
                        id: user.uid,
                        registeredMeetups: []
                    }
                    commit('setUser', newUser)
                } 
            )
            .catch(
                error => {
                    console.log(error)
                }
            )
        },
        signUserIn ({commit}, payload) {
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
            .then(
                user => {
                    const newUser = {
                        id: user.uid,
                        registeredMeetups: []
                    }
                    commit('setUser', newUser)
                } 
            )
            .catch(
                error => {
                    console.log(error)
                }
            )
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
        }
    }
})