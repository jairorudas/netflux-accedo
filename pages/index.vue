<template>
   
  <v-content>
    <v-container fill-height fluid>
      <v-layout justify-center >
        <v-flex shrink>
          <netflux-carousel />
          
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
 
</template>

<script>
import netfluxCarousel from "../components/netflux-carousel.vue";
export default {
    components:{
      netfluxCarousel
    },
    data () {
      return {
        
      }
    },
    
};
</script>

<style lang="scss">
  
</style>
