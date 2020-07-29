<template>
  <v-toolbar dark>
    <v-icon @click="$router.back()" flat class="mr-3"
      >mdi-arrow-left</v-icon
    >
    <v-toolbar-title>{{ title }}</v-toolbar-title>
  </v-toolbar>
</template>

<script>
  export default {
    name: "TopBar",
    components: {},
    data() {
      return {};
    },
    props: ["title"],
    computed: {},
    watch: {},
    methods: {},
    created() {},
    mounted() {},
  };
</script>
<style scoped></style>
