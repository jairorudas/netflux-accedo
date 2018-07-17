<template>
  <div>
    <nuxt/>
    <v-footer class="pa-3" app height="50">
      <v-spacer></v-spacer>
      <div>&copy; Netflux-Accedo {{ new Date().getFullYear() }}</div>
    </v-footer>
  </div>
</template>
<script>
 
</script>
<style lang="scss">
@import '~/assets/scss/variables.scss';

html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  
  footer{
    background-color: $custom-second-color  ;
    color: $primary-txt-color;
  }
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
