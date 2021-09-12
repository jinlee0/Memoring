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
    <div id="menu-box">
      <div><input type="checkbox" id="login-save" />로그인 정보 저장</div>
      <a href="#">계정 찾기</a>
    </div>
    <button id="login-button" class="big-button" @click="onClickLogin">
      로그인
    </button>
    <router-link to="/auth/sign-up">
      <button id="signup-button" class="big-button">회원가입</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "LogIn",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    onClickLogin() {
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          if (res.status == 200) {
            this.$router.push({ name: "home" });
          }
        })
        .catch((err) => {
          alert(err.msg);
        });
    },
  },
  computed: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
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
#menu-box {
  display: flex;
  justify-content: space-between;
}
</style>
