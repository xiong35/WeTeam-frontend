<template>
  <v-card min-height="80vh">
    <TopBar title="关于我们"> </TopBar>
    <div class="text-center">
      <v-avatar class="mt-8 mb-4" size="34vw">
        <v-img
          :src="require('~/assets/img/LOGO1.png')"
          alt="alt"
        />
      </v-avatar>
      <h1><i>WeTeam</i></h1>
      <small>v 1.0</small>
      <v-row class="pt-4 justify-center">
        <v-btn
          @click="handleClick('wechat')"
          class="ma-4"
          color="success"
          ><v-icon left>mdi-wechat</v-icon>官方微信</v-btn
        >
        <v-btn
          @click="handleClick('email')"
          dark
          class="ma-4"
          color="orange "
          ><v-icon left>mdi-email</v-icon>官方邮箱</v-btn
        >
      </v-row>
    </div>
    <v-snackbar timeout="1000" color="success" v-model="snackbar">
      已复制联系方式!
    </v-snackbar>
  </v-card>
</template>

<script>
  import TopBar from "~/components/TopBar";

  import { copy } from "~/utils/clipboard";

  export default {
    transition: "layout",
    name: "index",
    head() {
      return {
        title: "关于我们",
        meta: [
          {
            hid: "description",
            name: "description",
            content: "WeTeam: 关于我们",
          },
        ],
      };
    },
    components: { TopBar },
    data() {
      return {
        snackbar: false,
      };
    },
    computed: {},
    watch: {},
    methods: {
      handleClick(type) {
        let number = "";
        if (type === "wechat") {
          number = "6666";
        } else {
          number = "0000";
        }
        if (copy(number)) {
          this.snackbar = true;
        }
      },
    },
    created() {},
    mounted() {},
    async asyncData({ store, query }) {},
  };
</script>

<style scoped lang="scss"></style>
