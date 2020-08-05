<template>
  <v-card
    class="my-4 info-card"
    :to="'/project/theme?id=' + theme.id"
    style="overflow: hidden;"
  >
    <v-row class="col-12 py-0">
      <v-col class="col-6 pa-0">
        <v-img
          :src="theme.cover"
          width="100%"
          :aspect-ratio="1.8 / 1"
          position="center"
        ></v-img
      ></v-col>
      <v-col class="col-6 py-2 px-3 pr-5">
        {{ theme.brief }}</v-col
      >
    </v-row>

    <v-list-item class="px-2">
      <v-list-item-avatar size="30px">
        <v-img :src="theme.publisherAvatar"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-subtitle
          >发布者:
          <nuxt-link :to="'/user?userID=' + theme.publisher">{{
            theme.publisherName
          }}</nuxt-link></v-list-item-subtitle
        >
      </v-list-item-content>
    </v-list-item>
    <v-img
      v-if="index_ <= 2"
      class="medal"
      :src="require(`assets/img/medal${index_}.png`)"
    ></v-img>
  </v-card>
</template>

<script>
  export default {
    transition: "layout",
    name: "CardTheme",
    props: {
      theme: {
        type: Object,
        required: true,
      },
      index_: {
        type: Number,
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

<style scoped lang="scss">
  .v-card {
    position: relative;
    .medal {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 30px;
      height: 30px;
    }
    .v-list-item__subtitle {
      font-size: 12px !important;
    }
  }
</style>
