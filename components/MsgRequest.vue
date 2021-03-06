<template>
  <v-card
    class="info-card"
    :style="{ opacity: msg.isChecked ? 0.4 : 1 }"
  >
    <v-list-item
      @click.self="$router.push('/user?userID=' + msg.from)"
    >
      <v-list-item-avatar size="50">
        <v-img :src="msg.fromAvatar"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title
          >来自<strong>{{ msg.fromName }}</strong
          >的申请</v-list-item-title
        >
        <v-list-item-subtitle
          >申请加入项目<nuxt-link
            :to="'/project?id=' + msg.target"
            >{{ msg.title }}</nuxt-link
          >
          <span class="float-right">{{
            timestampFmt(msg.time)
          }}</span>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-text class="py-1">
      {{ msg.message }}
    </v-card-text>

    <v-card-actions>
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :close-on-click="false"
        min-width="70%"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            text
            @click="accepted = true"
            color="success"
            v-bind="attrs"
            v-on="on"
          >
            同意
          </v-btn>
          <v-btn
            text
            @click="accepted = false"
            color="error"
            v-bind="attrs"
            v-on="on"
          >
            拒绝
          </v-btn>
        </template>

        <v-card class="pa-3">
          <v-textarea
            label="输入留言"
            v-model="sendMsg"
          ></v-textarea>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text @click="menu = false">取消</v-btn>
            <v-btn color="primary" text @click="submit"
              >发送</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-menu>
      <v-spacer></v-spacer>
      <BtnBlock :userID="msg.from"></BtnBlock>

      <BtnCheck
        :id="msg.id"
        type="request"
        :is-checked="msg.isChecked"
        @change="toggleCheck"
      ></BtnCheck>
    </v-card-actions>
  </v-card>
</template>

<script>
  import BtnChat from "~/components/BtnChat";
  import BtnBlock from "~/components/BtnBlock";
  import BtnCheck from "~/components/BtnCheck";

  import { timestampFmt } from "~/utils/time";
  import { POST } from "~/network/methods";

  export default {
    name: "MsgChat",
    components: { BtnChat, BtnBlock, BtnCheck },
    data() {
      return {
        menu: false,
        sendMsg: "",
        accepted: false,
      };
    },
    props: {
      msg: {
        type: Object,
        required: true,
      },
    },
    computed: {},
    watch: {},
    methods: {
      timestampFmt,
      async submit() {
        if (
          !confirm(
            `你确定要${
              this.accepted ? "同意" : "拒绝"
            }此人的申请吗?`
          )
        ) {
          return;
        }
        let { accepted, sendMsg } = this;
        let { token, userInfo } = this.$store.state;
        let userID = userInfo.userID;

        let { title, target, from } = this.msg;

        let res = await POST("/message/joinResponse", {
          token,
          accepted,
          title,
          from,
          target,
          message: sendMsg,
        });

        if (res) {
          this.toggleCheck("yes");
          alert((this.accepted ? "同意" : "拒绝") + "成功!");
        }
        this.menu = false;
      },

      toggleCheck(state) {
        if (state) {
          this.msg.isChecked = state == "yes" ? true : false;
          return;
        }
        this.msg.isChecked = !this.msg.isChecked;
      },
    },
    created() {},
    mounted() {},
  };
</script>
<style scoped></style>
