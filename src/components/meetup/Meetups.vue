<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card class="green darken-2 light-green--text text--lighten-4" dark>
                    <v-container fluid>
                        <v-layout row>
                            <v-flex xs5 sm4 md3>
                                <v-card-media
                                    src="https://media.timeout.com/images/103444978/image.jpg"
                                    height="125px"
                                ></v-card-media>
                            </v-flex>
                            <v-flex xs7 sm8 md9>
                                <v-card-title>
                                    <div>
                                        <h5 class="headline">Meetup name</h5>
                                        <div>Listen to your favorite artists and albums whenever and wherever, online and offline.</div>
                                    </div>
                                </v-card-title>
                                <v-card-actions>
                                    <v-btn flat 
                                        class="light-green--text text--lighten-4" 
                                        to="/meetup/1">
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
