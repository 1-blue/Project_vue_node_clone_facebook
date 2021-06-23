<template>
  <section id="login__page">
    <!-- 로그인폼 -->
    <form-login :isBlind="isBlind" @change:isBlind="changeIsBlind" @change:isRegister="changeIsRegister"></form-login>

    <!-- 회원가입폼 -->
    <template v-if="isRegister">
      <form-register @close:registerForm="closeRegisterForm"></form-register>
    </template>
  </section>
</template>

<script>
import FormLogin from "@/components/form/FormLogin.vue";
import FormRegister from "@/components/form/FormRegister.vue";

export default {
  name: "LoginPage",
  components: {
    FormLogin,
    FormRegister,
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
