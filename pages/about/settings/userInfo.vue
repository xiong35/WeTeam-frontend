<template
  ><div>
    <TopBar title="修改信息"></TopBar>
    <v-card class="userinfo pa-3">
      <v-form ref="form" v-model="isValid" lazy-validation>
        <v-text-field
          label="昵称"
          :rules="[
            (v) => {
              return !!v || '请填写昵称';
            },
          ]"
          required
          clearable
          v-model="nickname"
        ></v-text-field>
        <v-row>
          <v-col class="col-9">
            <v-file-input
              :rules="[
                (v) =>
                  !v ||
                  v.size < 6000000 ||
                  '头像大小不能超过 6 MB!',
                (v) => {
                  return (
                    !v ||
                    !!~accept.indexOf(v.type) ||
                    '请选择正确的格式'
                  );
                },
              ]"
              :accept="accept"
              label="选择头像"
              v-model="avatarFile"
              @change="uploadAvatar"
              :prepend-icon="null"
            ></v-file-input>
          </v-col>
          <v-col class="col-3">
            <v-img
              :src="avatar || defaultAvatar"
              alt=""
              @click="genNumber"
              aspect-ratio="1"
            ></v-img>
          </v-col>
        </v-row>
        <v-select
          label="性别"
          :items="['保密', '男生', '女生']"
          v-model="gender"
        ></v-select>
        <v-text-field
          label="校园卡号"
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
        <v-textarea
          label="个人简介"
          :rules="[
            (v) => {
              return !!v || '个人简介不能为空QwQ';
            },
          ]"
          required
          clearable
          v-model="description"
        ></v-textarea>
        <v-autocomplete
          :items="majors"
          v-model="major"
          label="专业(拼音排列)"
          validate-on-blur
          clearable
          :rules="[(v) => !!v || '请选择专业']"
        ></v-autocomplete>
        <v-select
          :items="categories"
          v-model="interests"
          label="兴趣爱好"
          validate-on-blur
          clearable
          multiple
          chips
          :rules="[(v) => !!v.length || '请选择兴趣']"
        ></v-select>
        <v-select
          :items="['20级', '19级', '18级', '17级', '16级']"
          v-model="grade"
          label="年级"
          :menu-props="{ top: true, offsetY: true }"
          :rules="[(v) => !!v || '请选择年级']"
        ></v-select>
      </v-form>
      <v-row class="pa-3">
        <v-spacer></v-spacer>
        <v-btn color="primary" outlined @click="submit">
          提交
        </v-btn>
      </v-row>
    </v-card>
  </div>
</template>

<script>
  import TopBar from "~/components/TopBar";

  import { majors, categories, MY_BASE_URL } from "~/assets/data";
  import { POST, GET, upload, PUT } from "~/network/methods";
  import { refreshTo } from "~/utils/validate";

  export default {
    name: "userInfo",
    components: {
      TopBar,
    },
    head() {
      return {
        title: "修改信息",
        meta: [
          {
            hid: "description",
            name: "description",
            content: "WeTeam 的修改信息界面",
          },
        ],
      };
    },
    data() {
      return {
        nickname: "",
        avatar: "",
        gender: "",
        description: "",
        schoolID: "",
        majors,
        major: "",
        grade: "",
        avatarFile: null,
        isValid: false,
        resume: "",
        avatarID: 0,
        categories,
        interests: [],
        accept: [
          "image/png",
          "image/jpeg",
          "image/jpg",
          "image/bmp",
        ],
      };
    },
    computed: {
      defaultAvatar() {
        this.genNumber();
        return `http://static.xiong35.cn/image/icons/Emojious/${this.avatarID}.png`;
      },
    },
    watch: {},
    methods: {
      async uploadAvatar(e) {
        if (!e || !~this.accept.indexOf(e.type)) {
          return;
        }
        let formData = new FormData(); //创建form对象
        formData.append("file", e); //通过append向form对象添加数据

        let res = await upload("/img/avatar", formData);

        this.avatar = MY_BASE_URL + res.data.url.slice(1);
      },

      genNumber() {
        this.avatarID = ~~(Math.random() * 119);
      },

      async submit() {
        if (!this.$refs.form.validate()) {
          return;
        }

        let {
          avatar,
          nickname,
          gender,
          description,
          schoolID,
          major,
          grade,
          defaultAvatar,
          interests,
        } = this;

        grade = parseInt(grade);

        let data = {
          token: this.$store.state.token,
          avatar: avatar || defaultAvatar,
          nickname,
          gender,
          description,
          schoolID,
          major,
          grade,
          interest: interests.join(","),
        };

        let res = await PUT("/user/info", data);

        if (res) {
          alert("成功修改信息!");
          refreshTo("/about");
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
    asyncData({ store, query, redirect }) {
      return {
        ...store.state.userInfo,
        grade: store.state.userInfo.grade + "级",
      };
    },
  };
</script>
<style scoped></style>
