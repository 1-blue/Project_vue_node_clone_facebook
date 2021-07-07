<template>
  <li class="comments__list" @mouseenter="onIsShowCommentsOptionButton" @mouseleave="offIsShowCommentsOptionButton">
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
          <i
            class="fas fa-ellipsis-h comment__option__button"
            @click="togleIsShowCommentsOptionForm"
            ref="commentsOptionButton"
            v-show="isShowCommentsOptionButton"
          ></i>
        </div>

        <!-- 댓글밑에 추가정보 및 기능 -->
        <comments-footer :createdAt="createdAt"></comments-footer>
      </div>

      <!-- 댓글 수정 및 삭제버튼 -->
      <form-comments-option
        :username="username"
        :commentsId="commentsId"
        @show:editCommentFrom="togleIsShowCommentsEditForm"
        @delete:comments="onDeleteComments"
        v-if="isShowCommentsOptionForm"
      ></form-comments-option>
    </template>
    <template v-else>
      <!-- 댓글 수정폼 -->
      <comments-input
        :profileImage="profileImage"
        :postId="postId"
        :contents="contents"
        @close:commentEdit="offIsShowCommentsEditForm"
        @submit:comments="onEditComments"
        v-if="isShowCommentsEditForm"
      ></comments-input>
    </template>
  </li>
</template>

<script>
import { editComments, deleteComments } from "@/api/index.js";
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
      isShowCommentsOptionForm: false,
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
        this.isShowCommentsOptionForm = false;
        return;
      }
      this.isShowCommentsOptionForm = true;
      return;
    },
  },
  methods: {
    // 댓글수정
    async onEditComments(contents) {
      try {
        await editComments({ commentsId: this.commentsId, contents });
        this.$emit("fetch:comments");
        this.offIsShowCommentsEditForm();
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
    // 댓글삭제
    async onDeleteComments() {
      try {
        await deleteComments(this.commentsId);
        this.$emit("fetch:comments");
      } catch (error) {
        switch (error.response.status) {
          case 503:
            alert(error.response.data.message);
            break;

          default:
            alert("알 수 없는 에러 by FormCommentsOption.vue");
            break;
        }
      }
    },
    // 댓글옵션버튼
    onIsShowCommentsOptionButton() {
      this.isShowCommentsOptionButton = true;
    },
    offIsShowCommentsOptionButton() {
      this.isShowCommentsOptionButton = false;
    },
    // 댓글 수정폼
    togleIsShowCommentsEditForm() {
      this.isShowCommentsEditForm = !this.isShowCommentsEditForm;
    },
    offIsShowCommentsEditForm() {
      this.isShowCommentsEditForm = false;
    },
    // 댓글옵션
    togleIsShowCommentsOptionForm() {
      this.isShowCommentsOptionForm = !this.isShowCommentsOptionForm;
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
