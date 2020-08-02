<template>
  <v-card>
    <TopBar :title="title"></TopBar>
    <UserList :users="follows"></UserList>
  </v-card>
</template>

<script>
  import TopBar from "~/components/TopBar";
  import UserList from "~/components/UserList";

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
      UserList,
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

<style scoped lang="scss"></style>
