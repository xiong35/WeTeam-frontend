<template>
  <div class="settings">
    <TopBar title="设置"></TopBar>
    <v-list three-line>
      <v-list-item>
        <v-list-item-content class="pl-3">
          <nuxt-link tag="h2" to="/about/settings/userInfo">
            修改个人信息
          </nuxt-link>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item>
        <v-list-item-content class="pl-3">
          <nuxt-link tag="h2" to="/404">身份认证</nuxt-link
          ><small>暂未开通</small>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item>
        <v-list-item-content class="pl-3">
          <h2 @click="toResume">修改简历</h2>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item>
        <v-list-item-content class="pl-3">
          <nuxt-link tag="h2" to="/about/settings/blockList"
            >黑名单</nuxt-link
          >
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item>
        <v-list-item-content class="pl-3">
          <nuxt-link tag="h2" to="/about/settings/password"
            >修改密码</nuxt-link
          >
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item>
        <v-list-item-content @click="logOut" class="pl-3">
          <h2>退出登录</h2>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
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
    computed: {},
    watch: {},
    methods: {
      toResume() {
        if (!checkSignIn(this)) {
          return;
        }
      },

      logOut() {
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
