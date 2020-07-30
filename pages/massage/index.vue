<template>
  <div>
    <div class="pt-2" v-for="(msg, ind) in massages" :key="ind">
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

  export default {
    transition: "layout",
    name: "index",
    head() {
      return {
        title: "",
        meta: [
          {
            hid: "description",
            name: "description",
            content: "",
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
      let massages = [];
      let msgRes = {
        status: 200,
        msg: "ok",
        data: [
          {
            from: "398ryib", // 发布评价的人
            fromName: "<nickname>", // 发布评价的人的nickname
            fromAvatar: "https://ui-avatars.com/api/?name=dpas", // 发布评价的人的avatar
            to: "fjhasv", // 被评价的人
            massage: "this is a message", // 详细内容
            time: new Date() * 1 - 200, // 发布的时间
          },
          {
            from: "398ryib", // 发布评价的人
            fromName: "<nickname>", // 发布评价的人的nickname
            fromAvatar: "https://ui-avatars.com/api/?name=dpas", // 发布评价的人的avatar
            to: "fjhasv", // 被评价的人
            massage: "this is another message", // 详细内容
            time: new Date() * 1 - 141123, // 发布的时间
          },
          {
            from: "398ryib", // 发布评价的人
            fromName: "<nickname>", // 发布评价的人的nickname
            fromAvatar: "https://ui-avatars.com/api/?name=dpas", // 发布评价的人的avatar
            to: "fjhasv", // 被评价的人
            massage: "this is not a message", // 详细内容
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
            massage: "这是负责人的留言...",
            title: "foo",
            time: new Date() * 1 - 400, // change
          },
          {
            accepted: false,
            target: "<项目id>",
            massage: "这是负责人的留言...",
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
            massage: "<留言>",
            from: "<申请人id>",
            fromAvatar: "https://ui-avatars.com/api/?name=jack", // change
            fromName: "jack", // change
            time: new Date() * 1 - 800,
          },
          {
            target: "<项目id>",
            massage: "<留言>",
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
      };
      [msgRes, responseRes, requestRes, rateRes].forEach(
        (res, ind) => {
          if (res && res.status == 200) {
            massages = massages.concat(
              res.data.map((obj) => ({ type: ind, data: obj }))
            );
          }
        }
      );

      massages = massages.sort((a, b) => {
        return b.data.time - a.data.time;
      });
      return { massages };
    },
  };
</script>

<style scoped lang="scss"></style>
