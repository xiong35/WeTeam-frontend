<template>
  <v-card>
    <TopBar title="反馈"></TopBar>
    <v-form ref="form">
      <v-select
        class="ma-4 pt-8"
        :items="[
          '我要吐槽产品经理的设计￣へ￣',
          'Bug反馈，速速解决(ﾒ｀ﾛ´)/',
        ]"
        v-model="type"
        label="选择类别"
      ></v-select>
      <v-textarea
        class="ma-4 mb-0 pt-4"
        label="请输入你的意见或建议"
        v-model="content"
        placeholder="请尽量详细的描述您的问题。例如：在哪个页面，出现了什么问题，有什么错误提示。我们将尽快给您回复。"
        :rules="[(v) => !!v || '请填写反馈内容']"
      ></v-textarea>
    </v-form>
    <v-subheader>上传反馈图片</v-subheader>
    <v-row class="px-4 align-center text-center">
      <v-col
        v-for="(img, index) in imgs"
        :key="index"
        class="col-4 pa-2"
      >
        <v-img
          :aspect-ratio="1 / 1"
          position="center"
          :src="img"
        ></v-img>
      </v-col>
      <v-col @click="uploadFile" class="pa-2 col-4">
        <v-img
          :aspect-ratio="1 / 1"
          position="center"
          :src="require('~/assets/img/choose-img.png')"
        ></v-img>
      </v-col>
    </v-row>
    <v-row class="pa-3 text-center">
      <v-btn
        @click="submit"
        class="ma-auto"
        large
        color="primary"
        outlined
        >提交</v-btn
      >
    </v-row>
  </v-card>
</template>

<script>
  import TopBar from "~/components/TopBar";

  import { upload, POST } from "~//network/methods";
  import { MY_BASE_URL, ADMIN_ID } from "~/assets/data";

  export default {
    transition: "layout",
    name: "index",
    head() {
      return {
        title: "反馈",
        meta: [
          {
            hid: "description",
            name: "description",
            content: "WeTeam 的反馈界面",
          },
        ],
      };
    },
    components: {
      TopBar,
    },
    data() {
      return {
        content: "",
        imgs: [],
        type: "我要吐槽产品经理的设计￣へ￣",
      };
    },
    computed: {},
    watch: {},
    methods: {
      async submit() {
        if (!this.$refs.form.validate()) {
          return;
        }

        let { type, content } = this;

        let imgs = this.imgs.map((url, ind) => {
          return `\n![feedback_img_${ind}](${url})`;
        });
        let message = `# 反馈\n\n## ${type}\n\n${content}\n${imgs}`;

        let res = await POST("/user/chat", {
          token: this.$store.state.token,
          from: this.$store.state.userInfo.userID,
          to: ADMIN_ID,
          message,
        });

        if (res) {
          alert("提交成功, 感谢您的反馈, 我们会尽快处理 QwQ");
          this.$router.push("/abnout/settings");
        }
      },

      async uploadFile() {
        let file = await this.selectFile();

        let formData = new FormData(); //创建form对象
        formData.append("file", file); //通过append向form对象添加数据

        let res = await upload("/img/acticity", formData);
        console.log(res);

        this.imgs.push(MY_BASE_URL + res.data.url.slice(1));
      },

      selectFile() {
        return new Promise((res, rej) => {
          const el = document.createElement("input");
          el.type = "file";
          el.accept = "image/*";
          el.multiple = false;
          el.addEventListener("change", (_) => {
            res(el.files[0]);
          });
          el.click();
        });
      },
    },
    created() {},
    mounted() {},
    async asyncData({ store, query }) {},
  };
</script>

<style scoped lang="scss"></style>
