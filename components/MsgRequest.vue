<template>
  <v-card>
    <v-list-item @click="$router.push('/user?userID=' + msg.from)">
      <v-list-item-avatar size="50">
        <v-img :src="msg.fromAvatar"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline"
          >来自<strong>{{ msg.fromName }}</strong
          >的申请</v-list-item-title
        >
        <v-list-item-subtitle
          >申请加入项目
          <nuxt-link tag="i" :to="'/project?id=' + msg.target">{{
            msg.title
          }}</nuxt-link>
          <span class="float-right">{{
            timestampFmt(msg.time)
          }}</span>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-text>
      {{ msg.massage }}
    </v-card-text>

    <v-card-actions>
      <v-btn text color="success">
        同意
      </v-btn>
      <v-btn text color="error">
        拒绝
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn text color="deep-purple accent-4">
        拉黑
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-trash-can-outline</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import ChatBtn from "~/components/ChatBtn";

  import { timestampFmt } from "~/utils/time";

  export default {
    name: "MsgChat",
    components: { ChatBtn },
    data() {
      return {};
    },
    props: {
      msg: {
        type: Object,
        required: true,
      },
    },
    computed: {},
    watch: {},
    methods: { timestampFmt },
    created() {},
    mounted() {},
  };
</script>
<style scoped></style>
