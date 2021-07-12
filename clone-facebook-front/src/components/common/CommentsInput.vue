<template>
  <li id="comments__input">
    <profile-image :profileImage="profileImage"></profile-image>
    <form class="form__comments" @submit.prevent>
      <textarea
        type="text"
        placeholder="댓글을 입력하세요..."
        class="textarea__comments"
        rows="1"
        :value="contents"
        @keyup="resizeContentsBox"
        @keydown.shift.enter="notThing"
        @keydown.enter.exact.prevent="appendComments"
        @keydown.esc.exact="$emit('close:commentInput')"
        v-focus="isFocus"
      />
    </form>
  </li>
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
      // 프로필이미지 이름
      profileImage: "",
    };
  },
  async created() {
    // 로그인한 유저의 프로필이미지이름 가져오기
    const { name } = await getProfileImage();
    this.profileImage = name;
  },
  methods: {
    // 입력창 자동 사이즈조절
    resizeContentsBox(e) {
      e.target.style.height = e.target.scrollHeight + "px";
    },
    // 댓글 추가
    async appendComments(e) {
      if (!e.target.value) {
        return alert("내용을 입력해주세요");
      }
      this.$emit("append:comments", e.target.value);
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
  resizecontentsbox: none;
  overflow: hidden;
}
</style>
