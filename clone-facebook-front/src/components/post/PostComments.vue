<template>
  <section id="post__comments">
    <comments-input :postId="postId" :profileImage="profileImage" :isFocus="isFocus"></comments-input>
    <ul id="comments__show">
      <comments-show v-for="comment in comments" :key="comment._id" :comment="comment"></comments-show>
    </ul>
    <button class="fetch__comments__button" @click="$filter.emitter.emit('fetch:appendComments')" v-if="!isEnd">댓글 더보기</button>
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
    postId: {
      type: Number,
      required: true,
    },
    comments: {
      type: Object,
      required: true,
    },
    profileImage: {
      type: String,
      required: true,
    },
    isFocus: {
      type: Boolean,
      required: true,
    },
    commentCount: {
      type: Number,
      required: true,
    },
  },
  computed: {
    isEnd() {
      return this.commentCount === this.comments.length;
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
