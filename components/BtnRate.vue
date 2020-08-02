<template>
  <v-dialog
    scrollable
    v-model="dialog"
    persistent
    max-width="600px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" text v-bind="attrs" v-on="on">
        评价
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">对{{ nickname }}的点评</span>
      </v-card-title>
      <v-card-text style="max-height: 50vh;">
        <v-container>
          <v-row class="justify-center align-center">
            <span class="mr-4 text--primary">性格分:</span>
            <v-rating
              background-color="yellow darken-3"
              color="yellow darken-2"
              v-model="personality"
            ></v-rating>
          </v-row>
          <v-row class="justify-center align-center">
            <span class="mr-4 text--primary">态度分:</span>
            <v-rating
              background-color="yellow darken-3"
              color="yellow darken-2"
              v-model="attitude"
            ></v-rating>
          </v-row>
          <v-row class="justify-center align-center">
            <span class="mr-4 text--primary">能力分:</span>
            <v-rating
              background-color="yellow darken-3"
              color="yellow darken-2"
              v-model="capability"
            ></v-rating>
          </v-row>
          <v-textarea
            class="ma-4"
            label="你对ta的评价是..."
            v-model="description"
          >
          </v-textarea>
          <v-switch
            v-model="anonymous"
            label="开启匿名?"
            color="indigo"
            hide-details
            class="mt-n5"
          ></v-switch>
        </v-container>
        <small>*请客观公平准确的评价队友, 大家一起进步!</small>
      </v-card-text>
      <v-card-actions class="px-5">
        <BtnBlock :userID="userID"></BtnBlock>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false"
          >关闭</v-btn
        >
        <v-btn color="green darken-1" text @click="submit"
          >提交</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import BtnBlock from "~/components/BtnBlock";
  import { POST } from "~/network/methods";

  export default {
    name: "BtnRate",
    components: { BtnBlock },
    data() {
      return {
        dialog: false,
        personality: 4,
        attitude: 4,
        capability: 4,
        description: "",
        anonymous: false,
      };
    },
    props: {
      userID: {
        type: Number,
        required: true,
      },
      nickname: {
        type: String,
        required: true,
      },
    },
    computed: {},
    watch: {},
    methods: {
      async submit() {
        let { token, userInfo } = this.$store.state;

        let rater = userInfo.userID;
        let ratee = this.userID;

        let {
          attitude,
          capability,
          personality,
          description,
          anonymous,
        } = this;

        if (anonymous) {
          rater = null;
        }

        let res = await POST("/user/rate", {
          token,
          rater,
          ratee,
          attitude,
          personality,
          capability,
          description,
        });

        if (res) {
          this.$emit("change");
          alert("提交成功!");
        }
        this.dialog = false;
      },
    },
    created() {},
    mounted() {},
  };
</script>
<style scoped></style>
