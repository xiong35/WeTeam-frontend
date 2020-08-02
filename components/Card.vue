<template>
  <v-card :to="'/project?id=' + post.id" class="my-2">
    <v-card-text>
      <v-row class="align-center py-0 px-3">
        <span class="headline text--primary mb-1">
          {{ post.title }}
        </span>
        <v-spacer></v-spacer>
        <ChipProjectStatus
          :finished="post.finished"
        ></ChipProjectStatus>
      </v-row>

      <v-chip small outlined class="ma-1" color="info"
        >{{ post.rank }}
      </v-chip>
      <v-chip
        v-for="(tag, ind) in post.type"
        :key="ind"
        class="ma-1"
        outlined
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
  import ChipProjectStatus from "~/components/ChipProjectStatus";

  export default {
    transition: "layout",
    name: "Card",
    components: { ChipProjectStatus },
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
