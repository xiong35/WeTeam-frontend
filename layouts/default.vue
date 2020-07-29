<template>
  <v-app>
    <v-main>
      <div class="pa-5 pb-1">
        <nuxt />
      </div>
    </v-main>
    <v-bottom-navigation
      :input-value="showNav"
      v-model="bottomNav"
      shift
      app
    >
      <v-btn nuxt to="home">
        <span>首页</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn nuxt to="school">
        <span>校园圈</span>
        <v-icon>mdi-school</v-icon>
      </v-btn>
      <v-btn nuxt to="post">
        <span>发布</span>
        <v-icon>mdi-comment-plus</v-icon>
      </v-btn>
      <v-btn nuxt to="massage">
        <span>消息中心</span>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn nuxt to="about">
        <span>我的</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        bottomNav: 0,
      };
    },
    computed: {
      showNav() {
        return true;
      },
    },
  };
</script>
