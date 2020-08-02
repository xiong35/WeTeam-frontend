<template>
  <v-btn v-if="isChecked" @click="check" text color="black">
    标为未读
  </v-btn>
  <v-btn v-else @click="check" text color="black">
    标为已读
  </v-btn>
</template>

<script>
  import { POST } from "~/network/methods";

  export default {
    name: "Btncheck",
    components: {},
    data() {
      return {};
    },
    props: {
      id: {
        type: Number,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      isChecked: {
        required: true,
      },
    },
    computed: {},
    watch: {
      isChecked(newV, old) {
        let { id, type, isChecked } = this;
        POST("/message/isChecked", {
          token: this.$store.state.token,
          target: id,
          type,
          isChecked,
        });
      },
    },
    methods: {
      check() {
        this.$emit("change");
      },
    },
    created() {},
    mounted() {},
  };
</script>
<style scoped></style>
