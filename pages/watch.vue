<template>
    <v-content>
        <v-container fill-height fluid>
            <v-layout justify-center >
                <v-flex shrink v-bind:style="{ position: 'relative' }"> 
                    <v-btn color="#D90429" :nuxt="true" :absolute="true" to="/" :right="true">Back</v-btn>
                    <h1>   {{ video.title }} </h1> 
                    <video :src="this.video.contents[0].url" controls autoplay="true" @ended="onPlayerEnded()"></video>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
   
</template>

<script>
export default {
  data() {
    return {
      video: {}
    };
  },

  methods: {
    onPlayerEnded(player) {
      this.$router.go(-1);
      console.log("player ended!", player);
    }
  },
  created() {
    this.video = JSON.parse(this.$ls.get("movieSelected"));
    console.log(this.video);
  }
};
</script>

<style scoped>
</style>