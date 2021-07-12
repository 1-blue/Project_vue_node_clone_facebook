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
import { fetchPost } from "@/api/index.js";
import SectionPost from "@/components/section/SectionPost.vue";

export default {
  name: "HomePage",
  components: {
    SectionPost,
  },
  data() {
    return {
      // 게시글들
      postList: [],

      // 한번에 가져올 포스트 개수
      fetchPostNumber: 5,
    };
  },
  created() {
    // 현재 유저에게 보여줄 게시글 정보 가져오기
    this.fetchPostList();
  },
  mounted() {
    // 게시글 정보를 새로 고침해야 할 때
    this.$filter.emitter.on("fetch:postList", this.fetchPostList);

    // 게시글 추가로 패치
    this.$filter.emitter.on("fetch:appendPost", this.fetchAppendPostList);
  },
  methods: {
    // 게시글들 가져오기
    async fetchPostList() {
      try {
        const { response } = await fetchPost(this.fetchPostNumber);
        this.postList = response;
      } catch (error) {
        if (error.response) {
          switch (error.response.status) {
            case 503:
              alert(error.response.message);
              console.error("서버측 에러 by HomePage.vue", error.response.error);
              break;
          }
        } else {
          console.error("클라이언트측 에러 by HomePage.vue ", error);
        }
      }
    },
    // 게시글 추가로 패치하기
    fetchAppendPostList() {
      this.fetchPostNumber += 5;
      this.fetchPostList();
    },
  },
};
</script>

<style scoped>
#home__page {
  display: flex;
  justify-content: space-between;
}
</style>
