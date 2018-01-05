<template>
    <v-container>
        <v-layout row wrap v-for="meetup in meetups" :key="meetup.id" class="mb-2">
            <v-flex xs12>
                <v-card class="green darken-2 light-green--text text--lighten-4" dark>
                    <v-container fluid>
                        <v-layout row>
                            <v-flex xs5 sm4 md3>
                                <v-card-media
                                    :src = "meetup.imageUrl"
                                    height="125px"
                                ></v-card-media>
                            </v-flex>
                            <v-flex xs7 sm8 md9>
                                <v-card-title>
                                    <div>
                                        <h5 class="headline">{{ meetup.title }}</h5>
                                        <div>{{ meetup.date }}</div>
                                    </div>
                                </v-card-title>
                                <v-card-actions>
                                    <v-btn flat 
                                        class="light-green--text text--lighten-4" 
                                        :to="{name: 'Meetup', params: {id: meetup.id}}">
                                        <v-icon>arrow_forward</v-icon>
                                        View Meetup
                                    </v-btn>
                                </v-card-actions>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data () {
        return {

        }
    },
    computed: {
        meetups () {
            return this.$store.getters.loadedMeetups
        }
    }
}
</script>
