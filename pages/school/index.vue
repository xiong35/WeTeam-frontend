<template>
  <div class="home">
    <div class="search-container">
      <div
        @click="$router.push('/home/search?dontSearch=true')"
        class="fake-search"
      >
        <span>请输入搜索内容</span>
        <v-icon>mdi-magnify</v-icon>
      </div>
    </div>

    <v-divider></v-divider>

    <p class="list-header">
      <v-img
        class="trophy"
        height="16px"
        width="16px"
        :src="require('~/assets/img/trophy.png')"
      ></v-img>
      活动榜
    </p>
    <!-- -->

    <v-row style="font-size: 14px;" class="pa-4 text--secondary">
      <v-col class="col-6 py-1 left">
        <div
          v-for="(theme, index) in leftThemes"
          :key="index"
          @click="$router.push('/project/theme?id=' + theme.id)"
          class="pb-1"
        >
          {{ trim(index * 2 + 1 + ". " + theme.brief) }}
        </div>
      </v-col>
      <v-col class="col-6 py-1">
        <div
          v-for="(theme, index) in rightThemes"
          :key="index"
          @click="$router.push('/project/theme?id=' + theme.id)"
          class="pb-1"
        >
          {{ trim(index * 2 + 2 + ". " + theme.brief) }}
        </div>
        <div class="pb-1">
          <nuxt-link to="/school/activities">更多</nuxt-link>
        </div>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-row class="align-center pa-3 mt-n2">
      <v-tabs
        v-model="tab"
        background-color="transparent"
        color="primary"
        grow
      >
        <v-tab><big>全部</big></v-tab>
        <v-tab><big>推荐</big></v-tab>
        <v-tab><big>关注</big></v-tab>
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

      leftThemes() {
        return this.themes.filter((_, ind) => !(ind % 2));
      },
      rightThemes() {
        return this.themes.filter((_, ind) => ind % 2);
      },
    },
    watch: {},
    methods: {
      search() {
        this.$router.push(`/home/search?kw=${this.keyword}`);
      },

      trim(str) {
        if (str.length < 20) {
          return str;
        }
        return str.slice(0, 20) + "...";
      },
    },
    created() {},
    mounted() {},
    async asyncData({ store, query }) {
      let res = await GET("/share?id=all");
      let themeRes = await GET(
        "/projectTheme?id=all&limit=5&sort=hot"
      );

      return { allShares: res.data, themes: themeRes.data };
    },
  };
</script>

<style scoped lang="scss">
  .search-container {
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
    background-color: $primary;
    padding: 18px 16px;
    .fake-search {
      background-color: #fff;
      border-radius: 30px;
      display: flex;
      justify-content: space-between;
      line-height: 30px;
      padding: 0 8px 0 12px;
      color: #8d8d8d;
      font-size: 14px;
    }
  }
  .list-header {
    color: $primary;
    font-size: 16px;
    margin: 66px 0 -10px 16px;
    .trophy {
      display: inline-block;
      position: relative;
      top: 2px;
    }
  }

  .left {
    border-right: 1px solid #eee;
  }
</style>
