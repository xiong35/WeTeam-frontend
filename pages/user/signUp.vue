<template>
  <v-stepper v-model="curStep" alt-labels>
    <v-stepper-header>
      <v-stepper-step :complete="curStep > 1" step="1"
        >输入账号密码</v-stepper-step
      >

      <v-divider></v-divider>

      <v-stepper-step step="2">完善基本信息</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3"
        >完善简历<small>可选</small></v-stepper-step
      >
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <h3 class="mb-3">输入账号密码</h3>
        <v-form ref="form1" v-model="page1Valid" lazy-validation>
          <v-text-field
            label="账号"
            outlined
            required
            clearable
            :rules="[(v) => !!v || '请填写账号']"
            autofocus
            v-model="account"
          ></v-text-field>
          <v-text-field
            label="用户名"
            outlined
            required
            clearable
            :rules="[(v) => !!v || '请填写用户名']"
            v-model="nickname"
          ></v-text-field>
          <v-text-field
            label="密码"
            outlined
            :rules="[
              (v) => !!v || '请填写密码',
              (v) => v.length >= 6 || '密码至少需要6位',
            ]"
            required
            counter
            clearable
            v-model="pw"
          ></v-text-field>
          <v-text-field
            label="确认密码"
            outlined
            :rules="[(v) => v === pw || '两次密码不一致']"
            required
            clearable
            v-model="pwConfirm"
          ></v-text-field>
        </v-form>
        <v-btn
          color="primary"
          class="float-right"
          outlined
          @click="validate(2)"
        >
          下一步
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <h3 class="mb-3">完善基本信息</h3>
        <v-form ref="form2" v-model="page2Valid" lazy-validation>
          <v-row>
            <v-col class="col-9">
              <v-file-input
                :rules="[
                  (value) =>
                    !value ||
                    value.size < 6000000 ||
                    '头像大小不能超过 6 MB!',
                ]"
                accept="image/png, image/jpeg, image/jpg, image/bmp"
                placeholder="选择头像"
                label="选择头像"
                v-model="avatarFile"
                outlined
                :prepend-icon="null"
              ></v-file-input>
            </v-col>
            <v-col class="col-3">
              <v-img
                :src="avatar || defaultAvatar"
                alt=""
                aspect-ratio="1"
              ></v-img>
            </v-col>
          </v-row>
          <v-select
            label="性别"
            outlined
            :items="['保密', '男生', '女生']"
            v-model="gender"
          ></v-select>
          <v-text-field
            label="校园卡号"
            outlined
            :rules="[
              (v) => {
                let reg = /\w\d{9}/;
                return reg.test(v) || '校园卡号格式错误';
              },
            ]"
            required
            clearable
            v-model="schoolID"
          ></v-text-field>
          <v-autocomplete
            :items="majors"
            v-model="major"
            label="专业(拼音排列)"
            validate-on-blur
            outlined
            clearable
            :rules="[(v) => !!v || '请选择专业']"
          ></v-autocomplete>
          <v-select
            :items="[
              '大一',
              '大二',
              '大三',
              '大四',
              '研究生',
              '博士生',
            ]"
            v-model="grade"
            label="年级"
            outlined
            :rules="[(v) => !!v || '请选择年级']"
          ></v-select>
        </v-form>
        <v-btn
          color="primary"
          class="float-right"
          outlined
          @click="validate(3)"
        >
          下一步
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <h3 class="mb-3">请补充你的简历信息</h3>
        <mavon-editor
          class="mavon-editor"
          :toolbars="mavonConfig"
          v-model="resume"
          defaultOpen="edit"
          subfield="false"
          placeholder="请编写你的简历, 让更多人了解你. (支持markdown, latex)"
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
          @click="curStep = 2"
        >
          上一步
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
  import { majors, mavonConfig } from "~/assets/data";

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
        account: "",
        nickname: "",
        pw: "",
        pwConfirm: "",
        page1Valid: true,
        avatar: "",
        gender: "保密",
        description: "",
        schoolID: "",
        majors,
        major: "",
        grade: "",
        avatarFile: null,
        page2Valid: true,
        resume: "",
        mavonConfig,
      };
    },
    computed: {
      defaultAvatar() {
        let randInt = ~~(Math.random() * 119);
        return `http://static.xiong35.cn/image/icons/Emojious/${randInt}.png`;
      },
    },
    watch: {},
    methods: {
      validate(next) {
        if (this.$refs["form" + (next - 1)].validate()) {
          this.curStep = next;
        }
      },
      submit() {},
    },
    created() {},
    mounted() {},
    async asyncData({ store, query }) {},
  };
</script>

<style scoped lang="scss"></style>
