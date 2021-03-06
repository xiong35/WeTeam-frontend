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
    <v-carousel
      cycle
      hide-delimiter-background
      show-arrows
      interval="2500"
      delimiter-icon="mdi-minus"
      height="160"
    >
      <v-carousel-item v-for="(theme, i) in themes" :key="i">
        <v-row
          @click="$router.push('/project/theme?id=' + theme.id)"
          class="fill-height"
          align="center"
          justify="center"
        >
          <v-img
            :aspect-ratio="2 / 1"
            :src="theme.cover"
            position="center"
          ></v-img>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <v-row class="mt-4 align-center">
      <v-col class="col-8 pa-0">
        <v-tabs
          class="pl-3 pr-1"
          v-model="tab"
          background-color="transparent"
          color="primary"
          grow
        >
          <v-tab><big>推荐</big></v-tab>
          <v-tab><big>关注</big></v-tab>
        </v-tabs>
      </v-col>
      <v-btn outlined @click="dialog = true" class="mx-auto"
        >筛选排序</v-btn
      >
    </v-row>

    <v-dialog scrollable v-model="dialog" max-h>
      <v-card>
        <v-card-title>
          <span class="headline">筛选条件</span>
        </v-card-title>
        <v-card-text style="min-height: 50vh;">
          <v-container>
            <v-select
              class="pa-0"
              v-model="numberFilter"
              @change="checkAll"
              :items="[
                '不限',
                '1~2人',
                '3~5人',
                '6~10人',
                '10人以上',
              ]"
              label="项目人数"
            ></v-select>
            <v-select
              class="pa-0"
              v-model="periodFilter"
              @change="checkAll"
              :items="[
                '不限',
                '一周内',
                '两周',
                '一个月',
                '三个月',
                '半年',
                '一年',
                '一年以上',
              ]"
              multiple
              chips
              label="项目周期"
            ></v-select>
            <v-select
              class="pa-0"
              v-model="typeFilter"
              @change="checkAll"
              :items="['不限', ...categories]"
              multiple
              chips
              label="项目类型"
              :menu-props="{ top: true, offsetY: true }"
            ></v-select>
            <v-select
              class="pa-0"
              v-model="rankFilter"
              @change="checkAll"
              :items="['不限', '院级', '校级', '省级', '国家级']"
              label="项目评级"
              multiple
              chips
              :menu-props="{ top: true, offsetY: true }"
            ></v-select>
          </v-container>
        </v-card-text>
        <v-card-actions class="pr-4">
          <v-spacer></v-spacer>
          <v-btn color="primary ma-3" text @click="dialog = false"
            >保存</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card v-if="filteredPosts.length > 0" flat>
          <Card
            v-for="post in filteredPosts"
            :key="post.id"
            :post="post"
          ></Card>
        </v-card>
        <ThePlaceholder v-else></ThePlaceholder>
      </v-tab-item>

      <v-tab-item>
        <v-card v-if="filteredPosts.length > 0" flat>
          <Card
            v-for="post in filteredPosts"
            :key="post.id"
            :post="post"
          ></Card>
        </v-card>
        <ThePlaceholder v-else></ThePlaceholder>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
  import Card from "~/components/Card";
  import ThePlaceholder from "~/components/ThePlaceholder";

  import { GET } from "~/network/methods";
  import { checkSignIn } from "~/utils/validate";
  import { categories } from "~/assets/data";

  export default {
    transition: "layout",
    name: "index",
    head() {
      return {
        title: "主页",
        meta: [
          {
            hid: "description",
            name: "description",
            content: "WeTeam 的主页",
          },
        ],
      };
    },
    components: {
      Card,
      ThePlaceholder,
    },
    data() {
      return {
        keyword: "",
        tab: 0,
        hasGot: false,
        following: [],
        sortList: ["发布者评分", "项目人数", "开始时间"],
        dialog: false,
        periodFilter: ["不限"],
        typeFilter: ["不限"],
        rankFilter: ["不限"],
        numberFilter: "不限",
        categories,
      };
    },
    computed: {
      filteredPosts() {
        let {
          periodFilter,
          typeFilter,
          rankFilter,
          numberFilter,
        } = this;

        return this.filterByTab
          .filter((p) => {
            // filter period
            if (
              ~periodFilter.indexOf("不限") ||
              periodFilter.length == 0
            ) {
              return true;
            }

            return ~periodFilter.indexOf(p.period);
          })
          .filter((p) => {
            // filter type
            if (
              ~typeFilter.indexOf("不限") ||
              typeFilter.length == 0
            ) {
              return true;
            }
            for (let t of p.type) {
              if (~typeFilter.indexOf(t)) {
                return true;
              }
            }
            return false;
          })
          .filter((p) => {
            // filter rank
            if (
              ~rankFilter.indexOf("不限") ||
              rankFilter.length == 0
            ) {
              return true;
            }
            return ~rankFilter.indexOf(p.rank);
          })
          .filter((p) => {
            // filter number
            switch (numberFilter) {
              case "1~2人":
                return 1 <= p.memberNum && p.memberNum <= 2;
              case "3~5人":
                return 3 <= p.memberNum && p.memberNum <= 5;
              case "6~10人":
                return 6 <= p.memberNum && p.memberNum <= 10;
              case "10人以上":
                return p.memberNum > 10;
            }
            return true;
          });
      },
      filterByTab() {
        if (this.tab == 0) {
          return this.allPosts.filter((p) => {
            return true;
          });
        } else {
          let following = this.$store.state.following.map(
            (v) => v.userID
          );
          return this.allPosts.filter((p) => {
            for (let m of p.members) {
              for (let f of following) {
                if (m == f) {
                  return true;
                }
              }
            }
            return false;
          });
        }
      },
    },
    watch: {
      async tab() {
        if (this.hasGot) {
          return;
        }
        if (!checkSignIn(this)) {
          return;
        }

        let res = await GET(
          "/user/follow?userID=" +
            this.$store.state.userInfo.userID
        );

        this.following = res.data.map((obj) => obj.userID);
        this.hasGot = true;
      },
    },
    methods: {
      checkAll(list) {
        let ind = list.indexOf("不限");
        if (ind == -1) {
          return;
        }
        if (ind == list.length - 1) {
          list.splice(0, list.length);
          list.push("不限");
        }
        list.splice(ind, 1);
      },
      search() {
        this.$router.push(`/home/search?kw=${this.keyword}`);
      },
    },
    created() {},
    mounted() {},
    async asyncData({ store, query }) {
      let res = await GET("/project?id=all");
      let themeRes = await GET("/projectTheme?id=all&limit=4");

      return { allPosts: res.data, themes: themeRes.data };
    },
  };
</script>

<style scoped lang="scss"></style>
