<template>
  <li class="post shadow">
    <!-- 게시글 작성자와 수정삭제버튼 및 작성시간 -->
    <post-title
      :updatedAt="updatedAt"
      :userInfo="userInfo"
      @show:editForm="onShowEditForm"
      @delete:post="onDeletePost"
    ></post-title>
    <hr />

    <!-- 게시글의 내용 -->
    <post-contents :contents="contents"></post-contents>
    <hr />

    <!-- 게시글의 좋아요 및 댓글 -->
    <post-footers :postId="postId"></post-footers>

    <!-- 게시글 수정 폼 -->
    <template v-if="isShowEditForm">
      <form-edit-post :post="post" @close:EditForm="onCloseEditForm" @edit:post="onEditPost"></form-edit-post>
    </template>
  </li>
</template>

<script>
import { fetchPostOfUserInfo, deletePost, editPost } from "@/api/index.js";
import PostTitle from "@/components/Home/Post/PostTitle.vue";
import PostContents from "@/components/Home/Post/PostContents.vue";
import PostFooters from "@/components/Home/Post/PostFooters.vue";
import FormEditPost from "@/components/form/FormEditPost.vue";

export default {
  name: "PostOne",
  components: {
    PostTitle,
    PostContents,
    PostFooters,
    FormEditPost,
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      // PostTitle 사용 ( 작성자, 작성자의 프로필이미지 )
      userInfo: {},

      // 게시글 수정폼 show
      isShowEditForm: false,
    };
  },
  computed: {
    username() {
      return this.post.User.name;
    },
    updatedAt() {
      return this.post.updatedAt;
    },
    contents() {
      return this.post.contents;
    },
    postId() {
      return this.post._id;
    },
  },
  async created() {
    // 게시글에 댓글단 유저 정보 가져오기
    this.onFetchPostOfUserInfo();
  },
  methods: {
    // 게시글 작성자정보 불러오기
    async onFetchPostOfUserInfo() {
      const { User } = await fetchPostOfUserInfo(this.postId);
      this.userInfo = User;
    },
    // 게시글 삭제
    async onDeletePost() {
      try {
        await deletePost(this.postId);

        alert("게시글 삭제가 완료되었습니다.");

        // 게시글을 다시 패치하기
        this.$filter.emitter.emit("fetch:postList");
      } catch (error) {
        if (error.response) {
          switch (error.response.status) {
            case 500:
              alert(error.response.message);
              break;
          }
        } else {
          console.error("FormPostOption.vue >> ", error);
        }
      }
    },
    // 게시글 수정
    async onEditPost(title, contents) {
      try {
        // 수정
        await editPost({
          _id: this.postId,
          title,
          contents,
        });

        // 포스트정보 다시 패치
        this.$filter.emitter.emit("fetch:postList");

        // 업데이트폼 닫기
        this.onCloseEditForm();
        alert("수정이 완료되었습니다.");
      } catch (error) {
        if (error.response) {
          switch (error.response.status) {
            case 503:
              alert(error.response.message);
              break;
          }
        } else {
          alert("FormEditPost.vue >> ", error);
        }
      }
    },
    onShowEditForm() {
      this.isShowEditForm = !this.isShowEditForm;
    },
    onCloseEditForm() {
      this.isShowEditForm = false;
    },
  },
};
</script>

<style scoped>
.post {
  min-width: 40vw;
  background: white;
  border-radius: 0.2rem;
  margin: 0.5rem 0;
}
</style>
