<template>
  <section id="recomments__container">
    <!-- 대댓글업로드 -->
    <comments-input
      class="recomments__input"
      @submit:comments="onSubmitRecomments"
      @close:commentInput="$emit('close:commentInput')"
      v-if="isShowRecommentsInput"
    ></comments-input>

    <!-- 답글 -->
    <template v-if="isRecommentsList">
      <button type="button" class="recomments__show__button" @click="isShowRecommentsList = !isShowRecommentsList">
        <i class="fas fa-reply icon__reply"></i>
        답글 {{ recommentCount }}개
      </button>

      <ul v-if="isShowRecommentsList">
        <recomments-show
          v-for="recomments in recommentsList"
          :key="recomments._id"
          :recomments="recomments"
          @mouseenter="isShowRecommentsOptionButton = true"
          @mouseleave="isShowRecommentsOptionButton = false"
        ></recomments-show>
      </ul>
    </template>
  </section>
</template>

<script>
import { uploadRecomments, fetchCommentsOfRecomments, getRecommentsCount } from "@/api/index.js";
import CommentsInput from "@/components/comments/CommentsInput.vue";
import RecommentsShow from "@/components/recomments/RecommentsShow.vue";

export default {
  name: "RecommentsContainer",
  components: {
    CommentsInput,
    RecommentsShow,
  },
  props: {
    commentsId: {
      type: Number,
      required: true,
    },
    isShowRecommentsInput: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      fetchRecommentsCount: 5,
      recommentsList: [],
      isShowRecommentsList: false,
      recommentCount: 0,
    };
  },
  computed: {
    isRecommentsList() {
      if (Array.isArray(this.recommentsList) && this.recommentsList.length !== 0) {
        return true;
      }
      return false;
    },
  },
  async created() {
    await this.onFetchCommentsOfRecomments();
    this.onGetRecommentsCount();
  },
  methods: {
    // 대댓글 패치하기
    async onFetchCommentsOfRecomments() {
      const { Recomments } = await fetchCommentsOfRecomments(this.commentsId, this.fetchRecommentsCount);
      this.recommentsList = Recomments;
    },
    // 대댓글 존재하면 대댓글 총 개수 구하기
    async onGetRecommentsCount() {
      if (this.isRecommentsList) {
        const { Recomments } = await getRecommentsCount(this.commentsId);
        this.recommentCount = Recomments[0].recommentCount;
      }
    },
    // 답글생성
    async onSubmitRecomments(contents) {
      try {
        await uploadRecomments(this.commentsId, contents);

        // 다시 패치
        this.onFetchCommentsOfRecomments();
        this.onGetRecommentsCount();
      } catch (error) {
        switch (error.response.status) {
          case 503:
            alert(error.response.message);
            break;

          default:
            alert("알 수 없는 에러 by CommentsFoorter.vue");
        }
      }
    },
  },
};
</script>

<style scoped>
.recomments__show__button {
  border: none;
  background: transparent;
  cursor: pointer;
  color: gray;
  font-size: 1rem;
  font-weight: bold;
}

.recomments__show__button:hover {
  text-decoration: underline;
}

.icon__reply {
  transform: rotateX(180deg) rotateY(180deg);
}
</style>
