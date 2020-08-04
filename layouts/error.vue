<template>
  <v-app dark> </v-app>
</template>

<script>
  export default {
    layout: "404",
    props: {
      error: {
        type: Object,
        default: null,
      },
    },
    data() {
      return {
        pageNotFound: "404 Not Found",
        otherError: "An error occurred",
      };
    },
    head() {
      const title =
        this.error.statusCode === 404
          ? this.pageNotFound
          : this.otherError;
      return {
        title,
      };
    },
  };
</script>

<style scoped>
  h1 {
    font-size: 20px;
  }
</style>
