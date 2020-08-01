<template>
  <v-card flat>
    <TopBar class="mb-4" title="搜索结果"></TopBar>
    <Card
      v-for="(post, index) in posts"
      :post="post"
      :key="index"
    ></Card>
  </v-card>
</template>

<script>
  import { GET } from "~/network/methods";

  import Card from "~/components/Card";
  import TopBar from "~/components/TopBar";

  export default {
    transition: "layout",
    name: "index",
    head() {
      return {
        title: "搜索结果",
        meta: [
          {
            hid: "description",
            name: "description",
            content: "搜索结果",
          },
        ],
      };
    },
    components: { Card, TopBar },
    data() {
      return {};
    },
    computed: {},
    watch: {},
    methods: {},
    created() {},
    mounted() {},
    async asyncData({ store, query }) {
      if (query.cat === "组队") {
        var res = await GET("/project?keyword=" + query.kw);
      }

      return { posts: res.data };
    },
  };
</script>

<style scoped lang="scss"></style>
