// import colors from 'vuetify/es5/util/colors'

const axios = require("axios");

export default {
  mode: "universal",
  router: {
    // TODO change base?
    base: "/WeTeam/",
  },
  head: {
    titleTemplate: "%s - " + "WeTeam",
    title: "home",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
      },
      {
        hid: "description",
        name: "description",
        content: "WeTeam 组队网站",
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  // loading: { color: '#fff' },
  loading: "~/components/loading.vue",
  /*
   ** Global CSS
   */
  css: ["~/assets/reset.css", "~/assets/transition.css"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: "@/plugins/vue-mavon-editor", ssr: false }],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/vuetify"],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    progress: true,
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    // theme: {
    //   dark: true,
    //   themes: {
    //     dark: {
    //       primary: colors.blue.darken2,
    //       accent: colors.grey.darken3,
    //       secondary: colors.amber.darken3,
    //       info: colors.teal.lighten1,
    //       warning: colors.amber.base,
    //       error: colors.deepOrange.accent4,
    //       success: colors.green.accent3
    //     }
    //   }
    // }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
  generate: {
    async routes() {
      // let res = await axios.get('http://xiong35.cn/data/article/blog/')
      // let blogs = res.data.data.map((it) => {
      //   return '/articles/blog/' + it.id
      // })
      // res = await axios.get('http://xiong35.cn/data/article/trap/')
      // let traps = res.data.data.map((it) => {
      //   return '/articles/trap/' + it.id
      // })
      // return traps.concat(blogs)
    },
  },
};
