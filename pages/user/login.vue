<template>
  <v-card
    outlined
    max-width="700"
    class="mx-auto pa-12 text-center mt-12"
  >
    <v-card-title>登录</v-card-title>
    <v-text-field
      v-model="account"
      label="请输入登录账号"
    ></v-text-field>
    <v-text-field
      v-model="password"
      label="请输入密码"
      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show ? 'text' : 'password'"
      @click:append="show = !show"
      ref="pw"
    ></v-text-field>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn outlined color="info" nuxt to="/user/signUp"
        >注册</v-btn
      >
      <v-btn outlined color="primary" @click="handleLogin">
        登录
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { POST, GET } from "~/network/methods";
  import { sha40_digest } from "~/utils/sha256";
  import { setTokenNID } from "~/utils/validate";

  export default {
    transition: "layout",
    name: "index",
    head() {
      return {
        title: "登录",
        meta: [
          {
            hid: "description",
            name: "description",
            content: "WeTeam 的登陆界面",
          },
        ],
      };
    },
    components: {},
    data() {
      return {
        account: "",
        password: "",
        show: false,
      };
    },
    computed: {},
    watch: {},
    methods: {
      async handleLogin() {
        let { account, password } = this;
        password = sha40_digest(password);

        let res = await POST("/user/login", {
          password,
          userID: account,
        });

        let { token, userID } = res.data;

        setTokenNID(token, userID);

        res = await GET("/user/info?userID=" + userID);

        if (res.status == 200) {
          this.$store.commit("setUserInfo", {
            ...res.data[0],
            userID,
          });
          this.$store.commit("setToken", token);
        }

        res = await GET("/user/follow?userID=" + userID);
        this.$store.commit("setFollowing", res.data);

        alert("登陆成功");

        this.$router.push("/home");
      },
    },
    created() {},
    mounted() {
      if (this.hint) {
        alert("请先登录!");
      }
    },
    async asyncData({ store, query }) {
      return { hint: query.hint };
    },
  };
</script>

<style scoped lang="scss"></style>
