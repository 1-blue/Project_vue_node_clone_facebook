<template>
  <section id="comments__input">
    <profile-image :profileImage="profileImage"></profile-image>
    <form class="form__comments" @submit.prevent>
      <textarea
        type="text"
        placeholder="댓글을 입력하세요..."
        class="textarea__comments"
        rows="1"
        :value="contents"
        @keyup="resize"
        @keydown.shift.enter="notThing"
        @keydown.enter.exact.prevent="inputComments"
        @keydown.esc.exact="$emit('close:commentEdit')"
        v-focus="isFocus"
      />
    </form>
  </section>
</template>

<script>
import ProfileImage from "@/components/common/ProfileImage.vue";

export default {
  name: "CommentsInput",
  components: {
    ProfileImage,
  },
  props: {
    postId: {
      type: Number,
      required: true,
    },
    profileImage: {
      type: String,
      required: true,
    },
    isFocus: {
      type: Boolean,
      default: false,
    },
    contents: {
      type: String,
      default: "",
    },
  },
  methods: {
    resize(e) {
      e.target.style.height = e.target.scrollHeight + "px";
    },
    async inputComments(e) {
      if (!e.target.value) {
        return alert("내용을 입력해주세요");
      }
      this.$emit("submit:comments", e.target.value);
      e.target.value = "";
    },
  },
};
</script>

<style scoped>
#comments__input {
  display: flex;
}

.form__comments {
  flex-grow: 1;
  width: 100%;
}

.textarea__comments {
  width: 100%;
  border-radius: 1rem;
  border: none;
  background: var(--gray-color);
  padding: 0.5rem;
  resize: none;
  overflow: hidden;
}
</style>
