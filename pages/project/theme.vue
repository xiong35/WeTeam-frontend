<template>
  <v-card>
    <TopBar title="活动详情"></TopBar>
    <div class="pa-3">
      <v-img
        :aspect-ratio="2 / 1"
        position="center"
        :src="theme.cover"
      >
      </v-img>
    </div>
    <mavon-editor
      class="article-content"
      :value="theme.content"
      :subfield="false"
      :defaultOpen="'preview'"
      :toolbarsFlag="false"
      :editable="false"
      :codeStyle="'atom-one-dark'"
      :scrollStyle="true"
      :boxShadow="false"
      :tabSize="4"
    ></mavon-editor>
  </v-card>
</template>

<script>
  import TopBar from "~/components/TopBar";

  import { GET } from "~/network/methods";

  export default {
    transition: "layout",
    name: "index",
    head() {
      return {
        title: "活动详情",
        meta: [
          {
            hid: "description",
            name: "description",
            content: "活动详情",
          },
        ],
      };
    },
    components: {
      TopBar,
    },
    data() {
      return {};
    },
    filters: {},
    computed: {},
    watch: {},
    methods: {},
    created() {},
    mounted() {},
    async asyncData({ store, query, redirect }) {
      let { id } = query;
      if (!id) {
        this.$router.replace("/404");
      }

      let res = await GET("/projectTheme?id=" + id);
      if (!res || res.status != 200) {
        return redirect("/404");
      }

      return {
        theme: res.data,
        id,
      };
    },
  };
</script>

<style scoped lang="scss"></style>
