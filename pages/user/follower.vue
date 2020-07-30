<template>
  <v-card>
    <TopBar title="的follower"></TopBar>
    <v-list three-line>
      <v-list-item
        :to="'/user?userID=' + follower.userID"
        v-for="(follower, index) in followers"
        :key="index"
      >
        <v-list-item-avatar size="55px">
          <v-img :src="follower.avatar"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{
            follower.nickname
          }}</v-list-item-title>
          <v-list-item-subtitle>去看看ta></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
  import TopBar from "~/components/TopBar";

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
    async asyncData({ store, query }) {
      const res = {
        status: 200,
        msg: "ok",
        data: [
          {
            userID: "fggaf",
            avatar: "https://ui-avatars.com/api/?name=rose",
            nickname: "rose",
          },
          {
            userID: "fggaf",
            avatar: "https://ui-avatars.com/api/?name=marry",
            nickname: "marry",
          },
          {
            userID: "fggaf",
            avatar: "https://ui-avatars.com/api/?name=Jim",
            nickname: "Jim",
          },
        ],
      };

      return { followers: res.data };
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
