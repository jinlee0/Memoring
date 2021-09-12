<template>
  <div id="main">
    <div id="center-box">
      <h1>Memoring</h1>
      <p>Hello {{ user.email }}!!</p>
      <p>Let's Start!</p>
      <div id="button-box">
        <button>Start</button>
        <button>Dictionary</button>
        <button @click="onClickLogout">Logout</button>
      </div>
    </div>
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
  beforeCreate() {
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

<style>
#main {
  width: 100%;
}
#center-box {
  width: 300px;
  margin: 0 auto;
  margin-top: 200px;
}
#button-box {
  width: 100%;
}
#button-box button {
  width: 100%;
  margin: 10px auto;
  border: none;
  border-radius: 10px;
  height: 40px;
}
#button-box button {
  background-color: rgb(52, 152, 219);
  color: white;
  font-size: 1.2em;
}
#button-box button:last-child {
  background-color: rgb(26, 188, 156);
}
#button-box button:hover {
  cursor: pointer;
  background-color: lightgray;
}
</style>

