<template>
  <v-card>
    <v-list-item @click="$router.push('/user?userID=' + msg.from)">
      <v-list-item-avatar>
        <v-img :src="msg.fromAvatar"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline"
          >来自<strong>{{ msg.fromName }}</strong
          >的留言</v-list-item-title
        >
      </v-list-item-content>
    </v-list-item>

    <v-card-text>
      {{ msg.massage }}
    </v-card-text>

    <v-card-actions>
      <ChatBtn text="回复留言" userID="adf"></ChatBtn>
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
    methods: {},
    created() {},
    mounted() {},
  };
</script>
<style scoped></style>
