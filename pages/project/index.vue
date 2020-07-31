<template>
  <v-card>
    <TopBar title="项目详情"></TopBar>
    <v-list three-line>
      <v-list-item
        @click="$router.push('/user?userID=' + post.publisher)"
      >
        <v-list-item-avatar size="60">
          <v-img :src="post.publisherAvatar"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title
            >{{ post.publisherName }}
            <ChipProjectStatus
              :finished="post.finished"
              class="float-right"
            ></ChipProjectStatus>
          </v-list-item-title>
          <v-list-item-subtitle>
            发布于
            {{
              post.publishTime | timestampFmt
            }}</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle>
            名称
          </v-list-item-subtitle>
          <v-list-item-title>
            {{ post.title }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle>
            类型
          </v-list-item-subtitle>
          <v-list-item-title>
            <v-chip
              v-for="(tag, ind) in post.type"
              outlined
              :key="ind"
              class="mr-1"
              >{{ tag }}</v-chip
            >
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle>
            级别
          </v-list-item-subtitle>
          <v-list-item-title>
            {{ post.rank }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle>
            开始时间
          </v-list-item-subtitle>
          <v-list-item-title>
            {{ post.beginDate }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle>
            简介
          </v-list-item-subtitle>
          <v-list-item-title>
            {{ post.description }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle>
            组队要求
          </v-list-item-subtitle>
          <ul class="mt-2">
            <li>人数：{{ post.memberNum }}名左右</li>
            <li>专业：{{ post.major.join(", ") }}</li>
            <li>年级：{{ post.grade.replace(",", ", ") }}</li>
            <li>技能：{{ post.skill }}</li>
          </ul>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle class="mb-2">
            现有成员
          </v-list-item-subtitle>

          <v-card
            class="pa-0 member text-center"
            flat
            v-for="(member, index) in members"
            :key="index"
          >
            <v-list-item three-line class="pa-0 px-1">
              <v-list-item-avatar
                @click="
                  $router.push(
                    `/user?userID=${post.members[index]}`
                  )
                "
                size="45"
              >
                <img :src="member.avatar" alt="alt" />
              </v-list-item-avatar>
              <v-list-item-content>
                <p class="text-h6">
                  {{ member.nickname }}
                </p>
                <BtnRate
                  v-if="post.finished && inGroup"
                  :userID="post.members[index]"
                  :nickname="member.nickname"
                ></BtnRate>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-list-item-content>
      </v-list-item>

      <v-list-item class="justify-center">
        <v-dialog
          v-if="!self"
          v-model="dialog"
          persistent
          :close-on-content-click="false"
          :close-on-click="false"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              outlined
              color="primary"
              v-bind="attrs"
              v-on="on"
              large
              :disabled="post.finished"
            >
              报名
            </v-btn>
          </template>

          <v-card class="pa-4">
            <v-textarea
              outlined
              label="向负责人夸夸自己！"
              v-model="sendMsg"
            ></v-textarea>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn text @click="dialog = false">取消</v-btn>
              <v-btn color="primary" text @click="submit"
                >发送</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-btn
          v-else
          outlined
          color="orange darken-1"
          large
          :disabled="post.finished"
          @click="finish"
        >
          结束项目
        </v-btn>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
  import TopBar from "~/components/TopBar";
  import BtnRate from "~/components/BtnRate";
  import ChipProjectStatus from "~/components/ChipProjectStatus";

  import { timestampFmt } from "~/utils/time";
  import { GET, POST } from "~/network/methods";
  import { checkSignIn } from "~/utils/validate";

  export default {
    transition: "layout",
    name: "index",
    head() {
      return {
        title: "",
        meta: [
          {
            hid: "description",
            name: "description",
            content: "",
          },
        ],
      };
    },
    components: {
      TopBar,
      BtnRate,
      ChipProjectStatus,
    },
    data() {
      return {
        dialog: false,
        sendMsg: "",
      };
    },
    filters: {
      timestampFmt,
    },
    computed: {
      inGroup() {
        let userID =
          this.$store.state.userInfo &&
          this.$store.state.userInfo.userID;
        let members = this.post.members;

        let ind = members.findIndex((v) => {
          return v == userID;
        });

        return !!~ind;
      },
    },
    watch: {},
    methods: {
      async submit() {
        if (!checkSignIn(this)) {
          return;
        }

        let res = await POST("/message/join", {
          token: this.$store.state.token,
          target: this.id,
          message: this.sendMsg,
        });

        this.dialog = false;
        alert("发送成功");
      },

      finish() {
        if (!checkSignIn(this)) {
          return;
        }

        if (confirm("确定要结束本次活动吗?")) {
          POST("/project/finish", {
            token: this.$store.state.token,
            id: this.id,
          });

          this.post.finished = true;
        }
      },
    },
    created() {},
    mounted() {},
    async asyncData({ store, query }) {
      let { id } = query;
      if (!id) {
        this.$router.replace("/404");
      }

      let projectRes = await GET("/project?id=" + id);
      if (!projectRes || projectRes.status != 200) {
        this.$router.replace("/404");
      }

      let self = false;
      let userInfo = store.state.userInfo;
      if (
        userInfo &&
        userInfo.userID &&
        userInfo.userID == projectRes.data.publisher
      ) {
        self = true;
      }

      let memberID = projectRes.data.members;

      let memberRes = await GET(
        "/user/info?userID=" + memberID.join("&userID=")
      );

      return {
        post: projectRes.data,
        members: memberRes.data,
        id,
        self,
      };
    },
  };
</script>

<style scoped lang="scss">
  .v-list-item__title {
    color: black;
  }
  .v-list-item__subtitle,
  ul {
    color: #2b2b2b !important;
    li {
      margin: 3px 0 3px 0;
    }
  }

  .member {
    flex: 0 0 50%;
  }
  @media (max-width: 374.5px) {
    .member {
      flex: 0 0 100%;
    }
  }
</style>
