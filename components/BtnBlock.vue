<template>
  <v-btn @click="block" text color="deep-purple accent-4">
    拉黑
  </v-btn>
</template>

<script>
  export default {
    name: "BtnBlock",
    components: {},
    data() {
      return {};
    },
    props: {
      userID: {
        type: Number,
        reruired: true,
      },
    },
    computed: {},
    watch: {},
    methods: {
      block() {
        if (
          confirm(
            "确定将此用户加入黑名单吗?(你将不会收到他的任何消息)"
          )
        ) {
        }
      },
    },
    created() {},
    mounted() {},
  };
</script>
<style scoped></style>
