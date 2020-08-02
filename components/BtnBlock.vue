<template>
  <v-btn @click="block" text color="deep-purple accent-4">
    拉黑
  </v-btn>
</template>

<script>
  import { POST } from "~/network/methods";

  export default {
    name: "BtnBlock",
    components: {},
    data() {
      return {};
    },
    props: {
      userID: {
        type: Number,
        required: true,
      },
    },
    computed: {},
    watch: {},
    methods: {
      async block() {
        if (
          !confirm(
            "确定将此用户加入黑名单吗?(你将不会收到他的任何消息)"
          )
        ) {
          return;
        }
        let res = await POST("/message/reject", {
          token: this.$store.state.token,
          rejecter: this.$store.state.userInfo.userID,
          rejectee: this.userID,
        });

        if (res) {
          alert("成功拉黑此人!");
        }
      },
    },
    created() {},
    mounted() {},
  };
</script>
<style scoped></style>
