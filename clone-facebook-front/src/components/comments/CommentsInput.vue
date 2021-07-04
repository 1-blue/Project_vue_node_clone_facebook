<template>
  <section id="comments__input">
    <profile-image :profileImage="profileImage"></profile-image>
    <form class="form__comments" @submit.prevent>
      <textarea type="text" placeholder="댓글을 입력하세요..." class="textarea__comments" rows="1" @keyup="resize" @keydown.shift.enter="notThing" @keydown.enter.exact.prevent="inputComments" />
    </form>
  </section>
</template>

<script>
import { uploadComments } from "@/api/index.js";
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
  },
  methods: {
    resize(e) {
      e.target.style.height = e.target.scrollHeight + "px";
    },
    async inputComments(e) {
      if (!e.target.value) {
        return alert("내용을 입력해주세요");
      }
      try {
        await uploadComments(this.postId, e.target.value);
        this.$filter.emitter.emit("fetch:postList");
        e.target.value = "";
      } catch (error) {
        switch (error.response.status) {
          case 503:
            alert(error.response.data.message);
            break;

          default:
            alert("알 수 없는 에러 by PostFooters.vue");
            break;
        }
      }
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
