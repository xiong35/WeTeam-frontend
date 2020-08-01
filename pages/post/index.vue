<template>
  <div>
    <v-card
      @click="$router.push('/post/new')"
      class="text-center align-end my-4"
    >
      <h2 class="pa-12">项目组队</h2>
    </v-card>
    <v-card
      @click="$router.push('/post/newTheme')"
      class="text-center align-end my-4"
    >
      <h2 class="pa-12">发布主题</h2>
    </v-card>
  </div>
</template>

<script>
  export default {
    transition: "layout",
    name: "index",
    head() {
      return {
        title: "发布",
        meta: [
          {
            hid: "description",
            name: "description",
            content: "WeTeam 的发布",
          },
        ],
      };
    },
    validate({ store, redirect }) {
      console.log(store.state);
      if (!store.state.token || !store.state.userInfo) {
        return redirect("/user/login?hint=true");
      }
      return true;
    },
    components: {},
    data() {
      return {};
    },
    computed: {},
    watch: {},
    methods: {},
    created() {},
    mounted() {},
    async asyncData({ store, query }) {},
  };
</script>

<style scoped lang="scss"></style>
