<template>
  <v-chip small v-if="finished" outlined color="warning"
    >已结束</v-chip
  >
  <v-chip small v-else outlined color="primary">进行中</v-chip>
</template>

<script>
  export default {
    name: "ChipProjectStatus",
    components: {},
    data() {
      return {};
    },
    props: {
      finished: {
        type: Boolean,
        default: false,
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
