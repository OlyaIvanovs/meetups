<template>
    <v-container>
        <v-layout row wrap mt-2>
            <v-flex xs12>
                <v-card>
                    <v-card-title>
                        <h2 class="green--text text--darken-1">{{ meetup.title }}</h2>
                    </v-card-title>
                    <v-card-media
                        :src="meetup.imageUrl"
                        height="325px"
                    ></v-card-media>
                    <v-card-text>
                        <div class="green--text text--darken-1">{{ meetup.date | date }}</div>
                        <div class="green--text text--darken-1">{{ meetup.location}}</div>
                        <div>{{ meetup.description }}</div>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat class="green darken-2" dark>Register</v-btn>
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
    meetup() {
        return this.$store.getters.loadedMeetup(this.id)
    }
  }  
}
</script>

