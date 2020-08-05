<template>
  <v-card :to="'/project/share?id=' + share.id" class="my-2">
    <v-list three-line>
      <v-list-item>
        <v-list-item-avatar size="55px">
          <v-img :src="share.publisherAvatar"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title
            ><nuxt-link :to="'/user?userID=' + share.publisher">{{
              share.publisherName
            }}</nuxt-link>
            的分享</v-list-item-title
          >
          <v-list-item-subtitle>{{
            share.brief
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-row class="pb-1 px-4 mt-n2">
      <v-chip
        v-for="(tag, ind) in share.categoty.split(';')"
        :key="ind"
        class="ma-1"
        outlined
        small
        >{{ tag }}</v-chip
      >
    </v-row>
    <v-row class="pb-2 px-6">
      <v-spacer></v-spacer>
      <span class="text--secondary"
        >发布时间: {{ timestampFmt(share.time) }}</span
      >
    </v-row>
  </v-card>
</template>

<script>
  import ChipProjectStatus from "~/components/ChipProjectStatus";

  import { timestampFmt } from "~/utils/time";

  export default {
    transition: "layout",
    name: "Card",
    components: { ChipProjectStatus },
    props: {
      share: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {};
    },
    computed: {},
    watch: {},
    methods: {
      timestampFmt,
    },
    created() {},
    mounted() {},
    async asyncData({ store, query }) {},
  };
</script>

<style scoped lang="scss">
  .card-headline {
    font-size: 18px;
    font-weight: 400;
  }
</style>
