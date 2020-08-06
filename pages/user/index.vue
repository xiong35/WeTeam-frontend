<template>
  <v-card flat>
    <TopBar :title="info.nickname + '的主页'" />
    <v-row class="text-center py-0">
      <v-col>
        <v-avatar class="mt-4" size="80px">
          <img :src="info.avatar" alt="alt" />
        </v-avatar>
        <h3 class="ma-2">{{ info.nickname }}</h3>
        <nuxt-link
          tag="span"
          :to="`/user/follow?userID=${info.userID}&nickname=${info.nickname}&type=follow`"
          class="left-box mr-5 pr-5"
          >关注: {{ info.followingNum }}</nuxt-link
        >
        <nuxt-link
          tag="span"
          :to="`/user/follow?userID=${info.userID}&nickname=${info.nickname}&type=follower`"
          >粉丝: {{ info.followerNum }}</nuxt-link
        >
      </v-col>
    </v-row>
    <p class="text-center pa-0 mb-0">
      {{ info.grade }}级 - {{ info.major }}专业
    </p>
    <v-row class="text-center px-3">
      <v-col class="col-4">
        <BtnChat
          v-if="!self"
          :outlined="true"
          :textbtn="false"
          icon="mdi-chat-processing-outline"
          :userID="info.userID"
        ></BtnChat>
      </v-col>
      <v-col class="col-4">
        <v-btn
          color="primary"
          nuxt
          :to="
            '/user/resume?userID=' +
            info.userID +
            '&nickname=' +
            info.nickname
          "
          outlined
        >
          <v-icon left>mdi-file-account-outline</v-icon>简历
        </v-btn>
      </v-col>
      <v-col class="col-4">
        <v-btn
          v-if="!self"
          color="primary"
          nuxt
          @click="toggleFollow"
          outlined
        >
          <div v-if="!hasFollow">
            <v-icon left>mdi-account-star-outline</v-icon>关注
          </div>
          <div v-else><v-icon left>mdi-check</v-icon>已关注</div>
        </v-btn>
      </v-col>
    </v-row>
    <v-tabs
      v-model="tab"
      background-color="transparent"
      color="primary"
      centered
      grow
      class="pa-2"
    >
      <v-tab>他人评价</v-tab>
      <v-tab>组队记录</v-tab>
      <v-tab>分享</v-tab>
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
        <ThePlaceholder
          v-if="records.length == 0"
        ></ThePlaceholder>
        <div v-for="(record, index) in records" :key="index">
          <Card :post="record"></Card>
        </div>
      </v-tab-item>

      <v-tab-item>
        <ThePlaceholder v-if="shares.length == 0"></ThePlaceholder>
        <div v-for="(share, index) in shares" :key="index">
          <CardShare :share="share"></CardShare>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
  import TopBar from "~/components/TopBar";
  import MsgRate from "~/components/MsgRate";
  import BtnChat from "~/components/BtnChat";
  import Card from "~/components/Card";
  import CardShare from "~/components/CardShare";
  import ThePlaceholder from "~/components/ThePlaceholder";

  import { POST, GET } from "~/network/methods";
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
    components: {
      TopBar,
      MsgRate,
      Card,
      BtnChat,
      ThePlaceholder,
      CardShare,
    },
    data() {
      return {
        info: {},
        tab: 0,
        showDetailRate: false,
        haveRecords: false,
        records: [],
        haveShares: false,
        shares: [],
        curFollowState: "",
      };
    },
    computed: {
      hasFollow() {
        if (this.curFollowState) {
          return this.curFollowState == "yes";
        }
        return ~this.$store.state.following
          .map((v) => v.userID)
          .indexOf(this.info.userID);
      },
    },
    watch: {
      async tab(newVal, oldVal) {
        if (!this.haveRecords && newVal == 1) {
          let res = await GET(
            "/project/user?userID=" + this.info.userID
          );
          if (!res || res.status != 200) {
            return;
          }
          this.records = res.data;
        }
        if (!this.haveShares && newVal == 2) {
          let res = await GET(
            "/share/user?userID=" + this.info.userID
          );
          if (!res || res.status != 200) {
            return;
          }
          this.shares = res.data;
        }
      },
    },
    methods: {
      async toggleFollow() {
        if (!checkSignIn(this)) {
          return;
        }

        let res = await POST("/user/follow", {
          token: this.$store.state.token,
          followee: this.info.userID,
          type: this.hasFollow ? "cancel" : "begin",
        });

        if (res) {
          alert(this.hasFollow ? "成功取消关注!" : "成功关注");
          this.curFollowState = this.hasFollow ? "no" : "yes";
        }
      },

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
    mounted() {},
    async asyncData({ store, query }) {
      let { userID } = query;

      if (!userID) {
        this.$router.replace("/404");
      }

      let info,
        self = false;

      let userInfo = store.state.userInfo;
      if (userInfo && userInfo.userID) {
        if (userID == userInfo.userID) {
          info = userInfo;
          self = true;
        }
      }
      if (!info) {
        let res = await GET("/user/info?userID=" + userID);

        if (!res || res.status != 200) {
          this.$router.replace("/404");
        }

        info = res.data[0];
      }

      let res = await GET("/user/rate?userID=" + userID);
      let rates = res.data;

      return {
        info: { ...info, userID: userID * 1 },
        rates,
        self,
      };
    },
  };
</script>

<style scoped>
  .left-box {
    border-right: 1px solid #ddd;
  }
</style>
