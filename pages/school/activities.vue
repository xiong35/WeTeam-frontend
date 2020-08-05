<template>
  <v-card flat>
    <TopBar :title="title"></TopBar>
    <CardTheme
      v-for="(theme, index) in themes"
      :theme="theme"
      :key="index"
      :index_="index"
    ></CardTheme>
  </v-card>
</template>

<script>
  import TopBar from "~/components/TopBar";
  import CardTheme from "~/components/CardTheme";

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
            content: "WeTeam 的" + this.title,
          },
        ],
      };
    },
    components: {
      TopBar,
      CardTheme,
    },
    data() {
      return {
        title: "主题活动",
      };
    },
    computed: {},
    watch: {},
    methods: {},
    created() {},
    mounted() {},
    async asyncData({ store, query, redirect }) {
      let res = await GET(
        "/projectTheme?id=all&limit=50&sort=hot"
      );
      if (!res || res.status != 200) {
        return redirect("/404");
      }
      return { themes: res.data };
    },
  };
</script>

<style scoped lang="scss"></style>
