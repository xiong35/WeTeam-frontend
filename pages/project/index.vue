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
                <ProjectRate
                  v-if="post.finished"
                  :userID="post.members[index]"
                  :nickname="member.nickname"
                ></ProjectRate>
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
  import ProjectRate from "~/components/ProjectRate";

  import { timestampFmt } from "~/utils/time";

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
      ProjectRate,
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
      const data = {
        id: "<id>",
        publisher: "<userID>", // NEW
        title: "this is title",
        publisher: "123", // NEW
        finished: false,
        publisherAvatar:
          "https://ui-avatars.com/api/?name=John+Doe", // NEW
        publisherName: "jack", // NEW
        publishTime: new Date().getTime(), // NEWNEW, 项目发布的时间
        tags: ["foo", "bar"],
        beginDate: "2020/07/09",
        description:
          "this is a vary awesome project welcom to join us",
        memberNum: 7,
        grade: "better grade 2, grade 1 is accepetable",
        skill: "ps, c, c++",
        major: "cs",
        members: ["wegfae", "awrgAFv", "efaef"],
      };
      const members = [
        {
          avatar: "https://ui-avatars.com/api/?name=rose",
          nickname: "rose",
        },
        {
          avatar: "https://ui-avatars.com/api/?name=marry",
          nickname: "marry",
        },
        {
          avatar: "https://ui-avatars.com/api/?name=Jim",
          nickname: "Jim",
        },
      ];
      return { post: data, members };
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
