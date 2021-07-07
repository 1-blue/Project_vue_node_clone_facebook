<template>
  <section id="post__comments">
    <comments-input :isFocus="isFocus" @submit:comments="submitComments"></comments-input>
    <ul id="comments__show">
      <comments-show
        v-for="comment in comments"
        :key="comment._id"
        :comment="comment"
        @fetch:comments="$emit('fetch:comments')"
      ></comments-show>
    </ul>
    <button class="fetch__comments__button" @click="$emit('loading:comments')" v-if="!isEnd">댓글 더보기</button>
    <span class="fetch__comments__text" v-else>더이상 불러올 댓글이 없습니다.</span>
  </section>
</template>

<script>
import CommentsInput from "@/components/comments/CommentsInput.vue";
import CommentsShow from "@/components/comments/CommentsShow.vue";

export default {
  name: "PostComments",
  components: {
    CommentsInput,
    CommentsShow,
  },
  props: {
    comments: {
      type: Object,
      required: true,
    },
    isFocus: {
      type: Boolean,
      required: true,
    },
    commentsCount: {
      type: Number,
      required: true,
    },
  },
  computed: {
    isEnd() {
      return this.commentsCount === this.comments.length;
    },
  },
  methods: {
    submitComments(contents) {
      this.$emit("submit:comments", contents);
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
