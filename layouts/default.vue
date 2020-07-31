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
        <span>首页</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn nuxt to="/school">
        <span>校园圈</span>
        <v-icon>mdi-school</v-icon>
      </v-btn>
      <v-btn nuxt to="/post">
        <span>发布</span>
        <v-icon>mdi-comment-plus</v-icon>
      </v-btn>
      <v-btn nuxt to="/message">
        <span>消息</span>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn nuxt to="/about">
        <span>我的</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
  import {
    setToken,
    getToken,
    checkSignIn,
  } from "~/utils/validate";
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
