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
      <v-btn nuxt to="/massage">
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
    massage: 3,
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

      setToken("token", "userID");
      let { token, userID } = getToken();
      if (!token) {
        return;
      }
      // let res = await GET("/user/info?userID=" + userID);
      let res = {
        status: 200,
        data: [
          {
            avatar: "https://ui-avatars.com/api/?name=jack",
            nickname: "jack",
            gender: "male",
            description: "this is description",
            schoolID: "U201914903", //校园卡号
            major: "cs",
            followerNum: "4",
            followingNum: "3",
            grade: "19", // 入学年份
            rating: {
              // rate详见下方 获取评分 部分, 在用户首页只展示星级
              ratedNum: 1, // 只用统计评价人数和总分数就行了, 平均分前端来算就好了
              attitude: 5, // 以下几项都是总分数
              capability: 4,
              personality: 4,
            },
          },
        ],
      };
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
