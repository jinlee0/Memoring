<template>
  <div class="common-box">
    <ul class="input-list">
      <li>
        <div>
          <img src="./../assets/logo.png" alt="" />
        </div>
        <input type="email" required placeholder="이메일" />
      </li>
      <li>
        <div>
          <img src="./../assets/logo.png" alt="" />
        </div>
        <input type="password" required placeholder="비밀번호" />
      </li>
    </ul>
    <div id="menu-box">
      <div><input type="checkbox" id="login-save" />로그인 정보 저장</div>
      <a href="#">계정 찾기</a>
    </div>
    <button id="login-button" class="big-button" @click="onClickLoginButton">
      로그인
    </button>
    <router-link to="/auth/sign-up">
      <button id="signup-button" class="big-button">회원가입</button>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "LogIn",
  props: {
    msg: String,
  },
  methods: {
    onClickLoginButton() {
      // 인증

      // 성공 시 세션에 인증 정보 저장
      // redirect to '/'
      if (!this.getIsAuth) {
        this.$store.commit("setIsAuth", true);
        this.$router.push("/");
        return true;
      } else {
        // 실패 시
        alert("already logged in");
        return false;
      }
    },
  },
  computed: {
    ...mapGetters(["getIsAuth"]),
  },
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
