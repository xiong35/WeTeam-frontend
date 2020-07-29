<template>
  <div class="home">
    <v-text-field dense label="Regular"></v-text-field>
  </div>
</template>

<script>
  export default {
    transition: "layout",
    name: "index",
    head() {
      return {
        title: "WeTeam 主页",
        meta: [
          {
            hid: "description",
            name: "description",
            content: "WeTeam 主页",
          },
        ],
      };
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

<style scoped lang="scss">
  #home {
    width: 100%;
    height: 100%;
    background-color: pink;
  }
</style>
