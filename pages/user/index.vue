<template>
  <v-card flat>
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
                <v-list-item-content class="pl-6 mr-n10">
                  <v-row class="align-center">
                    <span class="subtitle-1">总平均分:</span>
                    <v-rating
                      :value="avgStar(info.rating)"
                      color="yellow darken-2"
                      background-color="yellow darken-3"
                      readonly
                      half-increments
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
        <MsgRate
          class="mb-2"
          v-for="(rate, index) in rates"
          :key="index"
          :msg="rate"
        ></MsgRate>
      </v-tab-item>

      <v-tab-item>
        <v-card flat> </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
  import TopBar from "~/components/TopBar";
  import MsgRate from "~/components/MsgRate";

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
    components: { TopBar, MsgRate },
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
      let rateRes = {
        status: 200,
        msg: "ok",
        data: [
          {
            rater: "123", // 发布评价的人, 如果设为 null 代表匿名
            raterName: "jack", // 发布评价的人的nickname, 如果设为 null 代表匿名
            raterAvatar: "https://ui-avatars.com/api/?name=jack",
            ratee: "456", // 被评价的人
            attitude: 3,
            capability: 4,
            personality: 5,
            description: "8太行", // 详细评价, 可为null
            time: new Date().getTime() - 60000,
          },
          {
            rater: "245", // 发布评价的人, 如果设为 null 代表匿名
            raterName: "rose", // 发布评价的人的nickname, 如果设为 null 代表匿名
            raterAvatar: "https://ui-avatars.com/api/?name=rose",
            ratee: "123", // 被评价的人
            attitude: 5,
            capability: 4,
            personality: 5,
            description: "整挺好", // 详细评价, 可为null
            time: new Date().getTime() - 10000,
          },
        ],
      };

      let infoRes = {
        status: 200,
        data: [
          {
            avatar: "https://ui-avatars.com/api/?name=jack",
            nickname: "jack",
            gender: "male",
            description: "this is description",
            schoolID: "U201914903", //校园卡号
            major: "cs",
            followerNum: "4",
            followingNum: "3",
            grade: "19", // 入学年份
            rating: {
              // rate详见下方 获取评分 部分, 在用户首页只展示星级
              ratedNum: 1, // 只用统计评价人数和总分数就行了, 平均分前端来算就好了
              attitude: 5, // 以下几项都是总分数
              capability: 4,
              personality: 4,
            },
          },
        ],
      };

      return { info: infoRes.data[0], rates: rateRes.data };
    },
  };
</script>

<style scoped>
  .left-box {
    border-right: 1px solid #ddd;
  }
</style>
