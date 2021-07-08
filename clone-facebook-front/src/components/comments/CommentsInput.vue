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
        @keydown.enter.exact.prevent="submitComments"
        @keydown.esc.exact="$emit('close:commentInput')"
        v-focus="isFocus"
      />
    </form>
  </section>
</template>

<script>
import { getProfileImage } from "@/api/index.js";
import ProfileImage from "@/components/common/ProfileImage.vue";

export default {
  name: "CommentsInput",
  components: {
    ProfileImage,
  },
  props: {
    isFocus: {
      type: Boolean,
      default: false,
    },
    contents: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      profileImage: "",
    };
  },
  async created() {
    const { name } = await getProfileImage();
    this.profileImage = name;
  },
  methods: {
    resize(e) {
      e.target.style.height = e.target.scrollHeight + "px";
    },
    async submitComments(e) {
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
  width: 100%;
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
