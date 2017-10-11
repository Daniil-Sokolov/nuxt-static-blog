const axios = require('axios')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Jonniek',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Welcome to my simple cozy homepage'
      },
      { name: 'theme-color', content: '#35495e' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'manifest', href: './manifest.json' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#35495e' },

  css: [
    '~/assets/main.css',
    '~/assets/animations.css',
    '~/assets/blog.css'
  ],
  generate: {
    routes: function() {
      return axios.get('http://localhost:3000/api/routes')
        .then((res) => res.data)
    }
  },
  modules: [
    ['@nuxtjs/google-analytics', { ua: 'UA-107119603-1' }]
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLINT on save
    */
    extend(config, ctx) {
      if (ctx.dev && ctx.isClient) {
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
