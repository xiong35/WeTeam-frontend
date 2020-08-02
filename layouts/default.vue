<template>
  <v-app>
    <v-main>
      <div class="pa-md-5 pa-3 pb-1">
        <nuxt />
      </div>
    </v-main>
    <v-bottom-navigation
      color="black"
      v-model="bottomNav"
      id="bottom-nav"
      shift
      grow
      app
      small
    >
      <v-btn nuxt to="/home">
        <v-icon
          >mdi-home{{ bottomNav == 0 ? "" : "-outline" }}</v-icon
        >
        <span>首页</span>
      </v-btn>
      <v-btn nuxt to="/school">
        <v-icon
          >mdi-school{{ bottomNav == 1 ? "" : "-outline" }}</v-icon
        >
        <span>校园圈</span>
      </v-btn>
      <v-btn nuxt to="/post">
        <v-icon
          >mdi-comment-plus{{
            bottomNav == 2 ? "" : "-outline"
          }}</v-icon
        >
        <span>发布</span>
      </v-btn>
      <v-badge
        :content="newMsg"
        :value="showNewMsg"
        color="red"
        offset-y="23px"
        offset-x="7vw"
      >
        <v-btn nuxt to="/message">
          <v-icon
            >mdi-bell{{ bottomNav == 3 ? "" : "-outline" }}</v-icon
          >
          <span>消息</span>
        </v-btn>
      </v-badge>
      <v-btn nuxt to="/about">
        <v-icon
          >mdi-account{{
            bottomNav == 4 ? "" : "-outline"
          }}</v-icon
        >
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
        showNewMsg: false,
        newMsg: 0,
      };
    },
    watch: {
      "$route.path"(path) {
        let paths = path.split("?")[0].split("/").slice(1);
        this.bottomNav = pageMap[paths[0]];
      },
      bottomNav(newVal) {
        if (newVal == 3) {
          this.showNewMsg = false;
        }
      },
    },
    computed: {},
    async mounted() {
      {
        // init bottom nav
        let paths = this.$route.path
          .split("?")[0]
          .split("/")
          .slice(1);
        this.bottomNav = pageMap[paths[0]];
      }

      {
        // first time, init userInfo
        let { token, userID } = getToken();
        if (token && userID) {
          // if have token
          // get data
          let responses = await Promise.allSettled([
            GET("/user/info?userID=" + userID), // user info
            GET("/user/follow?userID=" + userID), // followers, to filter index page data
            GET("/message/new?token=" + token), // new msg num
          ]);
          if (
            responses[0].status == "fulfilled" &&
            responses[0].value.status == 200
          ) {
            this.$store.commit("setUserInfo", {
              ...responses[0].value.data[0],
              userID,
            });
            this.$store.commit("setToken", token);
          }
          if (
            responses[1].status == "fulfilled" &&
            responses[1].value.status == 200
          ) {
            this.$store.commit(
              "setFollowing",
              responses[1].value.data
            );
          }
          if (
            responses[2].status == "fulfilled" &&
            responses[2].value.status == 200
          ) {
            console.log(responses[2]);
            this.newMsg = responses[2].value.data.number;
            this.showNewMsg = !!this.newMsg;
          }
        } else {
          // else
          // set store's placeholder as null
          this.$store.commit("setUserInfo", null);
          this.$store.commit("setToken", null);

          // check if is at forbidden page, and redirect
          let path = this.$route.fullPath;
          if (
            path.startsWith("/post") ||
            path.startsWith("/about") ||
            path.startsWith("/message")
          ) {
            this.$router.replace("/user/login?hint=true");
          }
        }
      }
    },
  };
</script>
<style lang="scss">
  #bottom-nav {
    z-index: 99999;
    .v-btn {
      min-width: 20vw;
      height: 56px;
    }
  }
</style>
