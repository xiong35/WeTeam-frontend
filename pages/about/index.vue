<template>
  <v-card>
    <TopBar title="我的主页" />
    <v-row class="align-center">
      <v-avatar size="60" class="ma-4 ml-6">
        <v-img :src="$store.state.userInfo.avatar"></v-img>
      </v-avatar>
      <v-col>
        <h2>{{ $store.state.userInfo.nickname }}</h2>
        <span style="font-size: 12px;">{{
          $store.state.userInfo.description.slice(0, 20)
        }}</span>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <nuxt-link
      class="py-4 px-6"
      tag="div"
      :to="'/user?userID=' + $store.state.userInfo.userID"
      >主页详情</nuxt-link
    >
    <v-divider></v-divider>
    <nuxt-link class="py-4 px-6" tag="div" to="/about/history"
      >组队信息浏览记录</nuxt-link
    >
    <v-divider></v-divider>
    <nuxt-link class="py-4 px-6" tag="div" to="/about/settings"
      >设置</nuxt-link
    >
    <v-divider></v-divider>
    <nuxt-link class="py-4 px-6" tag="div" to="/about/feedback"
      >反馈</nuxt-link
    >
    <v-divider></v-divider>
    <nuxt-link class="py-4 px-6 pb-9" tag="div" to="/about/us"
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
    components: { TopBar },
    data() {
      return {};
    },
    computed: {},
    watch: {},
    methods: {},
    created() {
      let { userInfo, token } = this.$store.state;
      if (!userInfo || !token) {
        this.$router.replace("/user/login?hint=true");
      }
    },
    filters: {},
    mounted() {},
    async asyncData({ store, query }) {},
  };
</script>

<style scoped lang="scss">
  .left-box {
    border-right: 1px solid #ddd;
  }
</style>
