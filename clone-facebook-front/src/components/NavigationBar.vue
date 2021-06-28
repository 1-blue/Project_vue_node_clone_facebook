<template>
  <section id="navigation__bar" class="shadow">
    <ul class="navigation__container" @click="appendDecorationToLink">
      <!-- 네비게이션바 좌측영역 -->
      <li class="navigation__container__left">
        <!-- 메인로고 -->
        <router-link to="/">
          <i class="fab fa-facebook" ref="logo"></i>
        </router-link>
      </li>

      <!-- 네비게이션바 중간영역 -->
      <li class="navigation__container__middle" ref="test">
        <!-- 메인페이지 -->
        <router-link to="/">
          <i class="fas fa-home icon__home" ref="home"></i>
        </router-link>
        <!-- 친구페이지 -->
        <router-link to="/friend">
          <i class="fas fa-user-friends icon__friend"></i>
        </router-link>
        <!-- 햄버그메뉴 -->
        <router-link to="/bookmark">
          <i class="fas fa-bars icon__hamburger" @click="openLinks"></i>
        </router-link>
      </li>

      <!-- 네비게이션바 우측영역 -->
      <li class="navigation__container__right">
        <!-- 내 정보 페이지 -->
        <router-link to="/information/1" class="my__info__link" ref="information">
          <i class="fas fa-user-circle icon__user" ref="informationIcon"></i>
          <span ref="informationText" class="my__info__link__username">{{ username }}</span>
        </router-link>
        <!-- 글쓰기 -->
        <router-link to="/post">
          <i class="fas fa-edit icon__post" ref="post"></i>
        </router-link>
        <!-- 메신저 -->
        <i class="fab fa-facebook-messenger icon__messenger" ref="messenger"></i>
        <!-- 계정 -->
        <div class="wrapper__option__form">
          <i class="fas fa-arrow-circle-down icon__account" ref="account" @click="isShowOption = !isShowOption"></i>
          <form-navigation-option v-show="isShowOption"></form-navigation-option>
        </div>
        <!-- 깃헙 -->
        <a href="https://github.com/1-blue">
          <i class="fab fa-github icon__github" ref="github"></i>
        </a>
      </li>
    </ul>
  </section>
</template>

<script>
import FormNavigationOption from "@/components/form/FormNavigationOption.vue";

export default {
  name: "NavigationBar",
  components: {
    FormNavigationOption,
  },
  data() {
    return {
      isShowOption: false,
    };
  },
  computed: {
    currentLink() {
      return this.$store.state.currentLink;
    },
    currentClickNode() {
      return this.$store.state.currentClickNode;
    },
    username() {
      return this.$store.state.name;
    },
    _$information() {
      return this.$refs.information.$el;
    },
    _$informationIcon() {
      return this.$refs.informationIcon;
    },
    _$informationText() {
      return this.$refs.informationText;
    },
    _$messenger() {
      return this.$refs.messenger;
    },
    _$post() {
      return this.$refs.post;
    },
    _$account() {
      return this.$refs.account;
    },
    _$github() {
      return this.$refs.github;
    },
    _$logo() {
      return this.$refs.logo;
    },
    _$home() {
      return this.$refs.home;
    },
  },
  mounted() {
    // 링크 데코레이션 초기값 지정
    this.$store.state.currentLink = this._$home;
    this.$store.state.homeLink = this._$home;

    this.linkDecoration(this._$home);
    // 최초 로그인시에만 실행하도록 변경해야함
    // 새로고침시 자동으로 mounted가 실행되서 홈링크로 데코레이션이 이동됨
  },
  watch: {
    // 옵션창외에 다른 곳을 누르면 옵션창 닫힘
    currentClickNode(clickNode) {
      if (clickNode !== this._$account) {
        this.isShowOption = false;
        this._$account.classList.remove("router__link__active");
        return;
      }
      this.isShowOption = true;
      return;
    },
  },
  methods: {
    openLinks() {
      this.$refs.test.classList.toggle("active");
    },

    appendDecorationToLink(e) {
      // 유저정보 데코레이션
      if (e.target === this._$information) {
        this.userDecoration(e.target);
        return;
      }

      // 유저정보 아이콘, 텍스트 데코레이션
      if (e.target === this._$informationIcon || e.target === this._$informationText) {
        this.userDecoration(this._$information);
        return;
      }

      // 우측영역 데코레이션
      if (e.target === this._$post || e.target === this._$messenger || e.target === this._$github) {
        this.rightDecoration(e.target);
        return;
      }

      // optionButton
      if (e.target === this._$account) {
        if (this.isShowOption) {
          this.rightDecoration(e.target);
        } else {
          this.routerLinkRemove();
        }
        return;
      }

      // 로고 데코레이션
      if (e.target === this._$logo) {
        this.logoDecoration();
        return;
      }

      // 나머지 중간링크누르면 데코레이션
      if (e.target.tagName === "I") {
        this.linkDecoration(e.target);
        return;
      }
    },

    // 유저정보 데코레이션
    userDecoration(target) {
      this.routerLinkRemove();
      target.classList.add("router__link__active");
      this.routerLinkRecode(target);
    },
    // 우측영역 데코레이션
    rightDecoration(target) {
      this.routerLinkRemove();
      target.classList.add("router__link__active");
      this.routerLinkRecode(target);
    },
    // 로고 데코레이션
    logoDecoration() {
      this.routerLinkRemove();
      this.routerLinkRecode(this._$home);
      this.routerLinkAppend(this._$home);
    },
    // 가운데 링크 데코레이션
    linkDecoration(target) {
      this.routerLinkRemove();
      this.routerLinkRecode(target);
      this.routerLinkAppend(target);
    },

    // 클릭한 링크 데코레이션 삭제
    routerLinkRemove() {
      if (this.currentLink) {
        this.$store.dispatch("LINK_REMOVE");
      }
    },
    // 이전에 클릭한 링크 기록하기
    routerLinkRecode(target) {
      this.$store.dispatch("LINK_RECODE", target);
    },
    // 현재 클릭한 링크에 데코레이션 넣기
    routerLinkAppend(target) {
      this.$store.dispatch("LINK_APPEND", target);
    },
  },
};
</script>

<style scoped>
#navigation__bar {
  position: sticky;
  top: 0;
  background: white;
  z-index: 9999;
}

@import "../css/navigation.css";
</style>
