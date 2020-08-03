<template>
  <v-card class="pb-5">
    <TopBar title="修改密码"></TopBar>
    <v-form
      class="pt-8 px-4"
      ref="form"
      v-model="isValid"
      lazy-validation
    >
      <v-text-field
        class="my-5"
        label="新密码"
        type="password"
        :rules="[
          (v) => !!v || '请填写密码',
          (v) => v.length >= 6 || '密码至少需要6位',
        ]"
        required
        counter
        clearable
        v-model="pw"
      ></v-text-field>
      <v-text-field
        class="my-5"
        label="确认密码"
        type="password"
        :rules="[(v) => v === pw || '两次密码不一致']"
        required
        clearable
        v-model="pwConfirm"
      ></v-text-field>
    </v-form>
    <v-row class="pa-6">
      <v-spacer></v-spacer>
      <v-btn color="primary" outlined @click="submit">
        提交
      </v-btn>
    </v-row>
  </v-card>
</template>

<script>
  import TopBar from "~/components/TopBar";

  import { PUT } from "~/network/methods";
  import { sha40_digest } from "~/utils/sha256";

  export default {
    name: "password",
    components: {
      TopBar,
    },
    data() {
      return {
        pw: "",
        pwConfirm: "",
        isValid: false,
      };
    },
    head() {
      return {
        title: "修改密码",
        meta: [
          {
            hid: "description",
            name: "description",
            content: "WeTeam 的修改密码界面",
          },
        ],
      };
    },
    computed: {},
    watch: {},
    methods: {
      async submit() {
        if (!this.$refs.form.validate()) {
          return;
        }

        let res = await PUT("/user/password", {
          token: this.$store.state.token,
          password: sha40_digest(this.pw),
        });

        if (res) {
          localStorage.removeItem("token");
          alert("修改成功! 请重新登录");
          this.$router.push("/user/login");
        }
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
