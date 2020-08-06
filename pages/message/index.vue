<template>
  <div v-if="messages.length > 0">
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
      <MsgRate
        :hidable="true"
        :msg="msg.data"
        v-else-if="msg.type == 3"
      ></MsgRate>
    </div>
  </div>
  <ThePlaceholder v-else></ThePlaceholder>
</template>

<script>
  import MsgChat from "~/components/MsgChat";
  import MsgResponse from "~/components/MsgResponse";
  import MsgRequest from "~/components/MsgRequest";
  import MsgRate from "~/components/MsgRate";
  import ThePlaceholder from "~/components/ThePlaceholder";

  import { POST, GET } from "~/network/methods";

  export default {
    transition: "layout",
    name: "index",
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
      ThePlaceholder,

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
    created() {
      let { userInfo, token } = this.$store.state;
      if (!userInfo || !token) {
        this.$router.replace("/user/login?hint=true");
      }
    },
    mounted() {},
    async asyncData({ store, query }) {
      let { token, userInfo } = store.state;
      if (!token || !userInfo) {
        return;
      }

      let userID = userInfo.userID;

      let messages = [];
      let allChecked = [];
      let allNotChecked = [];

      let responses = await Promise.allSettled([
        GET("/user/chat?userID=" + userID),
        GET("/message/joinResponse?token=" + token),
        GET("/message/join?token=" + token),
        GET("/user/rate?userID=" + userID),
      ]);

      responses.forEach((promise, ind) => {
        if (
          promise &&
          promise.status == "fulfilled" &&
          promise.value.status == 200
        ) {
          let resDatas = promise.value.data;

          let checked = resDatas.filter((v) => v.isChecked);
          let notChecked = resDatas.filter((v) => !v.isChecked);

          allChecked = allChecked.concat(
            checked.map((obj) => ({
              type: ind,
              data: obj,
            }))
          );
          allNotChecked = allNotChecked.concat(
            notChecked.map((obj) => ({
              type: ind,
              data: obj,
            }))
          );
        }
      });

      allChecked = allChecked.sort((a, b) => {
        return b.data.time - a.data.time;
      });
      allNotChecked = allNotChecked.sort((a, b) => {
        return b.data.time - a.data.time;
      });
      return { messages: allNotChecked.concat(allChecked) };
    },
  };
</script>

<style scoped lang="scss"></style>
