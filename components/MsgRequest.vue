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
      <BtnBlock :userID="msg.from"></BtnBlock>

      <v-btn icon>
        <v-icon>mdi-trash-can-outline</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import BtnChat from "~/components/BtnChat";
  import BtnBlock from "~/components/BtnBlock";

  import { timestampFmt } from "~/utils/time";

  export default {
    name: "MsgChat",
    components: { BtnChat, BtnBlock },
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
