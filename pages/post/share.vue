<template>
  <v-stepper v-model="curStep" alt-labels>
    <v-stepper-header>
      <v-stepper-step step="1">输入基本信息</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="2">输入详细内容</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <h3 class="mb-3">输入基本信息</h3>
        <v-form ref="form" lazy-validation>
          <v-textarea
            label="分享简介"
            :rules="[
              (v) => {
                return !!v || '分享简介不能为空';
              },
            ]"
            required
            clearable
            v-model="brief"
          ></v-textarea>
          <v-select
            :items="categories"
            v-model="categoty"
            multiple
            chips
            :menu-props="{ top: true, offsetY: true }"
            label="请选择分享主题"
          ></v-select>
        </v-form>
        <v-btn
          color="primary"
          class="float-right"
          @click="validate"
        >
          下一步
        </v-btn>
      </v-stepper-content>

      <v-stepper-content class="px-1" step="2">
        <h3 class="mb-3 px-3">请输入完整分享内容</h3>
        <mavon-editor
          ref="$md"
          @imgAdd="uploadImg"
          class="mavon-editor"
          :toolbars="mavonConfig"
          v-model="content"
          defaultOpen="edit"
          :subfield="false"
          placeholder="请输入完整推文内容. (支持markdown, latex, 图片上传)"
        />
        <v-btn
          color="primary"
          class="float-right ma-2"
          outlined
          @click="submit"
        >
          完成
        </v-btn>
        <v-btn
          class="float-right ma-2"
          outlined
          @click="curStep = 1"
        >
          上一步
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
  import {
    mavonConfig,
    MY_BASE_URL,
    categories,
  } from "~/assets/data";

  import { POST, upload } from "~/network/methods";

  export default {
    transition: "layout",
    name: "singUp",
    head() {
      return {
        title: "发布分享",
        meta: [
          {
            hid: "description",
            name: "description",
            content: "WeTeam 的发布分享页面",
          },
        ],
      };
    },
    components: {},
    data() {
      return {
        curStep: 1,
        brief: "",
        coverFile: null,
        content: "",
        mavonConfig: {
          ...mavonConfig,
          imagelink: true,
        },
        categories,
        categoty: [],
        img_file: {},
        hint: true,
      };
    },
    computed: {},
    watch: {},
    methods: {
      validate() {
        if (this.$refs.form.validate()) {
          this.curStep = 2;
        }
      },

      async uploadImg(pos, $file) {
        let formData = new FormData();
        formData.append("file", $file);

        let res = await upload("/img/acticity", formData);

        if (res && res.status == 200) {
          let url = MY_BASE_URL + res.data.url.slice(1);
          this.$refs.$md.$img2Url(pos, url);
          if (this.hint) {
            this.hint = false;
            alert(
              "上传之后自动插入图片的链接, 可以点右上角的眼睛查看预览效果"
            );
          }
        }
      },

      async submit() {
        let { categoty, brief, content } = this;

        let res = await POST(
          "/share",
          {
            publisherToken: this.$store.state.token,
            brief,
            content,
            categoty,
          },
          "application/json"
        );

        if (res) {
          alert("发布成功!");
          this.$router.push("/home");
        }
      },
    },
    created() {
      let { userInfo, token } = this.$store.state;
      if (!userInfo || !token) {
        this.$router.replace("/user/login?hint=true");
      }
    },
    mounted() {},
    async asyncData({ store, query }) {},
  };
</script>

<style scoped lang="scss"></style>
