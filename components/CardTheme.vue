<template>
  <v-card
    class="my-4 info-card"
    :to="'/project/theme?id=' + theme.id"
  >
    <v-list-item>
      <v-list-item-avatar>
        <v-img :src="theme.publisherAvatar"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title
          >发布者:
          <nuxt-link :to="'/user?userID=' + theme.publisher">{{
            theme.publisherName
          }}</nuxt-link></v-list-item-title
        >
      </v-list-item-content>
    </v-list-item>

    <v-img
      :src="theme.cover"
      width="100%"
      :aspect-ratio="2 / 1"
      position="center"
    ></v-img>

    <v-card-text>
      {{ theme.brief }}
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    transition: "layout",
    name: "Card",
    props: {
      theme: {
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
