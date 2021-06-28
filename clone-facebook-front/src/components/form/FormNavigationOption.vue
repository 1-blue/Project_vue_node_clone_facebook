<template>
  <section id="form__navigation__option">
    <form class="option__form shadow">
      <ul class="container__option__form">
        <!-- 프로필 -->
        <li>
          <button type="button">
            <i class="fas fa-user-circle"></i>
            <span class="button__text">내 프로필 보기</span>
          </button>
        </li>

        <!-- 의견보내기 -->
        <li>
          <button type="button">
            <i class="fas fa-exclamation-circle"></i>
            <span class="button__text">의견보내기</span>
          </button>
        </li>

        <!-- 설정 -->
        <li>
          <button type="button">
            <i class="fas fa-cogs"></i>
            <span class="button__text">설정 및 개인정보</span>
          </button>
        </li>

        <!-- 도움말 -->
        <li>
          <button type="button">
            <i class="fas fa-question-circle"></i>
            <span class="button__text">도움말 및 지원</span>
          </button>
        </li>

        <!-- 디스플레이 -->
        <li>
          <button type="button">
            <i class="fas fa-moon"></i>
            <span class="button__text">디스플레이 및 접근성</span>
          </button>
        </li>

        <!-- 로그아웃 -->
        <li>
          <button type="button" @click="logout">
            <i class="fas fa-sign-out-alt"></i>
            <span class="button__text">로그아웃</span>
          </button>
        </li>
      </ul>
    </form>
  </section>
</template>

<script>
import { authLogout } from "@/api/index.js";

export default {
  name: "FormNavigationOption",
  methods: {
    async logout() {
      try {
        await authLogout();
        this.$store.dispatch("LOGOUT");
        alert("로그아웃이 완료되었습니다. 로그인페이지로 이동합니다.");
        this.$router.push("/login");
      } catch (error) {
        switch (error.response.status) {
          // 로그아웃중 발생한 에러
          case 400:
            alert(error.response.data.message);
            break;

          // 로그인안하고 로그아웃접근
          case 403:
            alert(error.response.data.message);
            break;

          default:
            break;
        }
      }
    },
  },
};
</script>

<style scoped>
#form__navigation__option {
}

.option__form {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 10vh;
  right: 0;
  width: 25vw;
  background: white;
  padding: 1rem;
  border-radius: 0.5rem;
}

.option__form button {
  padding: 1rem 0;
  border: none;
  background: transparent;
  width: 100%;
  border-radius: 0.4rem;
  transition: all 0.5s;
  cursor: pointer;
  text-align: start;
}

.option__form button:hover {
  background: var(--gray-color);
}

.button__text {
  vertical-align: super;
  font-size: 0.8rem;
  margin-left: 0.5rem;
}
</style>
