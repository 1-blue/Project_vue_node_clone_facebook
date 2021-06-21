<template>
  <form @submit.prevent class="login__page__form">
    <!-- 아이디 -->
    <input type="text" placeholder="아이디입력" class="input__id" v-model="information.id" />

    <!-- 비밀번호 -->
    <div class="container__password">
      <input :type="passwordType" placeholder="비밀번호입력" class="input__password" v-model="information.password" />

      <!-- 비밀번호 type설정 -->
      <template v-if="isBlind">
        <i class="far fa-eye-slash icon__blind" @click="$emit('change:isBlind')"></i>
      </template>
      <template v-else>
        <i class="far fa-eye icon__blind" @click="$emit('change:isBlind')"></i>
      </template>
    </div>

    <!-- 로그인버튼 -->
    <button type="submit" class="button__submit" @click="login">로그인</button>

    <!-- 회원가입폼열기버튼 -->
    <button type="button" class="button__new__account" @click="$emit('change:isRegister')">새 계정 만들기</button>
  </form>
</template>

<script>
import { authLogin } from "@/api/index.js";

export default {
  name: "LoginForm",
  props: {
    isBlind: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      information: {
        id: "",
        password: "",
      },
    };
  },
  computed: {
    passwordType() {
      return this.isBlind === true ? "password" : "text";
    },
  },
  methods: {
    async login() {
      try {
        const data = await authLogin(this.information);
        this.$store.dispatch("SET_USER", data);
        this.$router.push("/");
      } catch (error) {
        console.log(error);
        switch (error.response.status) {
          // 로그인후에 로그인접근하는 경우
          case 403:
            alert(error.response.data.message);
            break;

          // 아이디나 비밀번호 불일치
          case 409:
            alert(error.response.data.message);
            break;

          // 서버측 DB에러
          case 500:
            alert("서버측 에러입니다. 잠시후에 다시 로그인해주세요.");
            break;

          default:
            alert(`${error} by LoginForm`);
            break;
        }
      }
    },
  },
};
</script>

<style scoped>
.login__page__form {
  display: flex;
  flex-direction: column;
  min-width: 35vw;
  min-height: 20vh;
  background: white;
  padding: 1rem;
}
.input__id,
.input__password {
  width: 100%;
  padding: 1.1rem 1.2rem;
  padding-right: 3rem;
  margin: 0.5rem 0;
  border-radius: 1em;
  border: 1px solid #dddfe2;
  background: #e8f0fe;
}
.input__id:focus,
.input__password:focus {
  border: 1px solid blue;
}

.container__password {
  position: relative;
}
.icon__blind {
  position: absolute;
  top: 40%;
  right: 5%;
  cursor: pointer;
}

.button__submit,
.button__new__account {
  background-color: #1877f2;
  border: none;
  border-radius: 0.5rem;
  font-weight: bold;
  color: white;
  font-size: 1.2rem;
  padding: 0.6rem 0;
  margin: 0.5rem 0;
  cursor: pointer;
  transition: all 0.5s;
}
.button__new__account {
  background: #42b72a;
}

.button__submit:hover {
  background: #166fe5;
}
.button__new__account:hover {
  background: #36a420;
}
</style>
