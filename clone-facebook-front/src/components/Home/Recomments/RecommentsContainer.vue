<template>
  <section id="recomments__container">
    <!-- 대댓글업로드 -->
    <comments-input
      class="recomments__input"
      @append:comments="onAppendRecomments"
      @close:commentInput="$emit('close:commentInput')"
      v-if="isShowRecommentsInput"
    ></comments-input>

    <!-- 답글 -->
    <template v-if="isRecommentsList">
      <!-- 답글 토글 버튼 -->
      <button type="button" class="recomments__show__button" @click="isShowRecommentsList = !isShowRecommentsList">
        <i class="fas fa-reply icon__reply"></i>
        답글 {{ totalRecommentsNumber }}개
      </button>

      <!-- 답글 보여주기 -->
      <ul v-if="isShowRecommentsList">
        <recomments-show
          v-for="recomments in recommentsList"
          :key="recomments._id"
          :recomments="recomments"
          @fetch:recomments="onRecommentsFetch"
          @show:editRecommentsInput="$emit('show:editRecommentsInput')"
        ></recomments-show>
      </ul>
    </template>
  </section>
</template>

<script>
import { uploadRecomments, fetchCommentsOfRecomments, getTotalRecommentsNumber } from "@/api/index.js";
import CommentsInput from "@/components/common/CommentsInput.vue";
import RecommentsShow from "@/components/Home/Recomments/RecommentsShow.vue";

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
      // 답글 리스트 목록
      recommentsList: [],

      // 답글 보여줄지말지
      isShowRecommentsList: false,

      // 답글의 총 개수
      totalRecommentsNumber: 0,

      // 패치할 답글 개수
      fetchRecommentsCount: 5,
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
    // 대댓글 목록 패치 및 총 개수 가져오기
    await this.onRecommentsFetch();
  },
  methods: {
    // 대댓글 목록 패치 및 총 개수 가져오기
    async onRecommentsFetch() {
      await this.onFetchCommentsOfRecomments();
      this.onGetRecommentsCount();
    },
    // 대댓글 패치하기
    async onFetchCommentsOfRecomments() {
      try {
        const { Recomments } = await fetchCommentsOfRecomments(this.commentsId, this.fetchRecommentsCount);
        this.recommentsList = Recomments;
      } catch (error) {
        if (error.response) {
          switch (error.response.status) {
            case 503:
              alert(error.response.message);
              break;

            default:
              alert("알 수 없는 에러 by RecommentsContainer.vue");
              console.error("서버측 에러 by RecommentsContainer.vue", error);
          }
        } else {
          console.error("클라이언트측 에러 by RecommentsContainer.vue", error);
        }
      }
    },
    // 대댓글 존재하면 대댓글 총 개수 구하기
    async onGetRecommentsCount() {
      if (!this.isRecommentsList) return;

      try {
        const { Recomments } = await getTotalRecommentsNumber(this.commentsId);
        this.totalRecommentsNumber = Recomments[0].totalRecommentsNumber;
      } catch (error) {
        if (error.response) {
          switch (error.response.status) {
            case 503:
              alert(error.response.message);
              break;

            default:
              alert("알 수 없는 에러 by RecommentsContainer.vue");
              console.error("서버측 에러 by RecommentsContainer.vue", error);
          }
        } else {
          console.error("클라이언트측 에러 by RecommentsContainer.vue", error);
        }
      }
    },
    // 답글생성
    async onAppendRecomments(contents) {
      try {
        await uploadRecomments(this.commentsId, contents);

        // 다시 패치
        this.onRecommentsFetch();
      } catch (error) {
        if (error.response) {
          switch (error.response.status) {
            case 503:
              alert(error.response.message);
              break;

            default:
              alert("알 수 없는 에러 by RecommentsContainer.vue");
              console.error("서버측 에러 by RecommentsContainer.vue", error);
          }
        } else {
          console.error("클라이언트측 에러 by RecommentsContainer.vue", error);
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
