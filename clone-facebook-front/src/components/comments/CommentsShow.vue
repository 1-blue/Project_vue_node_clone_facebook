<template>
  <li class="comments__list" @mouseenter="isShowCommentsOptionButton = true" @mouseleave="isShowCommentsOptionButton = false">
    <template v-if="!isShowCommentsEditForm">
      <!-- 댓글쓴 유저의 프로필 이미지 -->
      <profile-image :profileImage="profileImage"></profile-image>

      <!-- 댓글 -->
      <div class="comments__container">
        <div class="comments">
          <!-- 댓글내용 -->
          <pre class="comments__contents">
          <strong>{{ username }}</strong>
          {{ contents }}
        </pre>
          <!-- 댓글 옵션 버튼 ( 수정 및 삭제 ) -->
          <i class="fas fa-ellipsis-h comment__option__button" @click="isShowCommentsOption = !isShowCommentsOption" ref="commentsOptionButton"></i>
        </div>

        <!-- 댓글밑에 추가정보 및 기능 -->
        <comments-footer :createdAt="createdAt"></comments-footer>
      </div>

      <!-- 댓글 수정 및 삭제 -->
      <form-comments-option :username="username" :commentsId="commentsId" v-if="isShowCommentsOption" @show:editCommentFrom="isShowCommentsEditForm = !isShowCommentsEditForm"></form-comments-option>
    </template>
    <template v-else>
      <!-- 댓글 수정폼 -->
      <comments-input
        :profileImage="profileImage"
        :postId="postId"
        :contents="contents"
        v-if="isShowCommentsEditForm"
        @close:commentEdit="isShowCommentsEditForm = false"
        @submit:comments="editComments"
      ></comments-input>
    </template>
  </li>
</template>

<script>
import { apiEditComments } from "@/api/index.js";
import ProfileImage from "@/components/common/ProfileImage.vue";
import CommentsFooter from "@/components/comments/CommentsFooter.vue";
import FormCommentsOption from "@/components/form/FormCommentsOption.vue";
import CommentsInput from "@/components/comments/CommentsInput.vue";

export default {
  name: "CommentsShow",
  components: {
    ProfileImage,
    CommentsFooter,
    FormCommentsOption,
    CommentsInput,
  },
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isShowCommentsOptionButton: false,
      isShowCommentsOption: false,
      isShowCommentsEditForm: false,
    };
  },
  computed: {
    profileImage() {
      return this.comment.User.Images[0].name;
    },
    username() {
      return this.comment.User.name;
    },
    contents() {
      return this.comment.contents;
    },
    createdAt() {
      return this.comment.createdAt;
    },
    commentsId() {
      return this.comment._id;
    },
    currentClickNode() {
      return this.$store.state.currentClickNode;
    },
  },
  watch: {
    // 옵션창외에 다른 곳을 누르면 옵션창 닫힘
    currentClickNode(clickNode) {
      if (clickNode !== this.$refs.commentsOptionButton) {
        this.isShowCommentsOption = false;
        return;
      }
      this.isShowCommentsOption = true;
      return;
    },
  },
  methods: {
    async editComments(contents) {
      try {
        await apiEditComments({ commentsId: this.commentsId, contents });
        this.$filter.emitter.emit("fetch:postList");
      } catch (error) {
        switch (error.response.status) {
          case 503:
            alert(error.response.data.message);
            break;

          default:
            alert("알 수 없는 에러 by CommentsShow.vue");
            break;
        }
      }
    },
  },
};
</script>

<style scoped>
.comments__list {
  position: relative;
  display: flex;
  margin-bottom: 1rem;
}

.comments {
  display: flex;
  align-items: center;
}

.comments__contents {
  display: inline-block;
  margin: 0;
  background: var(--light-gray-color);
  padding: 0.5rem;
  border-radius: 0.5rem;
}

.comment__option__button {
  display: inline-block;
  width: 30px;
  height: 30px;
  font-size: 1rem;
  color: gray;
  margin-left: 1rem;
  padding: 0.5rem;
}
.comment__option__button:hover {
  background: var(--light-gray-color);
  border-radius: 50%;
  cursor: pointer;
}
</style>
