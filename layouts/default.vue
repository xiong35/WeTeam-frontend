<template>
  <v-app>
    <v-main>
      <div class="pa-md-5 pa-3 pb-1">
        <nuxt />
      </div>
    </v-main>
    <v-bottom-navigation
      v-model="bottomNav"
      id="bottom-nav"
      shift
      grow
      app
      small
    >
      <v-btn nuxt to="/home">
        <v-icon>mdi-home</v-icon>
        <span>首页</span>
      </v-btn>
      <v-btn nuxt to="/school">
        <v-icon>mdi-school</v-icon>
        <span>校园圈</span>
      </v-btn>
      <v-btn nuxt to="/post">
        <v-icon>mdi-comment-plus</v-icon>
        <span>发布</span>
      </v-btn>
      <v-btn nuxt to="/message">
        <v-icon>mdi-bell</v-icon>
        <span>消息</span>
      </v-btn>
      <v-btn nuxt to="/about">
        <v-icon>mdi-account</v-icon>
        <span>我的</span>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
  import { setToken, getToken } from "~/utils/validate";
  import { GET } from "~/network/methods";

  const pageMap = {
    home: 0,
    school: 1,
    post: 2,
    message: 3,
    about: 4,
  };

  export default {
    data() {
      return {
        bottomNav: 0,
      };
    },
    watch: {
      "$route.path"(path) {
        let paths = path.split("?")[0].split("/").slice(1);
        this.bottomNav = pageMap[paths[0]];
      },
    },
    computed: {},
    async mounted() {
      let paths = this.$route.path
        .split("?")[0]
        .split("/")
        .slice(1);
      this.bottomNav = pageMap[paths[0]];

      if (this.$store.state.token) {
        return;
      }

      let { token, userID } = getToken();
      if (!token) {
        return;
      }
      let res = await GET("/user/info?userID=" + userID);

      if (res.status == 200) {
        this.$store.commit("setUserInfo", {
          ...res.data[0],
          userID,
        });
        this.$store.commit("setToken", token);
      }

      res = await GET("/user/follow?userID=" + userID);
      this.$store.commit("setFollowing", res.data);
    },
  };
</script>
<style lang="scss">
  #bottom-nav {
    z-index: 99999;
    .v-btn {
      min-width: 0;
    }
  }
</style>
