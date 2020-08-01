<template>
  <v-card>
    <TopBar title="我的主页" />
    <v-row class="align-center">
      <v-avatar size="60" class="ma-4 ml-6">
        <v-img :src="info.avatar"></v-img>
      </v-avatar>
      <h2>{{ info.nickname }}</h2>
    </v-row>
    <v-divider></v-divider>
    <nuxt-link
      class="py-4 px-6"
      tag="h2"
      :to="'/user?userID=' + info.userID"
      >主页详情</nuxt-link
    >
    <v-divider></v-divider>
    <nuxt-link
      class="py-4 px-6"
      tag="h2"
      :to="'/user?userID=' + info.userID"
      >组队信息浏览记录</nuxt-link
    >
    <v-divider></v-divider>
    <nuxt-link
      class="py-4 px-6"
      tag="h2"
      :to="'/user?userID=' + info.userID"
      >设置</nuxt-link
    >
    <v-divider></v-divider>
    <nuxt-link
      class="py-4 px-6"
      tag="h2"
      :to="'/user?userID=' + info.userID"
      >客服中心</nuxt-link
    >
    <v-divider></v-divider>
    <nuxt-link class="py-4 px-6 pb-9" tag="h2" to="/about/us"
      >联系我们</nuxt-link
    >
  </v-card>
</template>

<script>
  import TopBar from "~/components/TopBar";

  export default {
    transition: "layout",
    name: "index",
    head() {
      return {
        title: "我的主页",
        meta: [
          {
            hid: "description",
            name: "description",
            content: "我的主页",
          },
        ],
      };
    },
    validate({ store, redirect }) {
      if (!store.state.token || !store.state.userInfo) {
        return redirect("/user/login?hint=true");
      }
      return true;
    },
    components: { TopBar },
    data() {
      return {};
    },
    computed: {},
    watch: {},
    methods: {},
    created() {},
    filters: {},
    mounted() {},
    async asyncData({ store, query }) {
      return { info: store.state.userInfo || {} };
    },
  };
</script>

<style scoped lang="scss">
  .left-box {
    border-right: 1px solid #ddd;
  }
</style>
