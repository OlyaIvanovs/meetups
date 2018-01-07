<template>
    <v-container mt-3>
        <v-layout row>
            <v-flex xs12>
                <h2 class="green--text text--darken-1">Create a new meetup</h2>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12>
                <form>
                    <v-layout row>
                        <v-flex xs12 sm8>
                            <v-text-field
                                name="title"
                                label="Title"
                                id="title"
                                v-model="meetup.title"
                                required
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm8>
                            <v-text-field
                                name="location"
                                label="Location"
                                id="location"
                                v-model="meetup.location"
                                required
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm8>
                            <v-text-field
                                name="imageUrl"
                                label="ImageURL"
                                id="image-url"
                                v-model="meetup.imageUrl"
                                required
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm8>
                            <img :src="meetup.imageUrl" height="150">
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm8>
                            <v-text-field
                                name="description"
                                label="Description"
                                v-model="meetup.description"
                                id="description"
                                multi-line
                                required
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                </form>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12 sm8>
                <h3 class="green--text text--darken-1">Choose Date & Time</h3>
            </v-flex>
        </v-layout>
        <v-layout row mt-2 wrap>
            <v-flex md12 lg4>
                <v-date-picker v-model="meetup.date"></v-date-picker>
            </v-flex>
            <v-flex md12 lg8>
                <v-time-picker format="24hr" v-model="meetup.time"></v-time-picker>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12 sm8>
                <v-btn @click="createMeetup" 
                    :disabled="!formIsValid"
                    flat class="green darken-2" dark>
                    Create Meetup
                </v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data () {
            return {
                meetup: {
                    title: '',
                    location: '',
                    imageUrl: '',
                    description: '',
                    date: '',
                    time: new Date()
                }
            }
        },
        computed: {
            formIsValid () {
                return this.meetup.title != '' && 
                        this.meetup.location != '' &&
                        this.meetup.imageUrl != '' && 
                        this.meetup.description != '' 
            },
            submittableDateTime () {
                let date = new Date()
                if (this.meetup.date) {
                    date = new Date(this.meetup.date)
                }
                if (typeof this.meetup.time === 'string') {
                    const hours = this.meetup.time.match(/^(\d+)/)[1]
                    const minutes = this.meetup.time.match(/:(\d+)/)[1]
                    date.setHours(hours)
                    date.setMinutes(minutes)
                } else {
                    date.setHours(this.meetup.time.getHours())
                    date.setMinutes(this.meetup.time.getMinutes())
                }
                return date
            }
        },
        methods: {
            createMeetup () {
                const meetupData = {
                    title: this.meetup.title,
                    location: this.meetup.location,
                    imageUrl: this.meetup.imageUrl,
                    description: this.meetup.description,
                    date: this.submittableDateTime
                }
                this.$store.dispatch('createMeetup', meetupData)
                this.$router.push({name: 'Meetups'})
            }
        }
    }
</script>
