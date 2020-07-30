<template>
  <v-card>
    <v-list-item>
      <v-list-item-avatar>
        <v-img :src="msg.fromAvatar"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline"
          >来自{{ msg.fromName }}的申请</v-list-item-title
        >
        <v-list-tile-sub-title
          >申请加入项目: {{ msg.title }}</v-list-tile-sub-title
        >
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
