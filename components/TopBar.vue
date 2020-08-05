<template>
  <v-toolbar class="topbar" dark color="primary">
    <v-icon @click="$router.back()" flat class="icon"
      >mdi-arrow-left</v-icon
    >
    <span class="title">
      {{ title }}
    </span>
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
<style scoped lang="scss">
  .topbar {
    text-align: center;

    .icon {
      position: absolute;
      top: 16px;
      left: 15px;
    }
    .title {
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      margin: auto;
      font-size: 18px !important;
    }
  }
</style>
