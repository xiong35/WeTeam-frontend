<template>
  <v-card>
    <v-list-item
      @click="$router.push('/user?userID=' + msg.rater)"
    >
      <v-list-item-avatar size="50">
        <v-img :src="msg.raterAvatar"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline"
          >来自<strong>{{ msg.raterName }}</strong
          >的评价</v-list-item-title
        >
        <v-list-item-subtitle>
          <span class="float-right">{{
            timestampFmt(msg.time)
          }}</span>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-text class="pb-0">
      {{ msg.description }}
    </v-card-text>

    <v-list>
      <v-list-group v-model="showDetailRate">
        <template v-slot:activator>
          <v-list-item-content class="pl-6 mr-n6">
            <v-row class="align-center">
              <span class="subtitle-1">平均分:</span>
              <v-rating
                :value="avgRate"
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
            <v-row class="ml-3 align-center">
              <span class="subtitle-1">性格分:</span>
              <v-rating
                background-color="yellow darken-3"
                color="yellow darken-2"
                :value="msg.personality"
                readonly
              ></v-rating>
            </v-row>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-row class="ml-3 align-center">
              <span class="subtitle-1">态度分:</span>
              <v-rating
                background-color="yellow darken-3"
                color="yellow darken-2"
                :value="msg.attitude"
                readonly
              ></v-rating>
            </v-row>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-row class="ml-3 align-center">
              <span class="subtitle-1">能力分:</span>
              <v-rating
                background-color="yellow darken-3"
                color="yellow darken-2"
                :value="msg.capability"
                readonly
              ></v-rating>
            </v-row>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>

    <v-card-actions class="pt-0">
      <BtnChat text="回复评价" :userID="msg.rater"></BtnChat>
      <v-spacer></v-spacer>
      <BtnBlock :userID="msg.rater"></BtnBlock>

      <v-btn icon>
        <v-icon>mdi-trash-can-outline</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import BtnChat from "~/components/BtnChat";
  import BtnBlock from "~/components/BtnBlock";

  import { timestampFmt } from "~/utils/time";

  export default {
    name: "MsgRate",
    components: { BtnChat, BtnBlock },
    data() {
      return {
        showDetailRate: false,
      };
    },
    props: {
      msg: {
        type: Object,
        required: true,
      },
    },
    computed: {
      avgRate() {
        return (
          (this.msg.personality +
            this.msg.attitude +
            this.msg.capability) /
          3
        );
      },
    },
    watch: {},
    methods: { timestampFmt },
    created() {},
    mounted() {},
  };
</script>
<style scoped></style>
