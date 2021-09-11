<template>
  <div id="sign">
    <img src="./../assets/logo.png" alt="" />
    <LogIn v-if="path == 'log-in'"></LogIn>
    <SignUp v-if="path == 'sign-up'"></SignUp>
  </div>
</template>

<script>
import LogIn from "./LogIn.vue";
import SignUp from "./SignUp.vue";

export default {
  name: "Sign",
  props: {
    path: String,
  },
  components: {
    LogIn,
    SignUp,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.common-box {
  width: 300px;
  max-width: 50%;
  max-height: 43%;
  margin: 0 auto;
  background-color: lightgray;
  padding: 10px;
}
.input-list {
  width: 98%;
  padding: 3px;
}
.input-list > li {
  display: flex;
  width: 98%;
  margin: 1px auto;
  padding: 0;
}

.big-button {
  display: block;
  width: 100%;
  min-height: 40px;
  margin: 2px auto;
}
.big-button:hover {
  cursor: pointer;
}
#login-button {
  background-color: rgb(26, 188, 156);
  color: white;
  font-size: 1.2em;
  border: none;
}
#signup-button {
  background-color: rgb(52, 152, 219);
  color: white;
  font-size: 1.2em;
  border: none;
}
</style>
