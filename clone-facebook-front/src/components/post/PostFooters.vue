<template>
  <section id="post__footers">
    <!-- 댓글이나 좋아요 개수를 보여주는 영역 -->
    <ul class="show">
      <!-- 좋아요 누른 사람 보여줌 -->
      <li class="like" @mouseenter="onIsShowLikeList" @mouseleave="offIsShowLikeList">
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
        <span>댓글 {{ commentsCount }}개</span>
      </li>
    </ul>

    <hr />

    <!-- 댓글이나 좋아요를 추가하는 영역 -->
    <ul class="execute">
      <li @click="$emit('appendOrDelete:like', previousClickLike)">
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

    <post-comments
      :comments="comments"
      :isFocus="isFocus"
      :commentsCount="commentsCount"
      @submit:comments="submitComments"
      @loading:comments="$emit('loading:comments')"
      @fetch:comments="$emit('fetch:comments')"
      v-if="isShowComments"
    ></post-comments>
  </section>
</template>

<script>
import PostComments from "@/components/post/PostComments.vue";

export default {
  name: "PostFooters",
  components: {
    PostComments,
  },
  props: {
    like: {
      type: Array,
      required: true,
    },
    comments: {
      type: Array,
      required: true,
    },
    commentsFetchCount: {
      type: Number,
      required: true,
    },
    commentsCount: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isShowLikeList: false,
      isShowComments: false,
      isFocus: false,
      commentCount: 0,
    };
  },
  computed: {
    username() {
      return this.$store.state.name;
    },
    likeCount() {
      return this.like.length;
    },
    previousClickLike() {
      const temp = this.like.find(v => {
        if (v.User.name === this.username) {
          return v;
        }
      });

      return temp ? temp : false;
    },
  },
  methods: {
    onIsShowLikeList() {
      this.isShowLikeList = true;
    },
    offIsShowLikeList() {
      this.isShowLikeList = false;
    },
    clickShowComments() {
      this.isShowComments = !this.isShowComments;
      this.isFocus = false;

      // 댓글을 처음 불러올때만 호출
      if (this.comments.length !== this.commentsFetchCount) {
        this.$emit("fetch:comments");
      }
    },
    clickAddComments() {
      this.isShowComments = true;
      this.isFocus = true;
      if (this.comments.length !== this.commentsFetchCount) {
        this.$emit("fetch:comments");
      }
    },
    submitComments(contents) {
      this.$emit("submit:comments", contents);
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
