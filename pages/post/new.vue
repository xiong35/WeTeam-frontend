<template>
  <v-card>
    <TopBar title="发布组队"></TopBar>
    <v-form class="pa-4 pt-7">
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
        label="项目类别"
        outlined
      ></v-select>
      <v-text-field
        label="项目名称"
        v-model="title"
        outlined=""
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
      ></v-textarea>

      <v-text-field
        label="项目人数"
        v-model="number"
        outlined=""
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
      ></v-select>
      <v-select
        v-model="rank"
        :items="['院级', '校级', '省级', '国家级']"
        label="项目评级"
        outlined=""
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
        title: "",
        dateMenu: false,
        date: "",
        description: "",
        number: "",
        period: "",
        rank: "",
      };
    },
    computed: {},
    watch: {},
    methods: {
      submit() {},
    },
    created() {},
    mounted() {},
    async asyncData({ store, query }) {},
  };
</script>

<style scoped lang="scss"></style>
