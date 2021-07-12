<template>
  <section id="profile__image">
    <img
      :src="profileImageLink"
      alt="프로필이미지"
      class="profile__image shadow"
      ref="profileImage"
      @click="$emit('show:profileImageChangeForm')"
      v-if="profileImageLink"
    />
    <img
      src="@/assets/user-default.png"
      alt="프로필이미지"
      class="profile__image shadow"
      ref="profileImage"
      @click="$emit('show:profileImageChangeForm')"
      v-else
    />
  </section>
</template>

<script>
export default {
  name: "ProfileImage",
  props: {
    profileImageName: {
      type: String,
      default: "",
    },
  },
  computed: {
    // 프로필이미지 링크 가져오기
    profileImageLink() {
      return this.profileImageName ? `http://localhost:3000/image/profile/${this.profileImageName}` : null;
    },
    currentClickNode() {
      return this.$store.state.link.currentClickNode;
    },
  },
  watch: {
    currentClickNode(value) {
      // 프로필이미지외 다른거 클릭시 form 닫기
      if (value !== this.$refs.profileImage) {
        this.$emit("close:profileImageEditForm");
      }
    },
  },
};
</script>

<style scoped>
#profile__image {
  position: relative;
  top: -30%;
}
.profile__image {
  width: 168px;
  height: 168px;
  border-radius: 100%;
  border: 0.2rem solid gray;
  cursor: pointer;
}
.profile__image:hover {
  /* 임시 */
  opacity: 0.9;
}
</style>
