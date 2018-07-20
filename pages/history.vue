<template>
    <v-content > 
     <v-layout row >
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar color="red" dark>
          

          <v-toolbar-title>History</v-toolbar-title>

          <v-spacer></v-spacer>
          
        </v-toolbar>

        <v-list two-line>
          <template v-for="(item, index) in history">
            <v-subheader
              v-if="item.header"
              :key="index"
            >
              {{ item.header }}
            </v-subheader>

            <v-divider
              v-else-if="item.divider"
              :inset="item.inset"
              :key="index"
            ></v-divider>

            <v-list-tile
              v-else
              :key="item.title"
              avatar
            >
              <v-list-tile-avatar>
                <img :src="item.images[0].url">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.description"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
 </v-content>

</template>

<script>
export default {
  data() {
    return {
      history: []
    };
  },

  created() {
    this.history = JSON.parse(this.$ls.get("history"));
    console.log(this.history);
  }
};
</script>

<style scoped>
</style>