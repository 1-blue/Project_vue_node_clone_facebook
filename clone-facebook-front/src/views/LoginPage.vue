<template>
  <section id="login__page">
    <!-- 로그인폼 -->
    <login-form :isBlind="isBlind" @change:isBlind="changeIsBlind" @change:isRegister="changeIsRegister"></login-form>

    <!-- 회원가입폼 -->
    <template v-if="isRegister">
      <register-form @close:registerForm="closeRegisterForm"></register-form>
    </template>
  </section>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";
import RegisterForm from "@/components/RegisterForm.vue";

export default {
  name: "LoginPage",
  components: {
    LoginForm,
    RegisterForm,
  },
  data() {
    return {
      isBlind: false,
      isRegister: false,
    };
  },
  methods: {
    changeIsBlind() {
      this.isBlind = !this.isBlind;
    },
    changeIsRegister() {
      this.isRegister = !this.isRegister;
    },
    closeRegisterForm() {
      this.isRegister = !this.isRegister;
    },
  },
};
</script>

<style scoped>
#login__page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
