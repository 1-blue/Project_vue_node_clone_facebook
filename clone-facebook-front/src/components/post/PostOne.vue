<template>
  <li class="post shadow">
    <!-- 게시글 작성자와 수정삭제버튼 및 작성시간 -->
    <post-title
      :postId="postId"
      :updatedAt="updatedAt"
      :userInfo="userInfo"
      @show:editForm="onShowEditForm"
      @delete:post="onDeletePost"
    ></post-title>
    <hr />
    <post-contents :contents="contents"></post-contents>
    <hr />
    <post-footers
      :like="like"
      :comments="comments"
      :commentsFetchCount="commentsFetchCount"
      :commentsCount="commentsCount"
      @appendOrDelete:like="appendOrDeleteLike"
      @fetch:comments="onFetchPostOfComments"
      @submit:comments="appendComments"
      @loading:comments="loadingComments"
    ></post-footers>

    <!-- 게시글 수정 폼 -->
    <template v-if="isShowEditForm">
      <form-edit-post :post="post" @close:EditForm="onCloseEditForm" @edit:post="onEditPost"></form-edit-post>
    </template>
  </li>
</template>

<script>
import {
  fetchPostOfUserInfo,
  deletePost,
  editPost,
  fetchPostOfLike,
  appendLike,
  removeLike,
  fetchPostOfComments,
  getCommentsCount,
  uploadComments,
} from "@/api/index.js";
import PostTitle from "@/components/post/PostTitle.vue";
import PostContents from "@/components/post/PostContents.vue";
import PostFooters from "@/components/post/PostFooters.vue";
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

      // 해당 게시글의 좋아요
      like: [],

      // 해당 게시글의 댓글
      comments: [],

      // 패치할 댓글 개수
      commentsFetchCount: 5,

      // 총 댓글개수
      commentsCount: 0,

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
    // 게시글에 좋아요 누른 유저 정보 가져오기
    this.onFetchPostOfLike();
    // 게시글의 총 댓글개수 세기
    this.onFetchCommentsCount();
  },
  methods: {
    // 게시글 작성자정보 불러오기
    async onFetchPostOfUserInfo() {
      const { User } = await fetchPostOfUserInfo(this.postId);
      this.userInfo = User;
    },
    // 게시글의 좋아요정보 불러오기
    async onFetchPostOfLike() {
      const { Likes } = await fetchPostOfLike(this.postId);
      this.like = Likes;
    },
    // 총댓글 개수 가져오기
    async onFetchCommentsCount() {
      const response = await getCommentsCount(this.postId);
      this.commentsCount = response.Comments[0] ? response.Comments[0].commentCount : 0;
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
    // 좋아요 추가 및 삭제
    async appendOrDeleteLike(previousClickLike) {
      try {
        if (previousClickLike) {
          await removeLike(previousClickLike._id);
        } else {
          await appendLike(this.postId);
        }

        this.onFetchPostOfLike();
      } catch (error) {
        switch (error.response.status) {
          case 503:
            alert(error.response.data.message);
            break;

          default:
            alert("알 수 없는 에러 by PostOne.vue");
            break;
        }
      }
    },
    // 게시글의 댓글 불러오기
    async onFetchPostOfComments() {
      const { Comments } = await fetchPostOfComments(this.postId, this.commentsFetchCount);
      this.comments = Comments;

      // 댓글 삭제시 5개 이하가 되면 댓글 더보기 버튼 없애기 위함
      this.onFetchCommentsCount();
    },
    // 댓글달기
    async appendComments(contents) {
      try {
        await uploadComments(this.postId, contents);
        this.onFetchPostOfComments();
        this.onFetchCommentsCount();
      } catch (error) {
        switch (error.response.status) {
          case 503:
            alert(error.response.data.message);
            break;

          default:
            alert("알 수 없는 에러 by PostComments.vue");
            break;
        }
      }
    },
    // 패치할 댓글개수 늘리기
    loadingComments() {
      this.commentsFetchCount += 5;
      this.onFetchPostOfComments();
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
