<template>
  <section id="information__page">
    <section class="image">
      <!-- 커버이미지 -->
      <div class="cover__image">커버이미지영역</div>

      <div class="container__profile__image">
        <!-- 프로필이미지 -->
        <img :src="myProfileImage" alt="프로필기본이미지" class="profile__image shadow" v-if="profileImage" @click="isShowImageChangeForm = !isShowImageChangeForm" ref="profileImageButton" />
        <img src="@/assets/user-default.png" alt="프로필이미지" class="profile__image shadow" v-else @click="isShowImageChangeForm = !isShowImageChangeForm" ref="profileImageButton" />
        <!-- 프로필이미지 수정폼 -->
        <form-image-change class="profile__image__change__form" v-show="isShowImageChangeForm" @fetch:user="fetchUser"></form-image-change>
      </div>

      <!-- 이름 -->
      <span class="name">{{ name }}</span>
      <span class="introduce">소개추가</span>
    </section>
    <section class="navigation shadow">네비게이션</section>
    <section class="temp"></section>
  </section>
</template>

<script>
import { fetchInformation } from "@/api/index.js";
import FormImageChange from "@/components/form/FormImageChange.vue";

export default {
  name: "InformationPage",
  components: {
    FormImageChange,
  },
  data() {
    return {
      data: null,
      isShowImageChangeForm: false,
    };
  },
  computed: {
    profileImage() {
      if (!this.data) return;
      return this.data.Images[0].name;
    },
    myProfileImage() {
      return `http://localhost:3000/image/${this.profileImage}`;
    },
    name() {
      if (!this.data) return;
      return this.data.name;
    },
    currentClickNode() {
      return this.$store.state.currentClickNode;
    },
  },
  watch: {
    currentClickNode(value) {
      if (value === this.$refs.profileImageButton) return;
      this.isShowImageChangeForm = false;
    },
  },
  created() {
    this.fetchUser();
  },
  methods: {
    async fetchUser() {
      this.data = await fetchInformation();
    },
  },
};
</script>

<style scoped>
#information__page {
  display: flex;
  flex-direction: column;
}

.image {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 70vh;
  background: white;
}
.cover__image {
  background: var(--light-gray-color);
  width: 70%;
  min-height: 75%;
  border-radius: 0 0 1rem 1rem;
}
.container__profile__image {
  position: relative;
  top: -30%;
}
.profile__image {
  width: 168px;
  height: 168px;
  border-radius: 100%;
  border: 0.1rem solid gray;
  cursor: pointer;
}
.profile__image__change__form {
  position: absolute;
  bottom: -60%;
  left: 0;
  transform: translateX(-25%);
  z-index: 9999;
}
.name {
  position: relative;
  top: -30%;
  font-size: 2.5rem;
  font-weight: bold;
}
.introduce {
  position: relative;
  top: -30%;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--main-color);
}

.navigation {
  height: 10vh;
  background: white;
}
</style>
