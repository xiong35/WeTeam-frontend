<template>
  <v-card flat class="text-center">
    <TopBar :title="title"></TopBar>
    <mavon-editor
      v-if="!self"
      class="article-content"
      :value="content"
      :subfield="false"
      :defaultOpen="'preview'"
      :toolbarsFlag="false"
      :editable="false"
      :codeStyle="'atom-one-dark'"
      :scrollStyle="true"
      :boxShadow="false"
      :tabSize="4"
    ></mavon-editor>
    <mavon-editor
      v-else
      class="mavon-editor"
      :toolbars="mavonConfig"
      v-model="resume"
      defaultOpen="edit"
      :subfield="false"
      placeholder="请编写你的简历, 让更多人了解你. (支持markdown, latex)"
    />
    <v-btn
      class="mx-auto mt-6"
      v-if="self"
      @click="submit"
      color="primary"
      outlined
      >提交</v-btn
    >
  </v-card>
</template>

<script>
  import TopBar from "~/components/TopBar";

  import { GET, PUT } from "~/network/methods";
  import { mavonConfig } from "~/assets/data";

  export default {
    transition: "layout",
    name: "index",
    head() {
      return {
        title: this.title,
        meta: [
          {
            hid: "description",
            name: "description",
            content: this.title,
          },
        ],
      };
    },
    components: {
      TopBar,
    },
    data() {
      return {
        resume: "",
        mavonConfig,
      };
    },
    computed: {
      title() {
        if (this.nickname) {
          return this.nickname + "的简历";
        }
        return "简历";
      },
    },
    watch: {},
    methods: {
      async submit() {
        let { resume } = this;
        let { token } = this.$store.state;
        let res = await PUT("/user/resume", { resume, token });
        if (res && res.status == 200) {
          alert("修改成功!");
        }
      },
    },
    created() {},
    mounted() {},
    async asyncData({ store, query }) {
      let self = false;

      let { userID, nickname } = query;
      if (!userID) {
        this.$router.replace("/404");
      }

      let res = await GET("/user/resume?userID=" + userID);

      let userInfo = store.state.userInfo;
      if (
        userInfo &&
        userInfo.userID &&
        userInfo.userID == userID
      ) {
        self = true;
        return {
          resume: (res && res.data && res.data.resume) || "",
          self,
          nickname,
        };
      }

      return {
        content: (res && res.data && res.data.resume) || "",
        self,
        nickname,
      };
    },
  };
</script>

<style scoped lang="scss"></style>
