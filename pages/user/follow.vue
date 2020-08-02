<template>
  <v-card>
    <TopBar :title="title"></TopBar>
    <v-list three-line>
      <v-list-item
        :to="'/user?userID=' + follow.userID"
        v-for="(follow, index) in follows"
        :key="index"
      >
        <v-list-item-avatar size="55px">
          <v-img :src="follow.avatar"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{
            follow.nickname
          }}</v-list-item-title>
          <v-list-item-subtitle>去看看ta></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
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
    components: {
      TopBar,
    },
    data() {
      return {};
    },
    filters: {},
    computed: {
      title() {
        return (
          this.nickname +
          (this.type == "follow" ? "的关注" : "的粉丝")
        );
      },
    },
    watch: {},
    methods: {},
    created() {},
    mounted() {},
    async asyncData({ store, query }) {
      let { type, userID } = query;
      let res = await GET(`/user/${type}?userID=${userID}`);

      return { follows: res.data, ...query };
    },
  };
</script>

<style scoped lang="scss">
  .v-list-item:not(:last-of-type) {
    border-bottom: 1px solid #dddd;
  }
  .v-list-item--link:before {
    background-color: #fff !important;
  }
</style>
