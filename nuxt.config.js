import colors from "vuetify/es5/util/colors";

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
    theme: {
      dark: false,
      themes: {
        light: {
          primary: "#32AADE",
          accent: colors.indigo.accent1,
          secondary: colors.blueGrey.base,
          info: colors.blue.base,
          warning: colors.amber.darken1,
          error: colors.deepOrange.accent3,
          success: colors.lightGreen.base,
        },
      },
    },
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
