<template>
  <section id="post__page">
    <h1 class="title">게시물 만들기</h1>

    <form-post @submit:post="submitPost"></form-post>
  </section>
</template>

<script>
import { uploadPost } from "@/api/index.js";
import FormPost from "@/components/form/FormPost.vue";

export default {
  name: "PostPage",
  components: {
    FormPost,
  },
  methods: {
    async submitPost(title, contents) {
      try {
        const { response } = await uploadPost({ title, contents });

        alert(`"${response.title}"이 생성되었습니다. 메인페이지로 이동합니다.`);

        this.$filter.emitter.emit("fetch:postList");

        this.$router.push("/");
      } catch (error) {
        if (error.response) {
          switch (error.response.status) {
            case 500:
              alert(error.response.message);
              break;
          }
        } else {
          console.error("PostPage.vue >> ", error);
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
