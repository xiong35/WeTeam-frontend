<template>
  <v-card :to="'/project?id=' + post.id" class="my-2">
    <v-card-text>
      <p class="headline text--primary mb-1">
        {{ post.title }}
      </p>

      <v-chip
        v-for="(tag, ind) in post.tags"
        outlined
        :key="ind"
        class="mr-1"
        small
        >{{ tag }}</v-chip
      >
      <v-spacer></v-spacer>
      <v-row class="px-3 mt-2">
        <div>需要{{ post.memberNum }}名成员</div>
        <v-spacer></v-spacer>
        <div>开始时间: {{ post.beginDate }}</div>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    transition: "layout",
    name: "Card",
    components: {},
    props: {
      post: {
        type: Object,
        required: true,
      },
    },
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
