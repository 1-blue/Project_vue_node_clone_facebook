<template>
  <section id="home__page">
    <!-- 메인페이지 좌측영역 -->
    <h1>여러 링크들</h1>

    <!-- 메인페이지 중간영역 -->
    <section-post :postList="postList"></section-post>

    <!-- 메인페이지 우측영역 -->
    <h1>친구관련정보들</h1>

    <!-- 처음에는 중간영역이 줄어들다가 1000px이후에는 좌측영역없애고 900px이후에는 우측영역없애고  -->
  </section>
</template>

<script>
import { FetchPost } from "@/api/index.js";
import SectionPost from "@/components/section/SectionPost.vue";

export default {
  name: "HomePage",
  components: {
    SectionPost,
  },
  data() {
    return {
      postList: [],
    };
  },
  async created() {
    // 현재 유저에게 보여줄 게시글 정보 가져오기
    const { response } = await FetchPost();
    this.postList = response;
  },
};
</script>

<style scoped>
#home__page {
  display: flex;
  justify-content: space-between;
}
</style>
