<template>
  <div>
    <TopBar :title="title"></TopBar>
    <v-card
      class="my-4 info-card"
      v-for="(theme, index) in themes"
      :key="index"
      :to="'/project/theme?id=' + theme.id"
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="theme.publisherAvatar"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title
            >发布者:
            <nuxt-link :to="'/user?userID=' + theme.publisher">{{
              theme.publisherName
            }}</nuxt-link></v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>

      <v-img
        :src="theme.cover"
        width="100%"
        :aspect-ratio="2 / 1"
        position="center"
      ></v-img>

      <v-card-text>
        {{ theme.brief }}
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
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
            content: "WeTeam 的" + this.title,
          },
        ],
      };
    },
    components: { TopBar },
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
      let res = await GET("/projectTheme?id=all&limit=50");
      if (!res || res.status != 200) {
        return redirect("/404");
      }
      return { themes: res.data };
    },
  };
</script>

<style scoped lang="scss"></style>
