<template>
  <div>
    <TopBar :title="title"></TopBar>
    <Card :post="post" v-for="(post, index) in posts" :key="index">
    </Card>
  </div>
</template>

<script>
  import Card from "~/components/Card";
  import TopBar from "~/components/TopBar";

  import { GET } from "~/network/methods";

  export default {
    transition: "layout",
    name: "index",
    head() {
      return {
        title: this.title,
        meta: [
          {
            hid: "description",
            name: "description",
            content: this.title,
          },
        ],
      };
    },
    components: { Card, TopBar },
    data() {
      return {};
    },
    validate({ store, redirect }) {
      if (!store.state.token || !store.state.userInfo) {
        return redirect("/user/login?hint=true");
      }
      return true;
    },
    computed: {
      title() {
        return this.$store.state.userInfo.nickname + "的浏览记录";
      },
    },
    watch: {},
    methods: {},
    created() {},
    mounted() {},
    async asyncData({ store, query, redirect }) {
      let res = await GET(
        "/project/history?token=" + store.state.token
      );
      if (res && res.status == 200) {
        return { posts: res.data };
      } else {
        return { posts: [] };
      }
    },
  };
</script>

<style scoped lang="scss"></style>
