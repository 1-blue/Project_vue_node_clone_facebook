<template>
  <section id="login__page">
    <!-- 로그인폼 -->
    <form-login
      :isBlind="isBlind"
      @change:isBlind="isBlind = !isBlind"
      @change:isRegister="closeRegisterForm"
      @submit:login="login"
    ></form-login>

    <!-- 회원가입폼 -->
    <template v-if="isRegister">
      <form-register @close:registerForm="closeRegisterForm" @submit:register="register"></form-register>
    </template>
  </section>
</template>

<script>
import { authLogin, applyRegister } from "@/api/index.js";
import FormLogin from "@/components/Auth/FormLogin.vue";
import FormRegister from "@/components/Auth/FormRegister.vue";

export default {
  name: "LoginPage",
  components: {
    FormLogin,
    FormRegister,
  },
  data() {
    return {
      // 비밀번호 보여줄지말지
      isBlind: false,

      // 회원가입폼 보여줄지말지
      isRegister: false,
    };
  },
  methods: {
    // 로그인
    async login(information) {
      try {
        // 로그인시도
        const data = await authLogin(information);

        // 로그인한 유저 쿠키 생성
        this.$store.dispatch("auth/SET_USER", data);

        // 메인페이지로 이동
        this.$router.push("/");
      } catch (error) {
        if (error.response) {
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
            case 503:
              alert("서버측 에러입니다. 잠시후에 다시 로그인해주세요.");
              break;

            default:
              alert("알 수 없는 에러 by AuthPage.vue");
              console.error(error);
              break;
          }
        } else {
          console.error("프론트측 에러 by AuthPage.vue", error);
        }
      }
    },
    // 회원가입
    async register(information, profileImage) {
      // 회원가입데이터 정확히 기재했는지 확인
      if (this.authRegister(information)) {
        return;
      }

      // 회원가입에 사용할 데이터로 가공
      this.processingRegister(information, profileImage);

      // 서버로 전송
      try {
        await applyRegister(information);
        alert("회원가입에 성공하셨습니다. 로그인페이지로 이동합니다.");
        this.closeRegisterForm();
      } catch (error) {
        switch (error.response.status) {
          // 이미 로그인한 상태
          case 403:
            alert(error.response.data.message);
            break;

          // 아이디나 이메일 중복시
          case 409:
            alert(error.response.data.message);
            break;

          // 서버측 에러
          case 500:
            alert("서버측 에러입니다. 잠시후에 다시시도해주세요");
            break;

          // 프로필이미지 업로드 에러
          case 503:
            alert(error.response.data.message);
            break;

          default:
            break;
        }
      }
    },
    // 회원가입 정보를 정확히 기재했는지 확인
    authRegister(information) {
      // 이름적었는지 확인
      if (information.name.length === 0) {
        alert("이름을 적어주세요");
        return true;
      }

      // 아이디적었는지 확인
      if (information.id.length === 0) {
        alert("아이디를 적어주세요");
        return true;
      }

      // 패스워드적었는지 확인
      if (information.password.length === 0) {
        alert("비밀번호를 적어주세요");
        return true;
      }

      // 이메일 유효인증
      if (!this.$filter.validateEmail(information.email)) {
        alert("이메일이 유효한 형식이 아닙니다.");
        return true;
      }

      return false;
    },
    // 회원가입 데이터 가공
    processingRegister(information, profileImage) {
      // 날짜형식변환
      information.year = String(information.year);
      if (information.month < 10) {
        information.month = "0" + String(information.month);
      }
      if (information.day < 10) {
        information.day = "0" + String(information.day);
      }
      information.birthday = `${information.year}-${information.month}-${information.day}`;

      // 프로필이미지 등록
      information.profileImage = profileImage.files[0];
    },
    // 회원가입창 닫기
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
