<template>
    <v-container>
        <v-layout row wrap class="mb-2">
            <v-flex xs12 sm6 class="text-xs-center text-sm-right">
                <v-btn large router to="/meetups" class="green darken-2" dark>Explore Meetups</v-btn>
            </v-flex>
            <v-flex xs12 sm6 class="text-xs-center text-sm-left">
                <v-btn large router to="/meetup/new" class="green darken-2" dark>Organize Meetup</v-btn>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="mt-2">
            <v-flex xs12>
                <v-carousel>
                    <v-carousel-item 
                        v-for="meetup in meetups" 
                        :src="meetup.imageUrl" :key="meetup.id">
                        <div class="title">{{ meetup.title }}</div>
                    </v-carousel-item>
                </v-carousel>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="mt-2">
            <v-flex xs12 class="text-xs-center">
                <p>Join our awesome meetups!</p>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                meetups: [
                    { imageUrl: 'https://media.timeout.com/images/103444978/image.jpg', id: 'jjhjhj', title: 'Meetup in New York' },
                    { imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Auckland_Skyline_as_seen_from_Devonport_20100128_3.jpg/1200px-Auckland_Skyline_as_seen_from_Devonport_20100128_3.jpg', id: 'asasasasjjhjhj', title: 'Meetup in Auckland' },
                ]
            }
        }
    }

</script>

<style scoped>
    .title {
        position: absolute;
        bottom: 50px;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        color: #fff;
        padding: 10px;
    }
</style>
