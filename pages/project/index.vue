<template>
  <v-card>
    <TopBar title="项目详情"></TopBar>
    <v-list three-line>
      <v-list-item>
        <v-list-item-avatar size="60">
          <v-img :src="post.publisherAvatar"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{
            post.publisherName
          }}</v-list-item-title>
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
          <v-list-item-title>
            项目名称
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ post.title }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            项目标签
          </v-list-item-title>
          <v-list-item-subtitle>
            <v-chip
              v-for="(tag, ind) in post.tags"
              outlined
              :key="ind"
              class="mr-1"
              small
              >{{ tag }}</v-chip
            >
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            项目开始时间
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ post.beginDate }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            项目简介
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ post.description }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            组队要求
          </v-list-item-title>
          <ul class="mt-2">
            <li>人数: {{ post.memberNum }}名左右</li>
            <li>专业: {{ post.major }}</li>
            <li>年级: {{ post.grade }}</li>
            <li>技能: {{ post.skill }}</li>
          </ul>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="mb-2">
            现有成员
          </v-list-item-title>

          <v-card
            class="pa-0 member text-center"
            flat
            v-for="(member, index) in members"
            :key="index"
          >
            <v-list-item three-line>
              <v-list-item-avatar
                @click="
                  $router.push(`/user?id=${post.members[index]}`)
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
                  v-if="post.finished"
                  :userID="post.members[index]"
                  :nickname="member.nickname"
                ></BtnRate>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
  import TopBar from "~/components/TopBar";
  import BtnRate from "~/components/BtnRate";

  import { timestampFmt } from "~/utils/time";
  import { GET, POST } from "~/network/methods";

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
    },
    data() {
      return {};
    },
    filters: {
      timestampFmt,
    },
    computed: {},
    watch: {},
    methods: {},
    created() {},
    mounted() {},
    async asyncData({ store, query }) {
      let { id } = query;
      if (!id) {
        this.$router.replace("/404");
      }

      let res = await GET("/project?id=" + id);
      if (!res || res.status != 200) {
        this.$router.replace("/404");
      }
      console.log(res);

      let memberID = res.data.members;

      res = await GET(
        "/user/info?userID=" + memberID.join("&userID=")
      );

      return { post: res.data, members: res.data };
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
