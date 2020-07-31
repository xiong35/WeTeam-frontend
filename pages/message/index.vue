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
  import { checkSignIn } from "~/utils/validate";

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
    mounted() {
      checkSignIn(this);
    },
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

      /*  
      let msgRes = {
        status: 200,
        msg: "ok",
        data: [
          {
            from: "398ryib", // 发布评价的人
            fromName: "<nickname>", // 发布评价的人的nickname
            fromAvatar: "https://ui-avatars.com/api/?name=dpas", // 发布评价的人的avatar
            to: "fjhasv", // 被评价的人
            message: "this is a message", // 详细内容
            time: new Date() * 1 - 200, // 发布的时间
          },
          {
            from: "398ryib", // 发布评价的人
            fromName: "<nickname>", // 发布评价的人的nickname
            fromAvatar: "https://ui-avatars.com/api/?name=dpas", // 发布评价的人的avatar
            to: "fjhasv", // 被评价的人
            message: "this is another message", // 详细内容
            time: new Date() * 1 - 141123, // 发布的时间
          },
          {
            from: "398ryib", // 发布评价的人
            fromName: "<nickname>", // 发布评价的人的nickname
            fromAvatar: "https://ui-avatars.com/api/?name=dpas", // 发布评价的人的avatar
            to: "fjhasv", // 被评价的人
            message: "this is not a message", // 详细内容
            time: new Date() * 1 - 2, // 发布的时间
          },
        ],
      };
      let responseRes = {
        status: 200,
        msg: "ok",
        data: [
          {
            accepted: true,
            target: "<项目id>",
            message: "这是负责人的留言...",
            title: "foo",
            time: new Date() * 1 - 400, // change
          },
          {
            accepted: false,
            target: "<项目id>",
            message: "这是负责人的留言...",
            title: "bar",
            time: new Date() * 1 - 60, // change
          },
        ],
      };
      let requestRes = {
        status: 200,
        msg: "ok",
        data: [
          {
            target: "<项目id>",
            title: "baz",
            message: "<留言>",
            from: "<申请人id>",
            fromAvatar: "https://ui-avatars.com/api/?name=jack", // change
            fromName: "jack", // change
            time: new Date() * 1 - 800,
          },
          {
            target: "<项目id>",
            message: "<留言>",
            title: "foobar", // change
            from: "<申请人id>",
            fromAvatar: "https://ui-avatars.com/api/?name=rose", // change
            fromName: "rose", // change
            time: new Date() * 1 - 180,
          },
        ],
      };
      let rateRes = {
        status: 200,
        msg: "ok",
        data: [
          {
            rater: "123", // 发布评价的人, 如果设为 null 代表匿名
            raterName: "jack", // 发布评价的人的nickname, 如果设为 null 代表匿名
            raterAvatar: "https://ui-avatars.com/api/?name=jack",
            ratee: "456", // 被评价的人
            attitude: 3,
            capability: 4,
            personality: 5,
            description: "8太行", // 详细评价, 可为null
            time: new Date().getTime() - 60000,
          },
          {
            rater: "245", // 发布评价的人, 如果设为 null 代表匿名
            raterName: "rose", // 发布评价的人的nickname, 如果设为 null 代表匿名
            raterAvatar: "https://ui-avatars.com/api/?name=rose",
            ratee: "123", // 被评价的人
            attitude: 5,
            capability: 4,
            personality: 5,
            description: "整挺好", // 详细评价, 可为null
            time: new Date().getTime() - 10000,
          },
        ],
      }; */

      console.log(responses);

      responses.forEach((promise, ind) => {
        if (
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
