import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loadedMeetups:[
            { imageUrl: 'https://media.timeout.com/images/103444978/image.jpg', 
                id: 'jjhjhj', title: 'Meetup in New York', date: '2017-07-11' },
            { imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Auckland_Skyline_as_seen_from_Devonport_20100128_3.jpg/1200px-Auckland_Skyline_as_seen_from_Devonport_20100128_3.jpg', 
                id: 'asasasasjjhjhj', title: 'Meetup in Auckland', date: '2017-07-15' },
        ],
        user: {
            id: 'jdksjgkj',
            registeredMeetups: ['asasasasjjhjhj']
        }
    },
    mutations: {},
    actions: {},
    getters: {
        loadedMeetups(state) {
            return state.loadedMeetups.sort((meetupA, meetupB) =>
                meetupA.date > meetupB.date
            )
        },
        loadedMeetup(state, meetupId) {
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
})