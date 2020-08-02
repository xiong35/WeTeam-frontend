<template>
  <v-list three-line>
    <v-list-item
      :to="'/user?userID=' + user.userID"
      v-for="(user, index) in users"
      :key="index"
    >
      <v-list-item-avatar size="55px">
        <v-img :src="user.avatar"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>{{ user.nickname }}</v-list-item-title>
        <v-list-item-subtitle>{{
          user.description || "去看看ta>"
        }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
  export default {
    name: "UserList",
    components: {},
    data() {
      return {};
    },
    props: {
      users: {
        type: Array,
        required: true,
      },
    },
    computed: {},
    watch: {},
    methods: {},
    created() {},
    mounted() {},
  };
</script>
<style scoped>
  .v-list-item:not(:last-of-type) {
    border-bottom: 1px solid #dddd;
  }
  .v-list-item--link:before {
    background-color: #fff !important;
  }
</style>
