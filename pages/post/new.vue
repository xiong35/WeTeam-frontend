<template>
  <v-card>
    <TopBar title="发布组队"></TopBar>
    <v-form lazy-validation class="pa-4 pt-7">
      <v-select
        :items="[
          '科技大赛',
          '设计比赛',
          'IT应用开发',
          '创业大赛',
          '财汇金融',
          '营销策划',
          '影视摄影',
          '广告创意',
          '公益大赛',
          '学科学术',
          '其他',
        ]"
        v-model="type"
        multiple
        chips
        label="项目类别(多选)"
        outlined
        :rules="[(v) => v.length > 0 || '请选择项目类别']"
      ></v-select>
      <v-text-field
        label="项目名称"
        v-model="title"
        outlined=""
        :rules="[(v) => !!v || '请填写项目名称']"
      ></v-text-field>
      <v-menu
        ref="menu"
        v-model="dateMenu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="项目开始时间"
            readonly
            v-bind="attrs"
            v-on="on"
            outlined=""
            :rules="[(v) => !!v || '请填写项目开始时间']"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          locale="zh-cn"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false"
            >取消</v-btn
          >
          <v-btn
            text
            color="primary"
            @click="$refs.menu.save(date)"
            >确定</v-btn
          >
        </v-date-picker>
      </v-menu>
      <v-textarea
        label="项目简介"
        outlined=""
        v-model="description"
        :rules="[(v) => !!v || '请填写项目简介']"
      ></v-textarea>

      <v-text-field
        label="项目人数"
        v-model="number"
        outlined=""
        :rules="[
          (v) => !!v || '请填写项目人数',
          (v) => !!Number(v) || '请输入数字',
        ]"
      ></v-text-field>
      <v-select
        v-model="period"
        :items="[
          '一周内',
          '两周',
          '一个月',
          '三个月',
          '半年',
          '一年',
          '一年以上',
        ]"
        outlined=""
        label="项目周期"
        :rules="[(v) => !!v || '请选择项目周期']"
      ></v-select>
      <v-textarea
        label="技能要求"
        outlined=""
        v-model="skill"
        :rules="[(v) => !!v || '请填写技能要求']"
      ></v-textarea>
      <v-select
        :items="['20级', '19级', '18级', '17级', '16级']"
        v-model="grade"
        label="年级要求(多选)"
        outlined
        multiple
        chips
        :rules="[(v) => v.length > 0 || '请选择年级']"
      ></v-select>
      <v-autocomplete
        v-model="major"
        :items="majors"
        outlined=""
        label="专业要求(多选)"
        multiple
        chips
        :rules="[(v) => v.length > 0 || '请选择专业']"
        :menu-props="{ top: true, offsetY: true }"
      ></v-autocomplete>
      <v-select
        v-model="rank"
        :items="['院级', '校级', '省级', '国家级']"
        label="项目评级"
        outlined=""
        :rules="[(v) => !!v || '请填写项目评级']"
        :menu-props="{ top: true, offsetY: true }"
      ></v-select>
    </v-form>
    <v-card-actions class="mt-n4 pr-4">
      <v-spacer></v-spacer>
      <v-btn
        outlined
        color="primary"
        @click="submit"
        class="ma-4 mt-n4"
        >提交</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
  import TopBar from "~/components/TopBar";

  import { majors } from "~/assets/data";
  import { POST } from "~/network/methods";
  import { checkSignIn } from "~/utils/validate";

  export default {
    transition: "layout",
    name: "index",
    head() {
      return {
        title: "",
        meta: [
          {
            hid: "description",
            name: "description",
            content: "",
          },
        ],
      };
    },
    components: { TopBar },
    data() {
      return {
        type: [],
        title: "联创夏令营",
        grade: ["19级"],
        dateMenu: false,
        date: "",
        description: "联创团队举办的夏令营, 可以学到很多知识",
        number: "7",
        period: "",
        rank: "",
        major: [],
        skill: "精通c++, java, lisp, brainfuck",
        majors,
      };
    },
    computed: {},
    watch: {},
    methods: {
      async submit() {
        let {
          type,
          title,
          rank,
          major,
          period,
          date,
          description,
          number,
          grade,
          skill,
        } = this;

        let { token, userInfo } = this.$store.state;
        let { userID } = userInfo;

        grade = grade.join(",");

        let data = {
          token,
          publisher: userID,
          title,
          type,
          rank,
          major,
          period,
          beginDate: date.split("-").join("/"),
          description,
          memberNum: number * 1,
          grade,
          skill,
          members: [],
        };

        let res = await POST("/project", data);

        let { id } = res.data;

        alert("提交成功!");

        this.$router.push("/project?id=" + id);
      },
    },
    created() {},
    mounted() {
      checkSignIn(this);
    },
    async asyncData({ store, query }) {},
  };
</script>

<style scoped lang="scss"></style>
