<template>
    <v-container>
        <v-layout row wrap  v-if="loading">
            <v-flex xs12 class="text-xs-center">
                <v-progress-circular 
                :width="7"
                :size="70"
                indeterminate color="green">
                </v-progress-circular>
            </v-flex>
        </v-layout>
        <v-layout row wrap mt-2 v-else>
            <v-flex xs12>
                <v-card>
                    <v-card-title>
                        <h2 class="green--text text--darken-1">{{ meetup.title }}</h2>
                        <template v-if="userIsCreator">
                            <v-spacer></v-spacer>
                            <app-edit-meetup-dialog :meetup="meetup"></app-edit-meetup-dialog>
                        </template>
                    </v-card-title>
                    <v-card-media
                        :src="meetup.imageUrl"
                        height="325px"
                    ></v-card-media>
                    <v-card-text>
                        <div class="green--text text--darken-1">{{ meetup.date | date }}</div>
                        <div>
                            <app-edit-meetup-date-dialog v-if="userIsCreator" :meetup="meetup"></app-edit-meetup-date-dialog>
                            <app-edit-meetup-time-dialog v-if="userIsCreator" :meetup="meetup"></app-edit-meetup-time-dialog>
                        </div>
                        <div class="green--text text--darken-1">{{ meetup.location}}</div>
                        <div>{{ meetup.description }}</div>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <app-register-dialog :meetupId="meetup.id"></app-register-dialog>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
  
<script>
export default {
  props: ['id'],
  computed: {
    meetup () {
        return this.$store.getters.loadedMeetup(this.id)
    },
    userIsAuthenticated () {
        return this.$store.getters.user != null && this.$store.getters.user != undefined
    },
    userIsCreator () {
        if (!this.userIsAuthenticated) {
            return false
        }
        return this.$store.getters.user.id == this.meetup.creatorId
    },
    loading () {
        return this.$store.getters.loading
    }
  }  
}
</script>

