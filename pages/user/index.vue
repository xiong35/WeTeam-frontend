<template>
  <v-card>
    <TopBar :title="info.nickname + '的主页'" />
    <v-row class="text-center">
      <v-col>
        <v-avatar size="6rpx">
          <img :src="info.avatar" alt="alt" />
        </v-avatar>
        <h3 class="ma-2">{{ info.nickname }}</h3>
        <nuxt-link
          tag="span"
          :to="'/user/follower?userID=' + info.userID"
          class="left-box mr-5 pr-5"
          >关注: {{ info.followingNum }}</nuxt-link
        >
        <span>粉丝: {{ info.followerNum }}</span>
      </v-col>
    </v-row>
    <v-col class="ml-3 pt-0">
      <v-row class="align-center">
        <span class="text-h6 mr-2">年级专业: </span
        >{{ info.grade }}级, {{ info.major }}专业
      </v-row>
      <v-row>
        <nuxt-link
          tag="span"
          class="text-h6"
          :to="'/user/resume?id=' + info.userID"
          >查看简历 ></nuxt-link
        >
      </v-row>
    </v-col>
    <v-tabs
      v-model="tab"
      background-color="transparent"
      color="basil"
      centered=""
    >
      <v-tab>他人评价</v-tab>
      <v-tab>组队记录</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card flat>
          <v-list>
            <v-list-group v-model="showDetailRate">
              <template v-slot:activator>
                <v-list-item-content>
                  <v-row class="ml-7 align-center">
                    <span class="subtitle-1">平均分:</span>
                    <v-rating
                      :value="avgStar(info.rating)"
                      color="yellow darken-2"
                      background-color="yellow darken-3"
                      readonly=""
                      half-increments=""
                    ></v-rating>
                  </v-row>
                </v-list-item-content>
              </template>

              <v-list-item>
                <v-list-item-content>
                  <v-row class="ml-7 align-center">
                    <span class="subtitle-1">性格分:</span>
                    <v-rating
                      :value="avgStar(info.rating.personality)"
                      color="yellow darken-2"
                      background-color="yellow darken-3"
                      readonly=""
                      half-increments=""
                    ></v-rating>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-row class="ml-7 align-center">
                    <span class="subtitle-1">态度分:</span>
                    <v-rating
                      :value="avgStar(info.rating.attitude)"
                      color="yellow darken-2"
                      background-color="yellow darken-3"
                      readonly=""
                      half-increments=""
                    ></v-rating>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-row class="ml-7 align-center">
                    <span class="subtitle-1">能力分:</span>
                    <v-rating
                      :value="avgStar(info.rating.capability)"
                      color="yellow darken-2"
                      background-color="yellow darken-3"
                      readonly=""
                      half-increments=""
                    ></v-rating>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </v-list>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat> </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
  import TopBar from "~/components/TopBar";

  import { checkSignIn } from "~/utils/validate";

  export default {
    transition: "layout",
    name: "index",
    head() {
      return {
        title: this.info.nickname + "的主页",
        meta: [
          {
            hid: "description",
            name: "description",
            content: this.info.nickname + "的主页",
          },
        ],
      };
    },
    components: { TopBar },
    data() {
      return {
        info: {},
        tab: 0,
        showDetailRate: false,
      };
    },
    computed: {},
    watch: {},
    methods: {
      avgStar(star) {
        if (typeof star == "number") {
          return star / this.info.rating.ratedNum;
        } else if (typeof star == "object") {
          return (
            (star.attitude + star.capability + star.personality) /
            this.info.rating.ratedNum /
            3
          );
        }
      },
    },
    created() {},
    filters: {},
    mounted() {
      checkSignIn(this);
    },
    async asyncData({ store, query }) {
      return { info: store.state.userInfo || {} };
    },
  };
</script>

<style scoped lang="scss">
  .left-box {
    border-right: 1px solid #ddd;
  }
</style>
