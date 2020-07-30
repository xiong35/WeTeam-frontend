<template> </template>

<script>
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
    components: {},
    data() {
      return {};
    },
    computed: {},
    watch: {},
    methods: {},
    created() {
      this.$router.replace("/home");
    },
    mounted() {},
    async asyncData({ store, query }) {},
  };
</script>

<style scoped lang="scss"></style>
