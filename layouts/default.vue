<template>
  <div >
     <v-app id="netFlux" dark>
      <v-toolbar color="fff" dense fixed clipped-left app tabindex="1">
            <v-icon class="mx-2 logo">ondemand_video</v-icon>
            <v-toolbar-title class="ml-0 align-center">
              <nuxt-link to="/">
                <span class="title">NetFlux</span>
              </nuxt-link>
            </v-toolbar-title>
          <v-spacer></v-spacer>
          
        <nuxt-link to="/history">
        <v-icon class="mx-2">history</v-icon>history</nuxt-link>
        <nuxt-link to="/login"  tabindex="3">
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
