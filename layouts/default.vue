<template>
  <div>
     <v-app id="netFlux" dark>
      <v-toolbar color="fff" dense fixed clipped-left app >
            <v-icon class="mx-2 logo">ondemand_video</v-icon>
            <v-toolbar-title class="ml-0 align-center">
              <span class="title" >NetFlux</span>
            </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-layout row align-center style="max-width: 650px">
            <v-text-field
              :append-icon-cb="() => {}"
              placeholder="Search..."
              single-line
              append-icon="search"
              color="white"
              hide-details></v-text-field>
        </v-layout>

        <nuxt-link to="/login">
          <v-icon class="mx-2">account_circle</v-icon>Login
        </nuxt-link>
      </v-toolbar>
      <nuxt/>
    </v-app>
  </div>
</template>
<script>
  export default {
    data() {
      return {
       
      }
    },
    
  }
</script>
<style lang="scss">
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  & .title, .logo{
    color: red!important;
    margin: 0
  }
  
  a{
    color: #fff;
    text-decoration: none;
  }
}


*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
