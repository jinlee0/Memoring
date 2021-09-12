<template>
  <div class="common-box">
    <ul class="input-list">
      <li>
        <div>
          <img src="./../assets/logo.png" alt="" />
        </div>
        <input type="email" v-model="email" required placeholder="이메일" />
      </li>
      <li>
        <div>
          <img src="./../assets/logo.png" alt="" />
        </div>
        <input
          type="password"
          v-model="password"
          required
          placeholder="비밀번호"
        />
      </li>
    </ul>
    <button id="signup-button" class="big-button" @click="onClickSignUp">
      회원가입
    </button>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async onClickSignUp() {
      this.$store
        .dispatch("signup", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          if (res.status == 201) {
            this.$router.push({ name: "home" });
          }
        })
        .catch((err) => {
          alert(err.msg);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.input-list > li > div {
  display: inline-block;
  width: 15%;
  margin: 0;
  background-color: gray;
}
.input-list > li > div > img {
  width: 100%;
}
.input-list > li > input {
  width: 85%;
  padding: 2px;
  font-size: 1.2em;
}
</style>
