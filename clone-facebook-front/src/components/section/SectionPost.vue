<template>
  <section id="section__post">
    <!-- 게시글리스트 -->
    <ul class="post__container">
      <post-one
        v-for="post in postList"
        :key="post._id"
        :post="post"
        @fetch:postList="$emit('fetch:postList')"
      ></post-one>
    </ul>

    <!-- 게시글더불러오기 -->
    <button type="button" class="fetch__post__button" @click="$filter.emitter.emit('fetch:appendPost')" v-if="!isEnd">
      <i class="fas fa-reply"></i>
      <span> 게시글 더불러오기</span>
    </button>
    <span class="fetch__post__text" v-else>더 이상 불러올 게시글이 없습니다.</span>
  </section>
</template>

<script>
import { getPostCount } from "@/api/index.js";
import PostOne from "@/components/post/PostOne.vue";

export default {
  name: "SectionPost",
  components: {
    PostOne,
  },
  props: {
    postList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      postCount: 0,
    };
  },
  computed: {
    isEnd() {
      return this.postCount === this.postList.length;
    },
  },
  async created() {
    this.postCount = await getPostCount();
  },
};
</script>

<style scoped>
#section__post {
  display: flex;
  flex-direction: column;
  margin-bottom: 10vh;
  align-items: center;
}

.post__container {
  display: flex;
  flex-direction: column;
}

.fetch__post__button {
  border: none;
  background: transparent;
  font-size: 1.2rem;
  font-weight: bold;
  margin: 2rem 0;
  color: rgb(90, 90, 90);
  cursor: pointer;
}
.fetch__post__button:hover {
  border-bottom: 2px solid rgb(90, 90, 90);
}
.fetch__post__text {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 2rem 0;
}
</style>
