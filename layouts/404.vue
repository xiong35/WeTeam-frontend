<template>
  <v-img
    @click="$router.push('/home')"
    :src="require('~/assets/img/404.jpg')"
  ></v-img>
</template>

<script>
  export default {
    head() {
      return { title: "404 not found" };
    },
  };
</script>

<style scoped>
  h1 {
    font-size: 20px;
  }
</style>
