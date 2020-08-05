<template>
  <v-card
    class="info-card"
    :style="{ opacity: msg.isChecked ? 0.4 : 1 }"
  >
    <v-list-item
      @click="$router.push('/project?id=' + msg.target)"
    >
      <v-list-item-content>
        <v-list-item-title class="headline"
          >来自项目<strong>{{ msg.title }}</strong
          >的回复</v-list-item-title
        >
        <v-list-item-subtitle
          >{{ result }}

          <span class="float-right">{{
            timestampFmt(msg.time)
          }}</span>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-text>
      {{ msg.message }}
    </v-card-text>

    <v-card-actions>
      <v-btn text to="/home">
        看看别的项目
      </v-btn>
      <v-spacer></v-spacer>
      <BtnCheck
        :id="msg.id"
        type="response"
        :is-checked="msg.isChecked"
        @change="toggleCheck"
      ></BtnCheck>
    </v-card-actions>
  </v-card>
</template>

<script>
  import BtnChat from "~/components/BtnChat";
  import BtnCheck from "~/components/BtnCheck";

  import { timestampFmt } from "~/utils/time";

  export default {
    name: "MsgChat",
    components: { BtnChat, BtnCheck },
    data() {
      return {};
    },
    props: {
      msg: {
        type: Object,
        required: true,
      },
    },
    computed: {
      result() {
        if (this.msg.accepted) {
          return "你成功加入这个项目了😝";
        } else {
          return "很遗憾, 你被拒绝了😥";
        }
      },
    },
    watch: {},
    methods: {
      timestampFmt,
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
