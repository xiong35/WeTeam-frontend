<template>
  <v-card
    outlined
    max-width="700"
    class="mx-auto pa-12 text-center mt-12"
  >
    <v-card-title>登录</v-card-title>
    <v-text-field
      v-model="account"
      label="请输入账号"
      outlined
    ></v-text-field>
    <v-text-field
      v-model="password"
      label="请输入密码"
      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show ? 'text' : 'password'"
      outlined
      @click:append="show = !show"
      ref="pw"
    ></v-text-field>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn outlined color="primary" nuxt to="/user/signUp"
        >注册</v-btn
      >
      <v-btn outlined color="success" @click="handleLogin">
        登录
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
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
      handleLogin() {},
    },
    created() {},
    mounted() {},
    async asyncData({ store, query }) {},
  };
</script>

<style scoped lang="scss"></style>
