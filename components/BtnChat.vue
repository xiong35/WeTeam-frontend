<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :close-on-click="false"
    min-width="80%"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        :outlined="outlined"
        :text="textbtn"
        :color="color"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon v-if="icon" left>{{ icon }}</v-icon
        >{{ text }}</v-btn
      >
    </template>

    <v-card class="pa-3">
      <v-textarea
        outlined
        label="输入留言"
        v-model="sendMsg"
      ></v-textarea>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text @click="menu = false">取消</v-btn>
        <v-btn color="primary" text @click="submit">发送</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
  import { POST } from "~/network/methods";

  export default {
    name: "BtnChat",
    components: {},
    data() {
      return {
        menu: false,
        sendMsg: "",
      };
    },
    props: {
      userID: {
        type: Number,
        required: true,
      },
      color: {
        type: String,
        default: "primary",
      },
      text: {
        type: String,
        default: "留言",
      },
      outlined: {
        type: Boolean,
        default: false,
      },
      textbtn: {
        type: Boolean,
        default: true,
      },
      icon: {
        type: String,
        default: "",
      },
    },
    computed: {},
    watch: {},
    methods: {
      async submit() {
        let res = await POST("/user/chat", {
          token: this.$store.state.token,
          from: this.$store.state.userInfo.userID,
          to: this.userID,
          message: this.sendMsg,
        });

        console.log(res);

        alert("发送成功!");

        this.menu = false;
      },
    },
    created() {},
    mounted() {},
  };
</script>
<style scoped></style>
