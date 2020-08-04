<template>
  <v-card class="blocklist">
    <TopBar title="黑名单"></TopBar>
    <v-list v-if="users.length > 0" three-line>
      <v-list-item v-for="(user, index) in users" :key="index">
        <v-row class="align-center">
          <v-col
            @click="$router.push('/user?userID=' + user.userID)"
            class="col-3"
          >
            <v-avatar size="70px" color="secondary">
              <v-img :src="user.avatar"></v-img>
            </v-avatar>
          </v-col>
          <v-col
            @click="$router.push('/user?userID=' + user.userID)"
            class="col-6"
          >
            <h2>{{ user.nickname }}</h2>
            <span>{{ user.description || "去看看ta>" }}</span>
          </v-col>
          <v-col class="col-3">
            <v-btn
              small
              :disabled="!!~unBlocked.indexOf(user.userID)"
              @click="unBlock(user.userID)"
              outlined
              color="primary"
              >解除拉黑</v-btn
            >
          </v-col>
        </v-row>
      </v-list-item>
    </v-list>
    <ThePlaceholder v-else></ThePlaceholder>
  </v-card>
</template>

<script>
  import TopBar from "~/components/TopBar";
  import ThePlaceholder from "~/components/ThePlaceholder";

  import { GET, POST } from "~/network/methods";

  export default {
    name: "blockList",
    components: {
      TopBar,
      ThePlaceholder,
    },
    data() {
      return {
        unBlocked: [],
      };
    },
    head() {
      return {
        title: "黑名单",
        meta: [
          {
            hid: "description",
            name: "description",
            content: "黑名单",
          },
        ],
      };
    },
    computed: {},
    watch: {},
    methods: {
      async unBlock(rejectee) {
        let res = await POST("/message/reject", {
          token: this.$store.state.token,
          rejecter: this.$store.state.userInfo.userID,
          rejectee,
          type: "accept",
        });

        if (res) {
          alert("解除成功!");
          this.unBlocked.push(rejectee);
        }
      },
    },
    created() {
      let { userInfo, token } = this.$store.state;
      if (!userInfo || !token) {
        this.$router.replace("/user/login?hint=true");
      }
    },
    mounted() {},
    async asyncData({ store }) {
      let res = await GET(
        "/message/reject?token=" + store.state.token
      );

      if (res && res.status == 200) {
        return { users: res.data };
      }
      return { users: [] };
    },
  };
</script>
<style scoped></style>
