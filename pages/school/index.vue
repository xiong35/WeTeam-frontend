<template>
  <div class="home">
    <v-row class="pa-4 pb-1 mb-n3">
      <v-text-field
        v-model="keyword"
        rounded
        dense
        outlined
        append-icon="mdi-magnify"
        @click:append="search"
        @keydown.enter="search"
        placeholder="请输入查找内容"
      >
      </v-text-field>
    </v-row>

    <v-divider></v-divider>

    <h2 class="mt-3 ml-3 mb-n2">活动榜</h2>

    <v-row class="pa-2">
      <div
        v-for="(theme, index) in themes"
        :key="index"
        class="col-6 pa-2 align-center justify-center"
      >
        <v-card
          rounded
          flat
          @click="$router.push('/project/theme?id=' + theme.id)"
          class="pa-3 activity"
        >
          <b>{{ index + 1 + ". " }}</b> {{ theme.brief }}</v-card
        >
      </div>
    </v-row>

    <v-divider></v-divider>

    <v-row class="align-center pa-3 mt-n2">
      <v-tabs
        v-model="tab"
        background-color="transparent"
        color="primary"
        grow
      >
        <v-tab>全部</v-tab>
        <v-tab>推荐</v-tab>
        <v-tab>关注</v-tab>
      </v-tabs>
    </v-row>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card v-if="filterByTab.length > 0" flat>
          <CardShare
            v-for="share in filterByTab"
            :key="share.id"
            :share="share"
          ></CardShare>
        </v-card>
        <ThePlaceholder v-else></ThePlaceholder>
      </v-tab-item>

      <v-tab-item>
        <!-- TODO add other tab's filter -->
        <v-card v-if="filterByTab.length > 0" flat>
          <CardShare
            v-for="share in filterByTab"
            :key="share.id"
            :share="share"
          ></CardShare>
        </v-card>
        <ThePlaceholder v-else></ThePlaceholder>
      </v-tab-item>

      <v-tab-item>
        <v-card v-if="filterByTab.length > 0" flat>
          <CardShare
            v-for="share in filterByTab"
            :key="share.id"
            :share="share"
          ></CardShare>
        </v-card>
        <ThePlaceholder v-else></ThePlaceholder>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
  import CardShare from "~/components/CardShare";
  import ThePlaceholder from "~/components/ThePlaceholder";

  import { GET } from "~/network/methods";
  import { checkSignIn } from "~/utils/validate";
  import { categories } from "~/assets/data";

  export default {
    transition: "layout",
    name: "index",
    head() {
      return {
        title: "校园圈",
        meta: [
          {
            hid: "description",
            name: "description",
            content: "WeTeam 的校园圈",
          },
        ],
      };
    },
    components: {
      CardShare,
      ThePlaceholder,
    },
    data() {
      return {
        keyword: "",
        tab: 0,
        categories,
      };
    },
    computed: {
      filterByTab() {
        if (this.tab == 0) {
          return this.allShares.filter((share) => {
            return true;
          });
        } else if (this.tab == 1) {
          return this.allShares.filter((share) => {
            for (let i of this.interests) {
              for (let cat of share.categoty.split(";")) {
                if (i == cat) {
                  return true;
                }
              }
            }
            return false;
          });
        } else if (this.tab == 2) {
          return this.allShares.filter((share) => {
            for (let f of this.following) {
              if (share.publisher == f) {
                return true;
              }
            }
            return false;
          });
        }
      },
      following() {
        if (!checkSignIn(this)) {
          return;
        }
        return this.$store.state.following.map((v) => v.userID);
      },
      interests() {
        if (!checkSignIn(this)) {
          return;
        }
        let interests = this.$store.state.userInfo.interest;
        if (!interests) {
          return [];
        }
        return interests.split(",");
      },
    },
    watch: {},
    methods: {
      search() {
        this.$router.push(`/home/search?kw=${this.keyword}`);
      },
    },
    created() {},
    mounted() {},
    async asyncData({ store, query }) {
      let res = await GET("/share?id=all");
      let themeRes = await GET("/projectTheme?id=all&limit=4");

      return { allShares: res.data, themes: themeRes.data };
    },
  };
</script>

<style scoped lang="scss">
  .activity {
    border: 1px solid #3094cf99;
    color: $primary;
  }
</style>
