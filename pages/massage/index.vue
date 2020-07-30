<template>
  <div>
    <div class="pt-2" v-for="(msg, ind) in massages" :key="ind">
      <MsgChat :msg="msg.data" v-if="msg.type == 0"></MsgChat>
    </div>
  </div>
</template>

<script>
  import MsgChat from "~/components/MsgChat";

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
    components: { MsgChat },
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
            massage: "<留言>",
            title: "foo",
            time: new Date() * 1 - 400, // change
          },
          {
            accepted: false,
            target: "<项目id>",
            massage: "<留言>",
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
            title: "foobar",
            massage: "<留言>",
            from: "<申请人id>",
            time: new Date() * 1 - 800,
          },
        ],
      };
      [msgRes, responseRes, requestRes].forEach((res, ind) => {
        if (res && res.status == 200) {
          massages = massages.concat(
            res.data.map((obj) => ({ type: ind, data: obj }))
          );
        }
      });

      massages = massages.sort((a, b) => {
        return b.data.time - a.data.time;
      });
      console.log(massages);
      return { massages };
    },
  };
</script>

<style scoped lang="scss"></style>
