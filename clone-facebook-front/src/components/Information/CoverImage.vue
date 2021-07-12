<template>
  <section id="cover__image">
    <img
      :src="coverImageLink"
      alt="커버이미지"
      class="cover__image"
      ref="coverImage"
      @click="$emit('show:coverImageChangeForm')"
      v-if="coverImageLink"
    />
    <div class="cover__image" ref="coverImage" @click="$emit('show:coverImageChangeForm')" v-else></div>
  </section>
</template>

<script>
export default {
  name: "CoverImage",
  props: {
    coverImageName: {
      type: String,
      default: "",
    },
  },
  computed: {
    // 커버이미지 위치링크 가져오기
    coverImageLink() {
      return this.coverImageName ? `http://localhost:3000/image/cover/${this.coverImageName}` : null;
    },
    currentClickNode() {
      return this.$store.state.link.currentClickNode;
    },
  },
  watch: {
    currentClickNode(value) {
      // 커버이미지외 다른거 클릭시 form 닫기
      if (value !== this.$refs.coverImage) {
        this.$emit("close:coverImageEditForm");
      }
    },
  },
};
</script>

<style scoped>
#cover__image {
  position: relative;
  background: var(--light-gray-color);
  width: 100%;
  max-height: 100%;
  border-radius: 0 0 1rem 1rem;
  box-shadow: 0 0 10px grey;
  cursor: pointer;
}
.cover__image {
  width: 100%;
  /* 임시로 px함... 아니 부모의 100%했는데 부모의 크기를 넘어가는데 이유가 뭐지? */
  height: 354px;
  border-radius: 0 0 1rem 1rem;
}
</style>
