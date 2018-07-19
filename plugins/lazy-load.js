import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
    error: '~/static/error-500.jpg',
    loading: '~/static/loading.gif',
})