<template>
  <div id="main">
    <span>{{ user }}</span>
    <button id="logout-button" @click="onClickLogout">로그아웃</button>
  </div>
</template>
<script>
export default {
  name: "Main",
  data() {
    return {
      user: null, //{id: , email: , createdAt: }
    };
  },
  created() {
    this.$store
      .dispatch("getMe")
      .then((res) => {
        this.user = res.data;
      })
      .catch((err) => {
        console.error(err);
      });
  },
  computed: {
    isLoggedIn() {
      return this.userId != null;
    },
  },
  methods: {
    onClickLogout() {
      this.$store
        .dispatch("logout")
        .then(() => {
          this.user = null;
          this.$router.go();
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  components: {},
};
</script>


