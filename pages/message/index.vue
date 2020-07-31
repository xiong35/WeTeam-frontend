<template>
  <div>
    <div class="pt-2" v-for="(msg, ind) in messages" :key="ind">
      <MsgChat :msg="msg.data" v-if="msg.type == 0"></MsgChat>
      <MsgResponse
        :msg="msg.data"
        v-else-if="msg.type == 1"
      ></MsgResponse>
      <MsgRequest
        :msg="msg.data"
        v-else-if="msg.type == 2"
      ></MsgRequest>
      <MsgRate :msg="msg.data" v-else-if="msg.type == 3"></MsgRate>
    </div>
  </div>
</template>

<script>
  import MsgChat from "~/components/MsgChat";
  import MsgResponse from "~/components/MsgResponse";
  import MsgRequest from "~/components/MsgRequest";
  import MsgRate from "~/components/MsgRate";

  import { POST, GET } from "~/network/methods";

  export default {
    transition: "layout",
    name: "index",
    validate({ store, redirect }) {
      if (!store.state.token || !store.state.userInfo) {
        redirect("/user/login?hint=true");
      }
      return true;
    },
    head() {
      return {
        title: "消息列表",
        meta: [
          {
            hid: "description",
            name: "description",
            content: "WeTeam 的消息列表界面",
          },
        ],
      };
    },
    components: {
      MsgChat,
      MsgResponse,
      MsgRequest,
      MsgRate,
    },
    data() {
      return {};
    },
    computed: {},
    watch: {},
    methods: {},
    created() {},
    mounted() {},
    async asyncData({ store, query }) {
      let { token, userInfo } = store.state;
      let userID = userInfo.userID;
      let messages = [];

      let responses = await Promise.allSettled([
        GET("/user/chat?userID=" + userID),
        GET("/message/joinResponse?token=" + token),
        GET("/message/join?token=" + token),
        GET("/user/rate?userID=" + userID),
      ]);

      responses.forEach((promise, ind) => {
        console.log(promise);
        if (
          promise &&
          promise.status == "fulfilled" &&
          promise.value.status == 200
        ) {
          messages = messages.concat(
            promise.value.data.map((obj) => ({
              type: ind,
              data: obj,
            }))
          );
        }
      });

      messages = messages.sort((a, b) => {
        return b.data.time - a.data.time;
      });
      return { messages };
    },
  };
</script>

<style scoped lang="scss"></style>
