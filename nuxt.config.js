module.exports = {

    /*
     ** Headers of the page
     */
    head: {
        title: 'Netflux-Accedo',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Test for a job' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    /*
     ** Customize the progress bar color
     */
    loading: { color: '#3B8070' },
    mode: 'spa',
    modules: [
        '@nuxtjs/vuetify'
    ],
    vuetify: {
        theme: {
            primary: '#D90429',
            secondary: '#2B2D42',
            accent: '#EF233C',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107'
        },
    },

    plugins: [
        { src: '~/plugins/swiper.js', ssr: false },
        { src: '~/plugins/vue-resource.js' },
        { src: '~/plugins/localStorage.js' },
        { src: '~/plugins/lazy-load.js' },
    ],
    css: [
        'swiper/dist/css/swiper.css',
    ],
    /*
     ** Build configuration
     */
    build: {
        /*
         ** Run ESLint on save
         */
        extend(config, { isDev, isClient }) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        }
    }
}