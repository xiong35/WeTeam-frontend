<template>
  <v-stepper v-model="curStep" alt-labels>
    <v-stepper-header>
      <v-stepper-step step="1">输入基本信息</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="2">输入详细推文</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <h3 class="mb-3">完善基本信息</h3>
        <v-img class="mb-6" :aspect-ratio="2 / 1" :src="cover">
          <template v-slot:placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
              style="
                background-color: #eee;
                color: #999;
                border-radius: 3px;
              "
            >
              请上传封面
            </v-row>
          </template>
        </v-img>
        <v-form ref="form" lazy-validation>
          <v-file-input
            ref="fileInput"
            :rules="[
              (value) =>
                !value ||
                value.size < 10000000 ||
                '封面大小不能超过 10 MB!',
            ]"
            accept="image/png, image/jpeg, image/jpg, image/bmp"
            label="上传推文封面"
            v-model="coverFile"
            @change="uploadCover"
          ></v-file-input>
          <v-textarea
            label="活动简介"
            :rules="[
              (v) => {
                return !!v || '活动简介不能为空';
              },
            ]"
            required
            clearable
            v-model="brief"
          ></v-textarea>
        </v-form>
        <v-btn
          color="primary"
          class="float-right"
          @click="validate"
        >
          下一步
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <h3 class="mb-3">请输入完整推文内容</h3>
        <mavon-editor
          class="mavon-editor"
          :toolbars="mavonConfig"
          v-model="content"
          defaultOpen="edit"
          :subfield="false"
          placeholder="请输入完整推文内容. (支持markdown, latex)"
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
  import { mavonConfig, MY_BASE_URL } from "~/assets/data";

  import { POST, upload } from "~/network/methods";

  export default {
    transition: "layout",
    name: "singUp",
    head() {
      return {
        title: "注册",
        meta: [
          {
            hid: "description",
            name: "description",
            content: "WeTeam 的用户注册页面",
          },
        ],
      };
    },
    components: {},
    data() {
      return {
        curStep: 1,
        cover: "",
        brief: "",
        coverFile: null,
        content: "",
        mavonConfig,
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

      async uploadCover(e) {
        let formData = new FormData(); //创建form对象
        formData.append("file", this.coverFile); //通过append向form对象添加数据

        let res = await upload("/img/acticity", formData);

        this.cover = MY_BASE_URL + res.data.url.slice(1);
      },

      async submit() {
        let { cover, brief, content } = this;

        let res = await POST("/projectTheme", {
          publisherToken: this.$store.state.token,
          brief,
          content,
          cover,
        });

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
