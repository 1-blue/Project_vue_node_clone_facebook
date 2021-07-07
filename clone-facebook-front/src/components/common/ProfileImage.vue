<template>
  <section id="profile__image">
    <!-- 포스트의 유저 이미지 -->
    <img :src="myProfileImage" alt="기본이미지" class="user__image shadow" :style="style" v-if="profileImage" />
    <!-- 포스트의 유저 기본 이미지 -->
    <img src="@/assets/user-default.png" alt="기본이미지" class="user__image shadow" v-else />
  </section>
</template>

<script>
export default {
  name: "ProfileImage",
  props: {
    profileImage: {
      type: String,
      default: "",
    },
    size: {
      type: Number,
      required: false,
    },
  },
  computed: {
    myProfileImage() {
      return `http://localhost:3000/image/profile/${this.profileImage}`;
    },
    // 수정 필요
    style() {
      return `width: ${this.size}px; height: ${this.size}px`;
    },
  },
};
</script>

<style scoped>
.user__image {
  border-radius: 100%;
  width: 30px;
  height: 30px;
  opacity: 0.8;
  transition: all 0.5s;
  cursor: pointer;
  margin-right: 0.5rem;
}
.user__image:hover {
  opacity: 1;
}
</style>
