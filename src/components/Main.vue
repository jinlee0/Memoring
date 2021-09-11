<template>
  <div id="main"></div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Main",
  data() {
    return {
      userId: null,
      userName: null,
    };
  },
  computed: {
    ...mapGetters(["getIsAuth"]),
    isLoggedIn() {
      return this.userId != null;
    },
  },
  created() {
    if (!this.getIsAuth) {
      this.$router.replace("/auth/log-in");
    }
  },
  components: {},
};
</script>


