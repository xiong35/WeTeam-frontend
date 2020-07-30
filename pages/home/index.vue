<template>
  <div class="home">
    <v-row class="px-2 mb-n3">
      <v-text-field
        v-model="keyword"
        rounded
        outlined
        append-icon="mdi-magnify"
        @click:append="search"
        @keydown.enter="search"
        placeholder="请输入查找内容"
      >
        <template v-slot:prepend-inner>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                v-on="on"
                @click="
                  keywordCategory =
                    keywordCategory == '组队' ? '用户' : '组队'
                "
                >{{
                  keywordCategory == "组队"
                    ? "mdi-account-multiple"
                    : "mdi-account-question"
                }}</v-icon
              >
            </template>
            搜索{{ keywordCategory }}
          </v-tooltip>
        </template>
      </v-text-field>
    </v-row>
    <v-carousel
      cycle
      :show-arrows="false"
      hide-delimiter-background
      show-arrows-on-hover
      delimiter-icon="mdi-minus"
      height="190"
    >
      <v-carousel-item v-for="(slide, i) in images" :key="i">
        <v-row class="fill-height" align="center" justify="center">
          <v-img :src="slide" position="center"></v-img>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <v-row class="mt-4 align-center">
      <v-col class="col-8 pa-0">
        <v-tabs
          class="pl-3 pr-1"
          v-model="tab"
          background-color="transparent"
          color="basil"
          grow=""
        >
          <v-tab>关注</v-tab>
          <v-tab>推荐</v-tab>
        </v-tabs>
      </v-col>
      <v-btn outlined @click="dialog = true" class="mx-auto"
        >筛选排序</v-btn
      >
    </v-row>

    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">筛选条件</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-select
                  v-model="numberFilter"
                  :items="[
                    '不限',
                    '1~2人',
                    '3~5人',
                    '6~10人',
                    '10人以上',
                  ]"
                  outlined=""
                  label="项目人数"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="periodFilter"
                  outlined=""
                  :items="[
                    '不限',
                    '一周内',
                    '两周',
                    '一个月',
                    '三个月',
                    '半年',
                    '一年',
                    '一年以上',
                  ]"
                  multiple
                  chips
                  label="项目周期"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-select
                  outlined=""
                  v-model="typeFilter"
                  :items="[
                    '不限',
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
                  multiple
                  chips
                  label="项目类型"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-select
                  outlined=""
                  v-model="rankFilter"
                  :items="[
                    '不限',
                    '院级',
                    '校级',
                    '省级',
                    '国家级',
                  ]"
                  label="项目评级"
                  multiple
                  chips
                  :menu-props="{ top: true, offsetY: true }"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="mt-n12 pr-4">
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1 ma-3"
            text
            @click="dialog = false"
            >保存</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card flat>
          <Card
            v-for="(post, index) in allPosts"
            :key="index"
            :post="post"
          ></Card>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <Card
            v-for="(post, index) in allPosts"
            :key="index"
            :post="post"
          ></Card>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
  import Card from "~/components/Card";

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
    components: {
      Card,
    },
    data() {
      return {
        keywordCategory: "组队",
        keyword: "",
        images: [
          "https://upload-images.jianshu.io/upload_images/244174-453ee0e35add5aee.png?imageMogr2/auto-orient/strip|imageView2/2/w/741/format/webp",
          "http://static.xiong35.cn/image/placeHolder.gif",
          "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2801976318,4129713714&fm=15&gp=0.jpg",
        ],
        tab: 0,
        sortList: ["发布者评分", "项目人数", "开始时间"],
        dialog: false,
        periodFilter: ["不限"],
        typeFilter: ["不限"],
        rankFilter: ["不限"],
        numberFilter: "不限",
      };
    },
    computed: {},
    watch: {},
    methods: {
      search() {
        if (this.keywordCategory == "用户") {
          alert("暂不支持搜索用户QwQ");
          this.keywordCategory = "组队";
          return;
        }
        this.$router.push(
          `/home/search?kw=${this.keyword}&cat=${this.keywordCategory}`
        );
      },
    },
    created() {},
    mounted() {},
    async asyncData({ store, query }) {
      const data = [
        {
          title: "this is title",
          tags: ["foo", "bar"],
          beginDate: "2020/03/20",
          memberNum: 7,
          id: "98t6eihg",
        },
        {
          title: "this is title",
          tags: ["foo", "bar"],
          beginDate: "2020/08/20",
          memberNum: 7,
          id: "98t6eihg",
        },
        {
          title: "this is title",
          tags: ["foo"],
          beginDate: "2020/01/20",
          memberNum: 7,
          id: "98t6eihg",
        },
      ];
      return { allPosts: data };
    },
  };
</script>

<style scoped lang="scss"></style>
