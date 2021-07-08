<template>
  <li class="comments__list">
    <template v-if="!isShowCommentsEditForm">
      <!-- 댓글쓴 유저의 프로필 이미지 -->
      <profile-image :profileImage="profileImage"></profile-image>

      <!-- 댓글 -->
      <div class="comments__container">
        <!-- 댓글내용 -->
        <comments-contents
          :username="username"
          :contents="contents"
          :isShowCommentsOptionButton="isShowCommentsOptionButton"
          :isShowCommentsOptionForm="isShowCommentsOptionForm"
          @mouseenter="onIsShowCommentsOptionButton"
          @mouseleave="offIsShowCommentsOptionButton"
          @toggle:showCommentsOptionForm="toggleIsShowCommentsOptionForm"
        ></comments-contents>

        <!-- 댓글밑에 추가정보 및 기능 -->
        <comments-footer :commentsId="commentsId" :createdAt="createdAt"></comments-footer>
      </div>
    </template>

    <!-- 댓글 수정버튼 클릭시 -->
    <template v-else>
      <!-- 댓글 수정폼 -->
      <comments-input
        :profileImage="profileImage"
        :contents="contents"
        @submit:comments="onEditComments"
        @close:commentInput="offIsShowCommentsEditForm"
        v-if="isShowCommentsEditForm"
      ></comments-input>
    </template>

    <!-- 댓글 수정 및 삭제버튼 -->
    <form-comments-option
      :username="username"
      @show:editCommentFrom="togleIsShowCommentsEditForm"
      @delete:comments="onDeleteComments"
      v-if="isShowCommentsOptionForm"
    ></form-comments-option>
  </li>
</template>

<script>
import { editComments, deleteComments } from "@/api/index.js";
import ProfileImage from "@/components/common/ProfileImage.vue";
import CommentsContents from "@/components/comments/CommentsContents.vue";
import CommentsFooter from "@/components/comments/CommentsFooter.vue";
import FormCommentsOption from "@/components/form/FormCommentsOption.vue";
import CommentsInput from "@/components/comments/CommentsInput.vue";

export default {
  name: "CommentsShow",
  components: {
    ProfileImage,
    CommentsContents,
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
    // 댓글옵션버튼 보일지말지
    onIsShowCommentsOptionButton() {
      this.isShowCommentsOptionButton = true;
    },
    offIsShowCommentsOptionButton() {
      this.isShowCommentsOptionButton = false;
    },
    // 댓글 수정폼 보일지말지
    togleIsShowCommentsEditForm() {
      this.isShowCommentsEditForm = !this.isShowCommentsEditForm;
    },
    offIsShowCommentsEditForm() {
      this.isShowCommentsEditForm = false;
    },
    // 댓글옵션폼 보일지말지 토글
    toggleIsShowCommentsOptionForm(value) {
      this.isShowCommentsOptionForm = value;
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

.comments__container {
  flex-grow: 1;
}
</style>
