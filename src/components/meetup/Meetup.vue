<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card>
                    <v-card-title>
                        <h3 class="green--text text--darken-1">My meetup</h3>
                    </v-card-title>
                    <v-card-media
                        src="https://media.timeout.com/images/103444978/image.jpg"
                        height="325px"
                    ></v-card-media>
                    <v-card-text>
                        <div class="green--text text--darken-1">17 July 2017</div>
                        <div>
                            he range of elements processed 
                        by forEach() is set before the first invocation of 
                        callback. Elements that are appended to the array 
                        after the call to forEach() begins will not be visited
                         by callback. If the values of existing elements of the
                        </div>
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
  
}
</script>

