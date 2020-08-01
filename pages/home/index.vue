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
        <template v-slot:prepend-inner>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                v-on="on"
                @click="
                  keywordCategory =
                    keywordCategory == '组队' ? '用户' : '组队'
                "
                >{{
                  keywordCategory == "组队"
                    ? "mdi-account-multiple"
                    : "mdi-account-question"
                }}</v-icon
              >
            </template>
            搜索{{ keywordCategory }}
          </v-tooltip>
        </template>
      </v-text-field>
    </v-row>
    <v-carousel
      cycle
      :show-arrows="false"
      hide-delimiter-background
      show-arrows-on-hover
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
          <v-img :src="theme.cover" position="center"></v-img>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <v-row class="mt-4 align-center">
      <v-col class="col-8 pa-0">
        <v-tabs
          class="pl-3 pr-1"
          v-model="tab"
          background-color="transparent"
          color="basil"
          grow=""
        >
          <v-tab>推荐</v-tab>
          <v-tab>关注</v-tab>
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
        <v-card-text style="height: 50vh;">
          <v-container>
            <v-select
              class="pa-0"
              v-model="numberFilter"
              :items="[
                '不限',
                '1~2人',
                '3~5人',
                '6~10人',
                '10人以上',
              ]"
              outlined=""
              label="项目人数"
            ></v-select>
            <v-select
              class="pa-0"
              v-model="periodFilter"
              outlined=""
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
              outlined=""
              v-model="typeFilter"
              :items="[
                '不限',
                '科技大赛',
                '设计比赛',
                'IT应用开发',
                '创业大赛',
                '财汇金融',
                '营销策划',
                '影视摄影',
                '广告创意',
                '公益大赛',
                '学科学术',
                '其他',
              ]"
              multiple
              chips
              label="项目类型"
              :menu-props="{ top: true, offsetY: true }"
            ></v-select>
            <v-select
              class="pa-0"
              outlined=""
              v-model="rankFilter"
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
          <v-btn
            color="blue darken-1 ma-3"
            text
            @click="dialog = false"
            >保存</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card flat>
          <Card
            v-for="post in allPosts"
            :key="post.id"
            :post="post"
          ></Card>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <Card
            v-for="post in filteredPosts"
            :key="post.id"
            :post="post"
          ></Card>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
  import Card from "~/components/Card";
  import { GET } from "~/network/methods";
  import { checkSignIn } from "~/utils/validate";

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
    },
    data() {
      return {
        keywordCategory: "组队",
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
          return this.allPosts.filter((p) => {
            console.log(p);
          });
        }
      },
    },
    watch: {
      async tab() {
        if (this.hasGot) {
          return;
        }
        checkSignIn(this);

        let res = await GET(
          "/user/follow?userID=" +
            this.$store.state.userInfo.userID
        );

        this.following = res.data.map((obj) => obj.userID);
        this.hasGot = true;
      },
    },
    methods: {
      search() {
        if (this.keywordCategory == "用户") {
          alert("暂不支持搜索用户QwQ");
          this.keywordCategory = "组队";
          return;
        }
        this.$router.push(
          `/home/search?kw=${this.keyword}&cat=${this.keywordCategory}`
        );
      },
    },
    created() {},
    mounted() {},
    async asyncData({ store, query }) {
      let res = await GET("/project?id=all");
      let themeRes = await GET("/projectTheme?id=all");

      return { allPosts: res.data, themes: themeRes.data };
    },
  };
</script>

<style scoped lang="scss"></style>
