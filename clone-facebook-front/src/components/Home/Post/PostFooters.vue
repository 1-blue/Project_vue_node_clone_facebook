<template>
  <section id="post__footers">
    <!-- 댓글이나 좋아요 개수를 보여주는 영역 -->
    <ul class="show">
      <!-- 좋아요 누른 사람 보여줌 -->
      <li class="like" @mouseenter="showLikeList" @mouseleave="hideLikeList">
        <i class="fas fa-thumbs-up icon__like"></i>
        <span>{{ likeCount }}</span>
        <ul class="like__list" v-show="isShowLikeList">
          <li>좋아요</li>
          <li v-for="temp in like" :key="temp._id">
            {{ temp.User.name }}
          </li>
        </ul>
      </li>
      <!-- 댓글 개수 보여줌 -->
      <li class="comments" @click="clickShowComments">
        <span>댓글 {{ totalCommentsNumber }}개</span>
      </li>
    </ul>

    <hr />

    <!-- 댓글이나 좋아요를 추가하는 영역 -->
    <ul class="execute">
      <li @click="appendOrDeleteLike">
        <i class="far fa-thumbs-up"></i>
        <span v-if="previousClickLike">좋아요 취소</span>
        <span v-else>좋아요</span>
      </li>
      <li @click="clickAddComments">
        <i class="far fa-comment-alt"></i>
        <span>댓글달기</span>
      </li>
      <li>
        <i class="far fa-share-square"></i>
        <span>공유하기</span>
      </li>
    </ul>

    <hr />

    <!-- 게시글의 댓글 리스트 -->
    <post-comments
      :comments="comments"
      :totalCommentsNumber="totalCommentsNumber"
      :isFocus="isFocus"
      @append:comments="appendComments"
      @loading:moreComments="loadingMoreComments"
      @fetch:comments="onFetchPostOfComments"
      v-if="isShowComments"
    ></post-comments>
  </section>
</template>

<script>
import {
  getTotalCommentsNumber,
  fetchPostOfComments,
  fetchPostOfLike,
  uploadComments,
  appendLike,
  removeLike,
} from "@/api/index.js";
import PostComments from "@/components/Home/Post/PostComments.vue";

export default {
  name: "PostFooters",
  components: {
    PostComments,
  },
  props: {
    postId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      // 해당 게시글의 댓글
      comments: [],

      // 패치할 댓글 개수
      fetchCommentsCount: 5,

      // 총 댓글수
      totalCommentsNumber: 0,

      // 댓글 보여줄지 말지
      isShowComments: false,

      // 댓글에 포커스 줄지말지 결정
      isFocus: false,

      // 좋아요 정보
      like: [],

      // 좋아요 누른 사람들 보여줄지말지
      isShowLikeList: false,
    };
  },
  computed: {
    username() {
      return this.$store.state.auth.name;
    },
    // 좋아요 누른 개수
    likeCount() {
      return this.like.length;
    },
    // 좋아요를 이미 누른사람인지 아닌지 판단
    previousClickLike() {
      const temp = this.like.find(v => {
        if (v.User.name === this.username) {
          return v;
        }
      });

      return temp ? temp : false;
    },
  },
  async created() {
    // 전체 댓글 개수 가져오기
    await this.onFetchTotalCommentsNumber();

    // 게시글에 좋아요 누른 유저 정보 가져오기
    this.onFetchPostOfLike();
  },
  methods: {
    // 총댓글 개수 가져오기
    async onFetchTotalCommentsNumber() {
      const response = await getTotalCommentsNumber(this.postId);
      this.totalCommentsNumber = response.Comments[0] ? response.Comments[0].totalCommentsNumber : 0;
    },
    // 게시글의 댓글 불러오기
    async onFetchPostOfComments() {
      const { Comments } = await fetchPostOfComments(this.postId, this.fetchCommentsCount);
      this.comments = Comments;

      // 댓글 삭제시 5개 이하가 되면 댓글 더보기 버튼 없애기 위함
      await this.onFetchTotalCommentsNumber();
    },
    // 댓글달기
    async appendComments(contents) {
      try {
        await uploadComments(this.postId, contents);
        this.onFetchPostOfComments();
      } catch (error) {
        if (error.response) {
          switch (error.response.status) {
            case 503:
              alert(error.response.message);
              break;

            default:
              alert("알 수 없는 에러 by PostComments.vue", error.response.error);
              break;
          }
        } else {
          console.error("클라이언트측 에러 by PostFooters.vue", error);
        }
      }
    },
    // 댓글 더불러오기
    async loadingMoreComments() {
      this.fetchCommentsCount += 5;
      await this.onFetchPostOfComments();
    },
    // 댓글 보기 클릭
    clickShowComments() {
      this.isShowComments = !this.isShowComments;
      this.isFocus = false;

      // 조건으로 다시 패치안하도록 수정필요
      this.onFetchPostOfComments();
    },
    // 댓글 입력 클릭
    clickAddComments() {
      this.isShowComments = true;
      this.isFocus = true;
      this.onFetchPostOfComments();
    },
    // 게시글의 좋아요정보 불러오기
    async onFetchPostOfLike() {
      const { Likes } = await fetchPostOfLike(this.postId);
      this.like = Likes;
    },
    // 좋아요 추가 및 삭제
    async appendOrDeleteLike() {
      try {
        if (this.previousClickLike) {
          await removeLike(this.previousClickLike._id);
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
    // 좋아요 누른 사람들 보여주기
    showLikeList() {
      this.isShowLikeList = true;
    },
    // 좋아요 누른 사람들 숨기기
    hideLikeList() {
      this.isShowLikeList = false;
    },
  },
};
</script>

<style scoped>
#post__footers {
  padding: 0 1rem 0.2rem;
}

/* 전체 아이콘 우측 마진부여 */
.far {
  margin-right: 0.5rem;
}

.show,
.execute {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.show > li {
  color: gray;
}
.execute > li {
  flex-grow: 1;
  padding: 0.4rem;
  font-weight: bold;
  text-align: center;
  border-radius: 0.4rem;
  cursor: pointer;
  color: rgb(112, 112, 112);
}
.execute > li:hover {
  background: var(--gray-color);
}

.like {
  position: relative;
}
/* 좋아요 아이콘 */
.icon__like {
  background: linear-gradient(#7dbae9, #0087ee);
  color: white;
  font-size: 0.5rem;
  padding: 0.3rem;
  border-radius: 100%;
  margin-right: 0.5rem;
}
/* 좋아요 누른사람들 목록 */
.like__list > li {
  font-size: 0.4rem;
}
.like__list > li:first-child {
  font-weight: 700;
  font-size: 1rem;
}
.like__list {
  position: absolute;
  top: 120%;
  bottom: 0;
  padding: 0.5rem;
  min-width: 100px;
  min-height: 200px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 0.2rem;
}

/* 댓글 x개 */
.comments {
  font-size: 0.9rem;
  cursor: pointer;
}
.comments:hover {
  text-decoration: underline;
}
</style>
