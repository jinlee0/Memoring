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
import { mapGetters, mapMutations } from "vuex";
import axios from "axios";

export default {
  name: "LogIn",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapMutations(["setIsAuth", "setUser"]),
    async onClickLogin() {
      // 인증
      const loginRes = await axios
        .post("/api/auth/login", {
          email: this.email,
          password: this.password,
        })
        .catch((err) => {
          console.error(err);
          alert("로그인 실패");
          return false;
        });
      console.log(loginRes);
      // 성공 시 세션에 인증 정보 저장
      // redirect to '/'
      if (!this.getIsAuth) {
        this.setIsAuth(true);
        this.setUser({ email: this.email, nick: "Jin", id: 0 });
        this.$router.push("/");
        return true;
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
