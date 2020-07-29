<template>
  <div class="home">
    <v-row class="px-2 mb-n3">
      <!-- <v-select
        :items="picker"
        class="col-3"
        v-model="picked"
        solo
      ></v-select> -->
      <v-text-field
        v-model="keyword"
        rounded
        outlined
        append-icon="mdi-magnify"
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
    <v-tabs
      class="mt-2"
      v-model="tab"
      background-color="transparent"
      color="basil"
      grow
    >
      <v-tab>关注</v-tab>
      <v-tab>推荐</v-tab>
    </v-tabs>
    <v-row>
      <v-select
        :items="sortList"
        class="col-4"
        v-model="sortBy"
      ></v-select>
      <v-select
        :items="picker"
        class="col-4"
        v-model="picked"
      ></v-select>
      <v-select
        :items="picker"
        class="col-4"
        v-model="picked"
      ></v-select>
    </v-row>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card color="basil" flat>
          <Card
            v-for="(post, index) in allPosts"
            :key="index"
            :post="post"
          ></Card>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card color="basil" flat>
          <Card></Card>
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
        sortBy: "发布者评分",
        sortList: ["发布者评分", "项目人数", "开始时间"],
        order: "asc",
      };
    },
    computed: {},
    watch: {},
    methods: {},
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
