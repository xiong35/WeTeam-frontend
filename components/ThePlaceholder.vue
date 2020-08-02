<template>
  <div
    class="placeholder text-center align-center text--secondary py-8"
  >
    <p>{{ msg }}</p>
    <p>去<nuxt-link to="/hone">主页</nuxt-link>看看吧</p>
  </div>
</template>

<script>
  export default {
    name: "ThePlaceholder",
    components: {},
    data() {
      return {};
    },
    props: {
      msg: {
        type: String,
        default: "这里什么都没有呢QwQ",
      },
    },
    computed: {},
    watch: {},
    methods: {},
    created() {},
    mounted() {},
  };
</script>
<style scoped></style>
