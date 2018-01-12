import * as firebase from 'firebase'

export default {
    state: {
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
        }
    }
}