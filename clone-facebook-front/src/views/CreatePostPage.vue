<template>
  <section id="post__page">
    <h1 class="title">게시물 만들기</h1>

    <form-post @submit:post="submitPost"></form-post>
  </section>
</template>

<script>
import { uploadPost } from "@/api/index.js";
import FormPost from "@/components/CreatePost/FormPost.vue";

export default {
  name: "PostPage",
  components: {
    FormPost,
  },
  methods: {
    // 게시글 생성
    async submitPost(title, contents) {
      try {
        const { response } = await uploadPost({ title, contents });

        alert(`"${response.title}"이 생성되었습니다. 메인페이지로 이동합니다.`);

        // HomePage.vue에서 사용하며 게시글목록을 다시 패치받음
        this.$filter.emitter.emit("fetch:postList");

        // 메인페이지로 이동
        this.$router.push("/");
      } catch (error) {
        if (error.response) {
          // 서버측 코드 에러
          switch (error.response.status) {
            case 503:
              alert(error.response.message);
              console.error(error.response.error);
              break;
          }
        } else {
          // 알 수 없는 에러
          console.error("알 수 없는 에러 by PostPage.vue >> ", error);
        }
      }
    },
  },
};
</script>

<style scoped>
#post__page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-size: 2rem;
  margin: 2rem 0;
}

@media screen and (max-width: 768px) {
  .title {
    font-size: 1.5rem;
    margin: 1.5rem 0;
  }
}
</style>
