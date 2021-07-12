<template>
  <section id="post__comments">
    <!-- 댓글 입력 -->
    <comments-input :isFocus="isFocus" @append:comments="appendComments"></comments-input>

    <!-- 댓글 목록 보여주기 -->
    <ul id="comments__show">
      <comments-component
        v-for="comment in comments"
        :key="comment._id"
        :comment="comment"
        @fetch:comments="$emit('fetch:comments')"
      ></comments-component>
    </ul>

    <!-- 댓글 더보기 버튼 -->
    <button class="fetch__comments__button" @click="$emit('loading:moreComments')" v-if="!isEnd">댓글 더보기</button>
    <span class="fetch__comments__text" v-else>더이상 불러올 댓글이 없습니다.</span>
  </section>
</template>

<script>
import CommentsInput from "@/components/common/CommentsInput.vue";
import CommentsComponent from "@/components/Home/Comments/CommentsComponent.vue";

export default {
  name: "PostComments",
  components: {
    CommentsInput,
    CommentsComponent,
  },
  props: {
    comments: {
      type: Object,
      required: true,
    },
    totalCommentsNumber: {
      type: Number,
      required: true,
    },
    isFocus: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    isEnd() {
      return this.totalCommentsNumber === this.comments.length;
    },
  },
  methods: {
    // 댓글 업로드
    appendComments(contents) {
      this.$emit("append:comments", contents);
    },
  },
};
</script>

<style scoped>
#post__comments {
}

#comments__show {
  display: flex;
  flex-direction: column;
}

.fetch__comments__button {
  border: none;
  background: transparent;
  font-size: 1rem;
  font-weight: bold;
  color: rgb(90, 90, 90);
  cursor: pointer;
}
.fetch__comments__button:hover {
  text-decoration: underline;
}
.fetch__comments__text {
  font-size: 0.8rem;
  color: gray;
}
</style>
