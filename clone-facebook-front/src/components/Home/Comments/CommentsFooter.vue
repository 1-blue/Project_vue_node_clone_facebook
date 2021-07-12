<template>
  <section id="comments__footer">
    <ul class="comments__footer__container">
      <li class="comments__like">좋아요</li>
      <li class="comments__separator"><span>-</span></li>
      <li class="comments__recomments" @click="toggleRecommentsInput">답글달기</li>
      <li class="comments__separator"><span>-</span></li>
      <li class="comments__time">{{ createdTime }}</li>
    </ul>

    <recomments-container
      :commentsId="commentsId"
      :isShowRecommentsInput="isShowRecommentsInput"
      @close:commentInput="closeRecommentsInput"
      @show:editRecommentsInput="showRecommentsInput"
    ></recomments-container>
  </section>
</template>

<script>
import RecommentsContainer from "@/components/Home/Recomments/RecommentsContainer.vue";

export default {
  name: "CommentsFooter",
  components: {
    RecommentsContainer,
  },
  props: {
    commentsId: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      // 답글의 입력창 보여줄지말지
      isShowRecommentsInput: false,
    };
  },
  computed: {
    createdTime() {
      return this.$filter.timeFormat(this.createdAt);
    },
  },
  methods: {
    // 답글창 보일지말지 토글
    toggleRecommentsInput() {
      this.isShowRecommentsInput = !this.isShowRecommentsInput;
    },
    // 답글창 닫기
    closeRecommentsInput() {
      this.isShowRecommentsInput = false;
    },
    // 답글창 열기
    showRecommentsInput() {
      this.isShowRecommentsInput = true;
    },
  },
};
</script>

<style scoped>
.comments__footer__container {
  display: flex;
  align-items: baseline;
}

.comments__like,
.comments__recomments,
.comments__time {
  font-size: 0.8rem;
  font-weight: bold;
  color: gray;
  cursor: pointer;
}
.comments__like:hover,
.comments__recomments:hover,
.comments__time:hover {
  text-decoration: underline;
}
.comments__time {
  font-weight: 500;
  font-size: 0.6rem;
}

.comments__separator {
  font-size: 0.8rem;
  color: gray;
  margin: 0 0.2rem;
}

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
