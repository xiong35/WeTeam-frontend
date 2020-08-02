<template>
  <v-card flat>
    <v-row class="pa-4 pb-1 mb-n3">
      <v-text-field
        v-model="kw"
        rounded
        dense
        outlined
        append-icon="mdi-magnify"
        @click:append="search"
        @keydown.enter="search"
        placeholder="请输入查找内容"
      >
      </v-text-field>
    </v-row>
    <v-tabs
      class="pl-3 pr-1"
      v-model="tab"
      background-color="transparent"
      color="basil"
    >
      <v-tab>组队</v-tab>
      <v-tab>用户</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card flat>
          <Card
            v-for="(post, index) in posts"
            :post="post"
            :key="index"
          ></Card>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <UserList :users="users"></UserList>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
  import { GET } from "~/network/methods";

  import Card from "~/components/Card";
  import UserList from "~/components/UserList";

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
    components: { Card, UserList },
    data() {
      return {
        kw: "",
        posts: [],
        users: [],
        tab: 0,
      };
    },
    computed: {},
    watch: {
      tab() {
        this.search();
      },
    },
    methods: {
      async search() {
        let { kw, tab } = this;
        if (tab == 0) {
          let res = await GET("/project?keyword=" + kw);
          this.posts = res.data;
        } else if (tab == 1) {
          let res = await GET("/user/search?keyword=" + kw);
          this.users = res.data;
        }
      },
    },
    created() {},
    mounted() {},
    async asyncData({ store, query }) {
      let { kw } = query;
      let res = await GET("/project?keyword=" + kw);

      return { posts: res.data, kw };
    },
  };
</script>

<style scoped lang="scss"></style>
