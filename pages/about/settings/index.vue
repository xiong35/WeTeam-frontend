<template>
  <v-card class="settings">
    <TopBar title="设置"></TopBar>
    <nuxt-link
      class="py-4 px-6 mt-1"
      tag="h2"
      to="/about/settings/userInfo"
    >
      修改个人信息
    </nuxt-link>

    <v-divider></v-divider>

    <h2 class="py-4 px-6" tag="h2" @click="toResume">修改简历</h2>

    <v-divider></v-divider>

    <nuxt-link
      class="py-4 px-6"
      tag="h2"
      to="/about/settings/password"
      >修改密码</nuxt-link
    >

    <v-divider></v-divider>

    <nuxt-link
      class="py-4 px-6"
      to="/about/settings/blockList"
      tag="h2"
      >黑名单</nuxt-link
    >

    <v-divider></v-divider>

    <nuxt-link class="py-4 px-6" tag="h2" to="/404"
      >身份认证<small style="font-weight: 200;"
        >&nbsp;&nbsp; 暂未开通</small
      ></nuxt-link
    >

    <v-divider></v-divider>

    <h2 @click="logOut" class="py-4 px-6" tag="h2">退出登录</h2>
  </v-card>
</template>

<script>
  import TopBar from "~/components/TopBar";

  import { checkSignIn, refreshTo } from "~/utils/validate";

  export default {
    name: "settings",
    components: {
      TopBar,
    },
    data() {
      return {};
    },
    head() {
      return {
        title: "设置",
        meta: [
          {
            hid: "description",
            name: "description",
            content: "WeTeam 的设置界面",
          },
        ],
      };
    },
    computed: {},
    watch: {},
    methods: {
      toResume() {
        if (!checkSignIn(this)) {
          return;
        }

        this.$router.push(
          `/user/resume?userID=${this.$store.state.userInfo.userID}&nickname=修改我`
        );
      },

      logOut() {
        if (!confirm("确定要退出登录吗?")) {
          return;
        }
        localStorage.removeItem("token");
        alert("成功退出登录!");
        refreshTo();
      },
    },
    created() {
      let { userInfo, token } = this.$store.state;
      if (!userInfo || !token) {
        this.$router.replace("/user/login?hint=true");
      }
    },
    mounted() {},
  };
</script>
<style scoped></style>
