<template>
  <li
    class="recomments"
    @mouseenter="isShowRecommentsOptionButton = true"
    @mouseleave="isShowRecommentsOptionButton = false"
  >
    <profile-image :profileImage="profileImage"></profile-image>

    <!-- 대댓글내용 -->
    <recomments-contents
      :username="username"
      :contents="contents"
      :isShowRecommentsOptionButton="isShowRecommentsOptionButton"
      @show:recommentsOptionForm="isShowRecommentsOptionForm = !isShowRecommentsOptionForm"
      @close:recommentsOptionForm="isShowRecommentsOptionForm = false"
    ></recomments-contents>

    <form-comments-option
      :username="username"
      @show:editCommentFrom="$emit('show:editRecommentsInput')"
      @delete:comments="onDeleteRecomments"
      v-if="isShowRecommentsOptionForm"
    ></form-comments-option>
  </li>
</template>

<script>
import { deleteRecomments } from "@/api/index.js";
import ProfileImage from "@/components/common/ProfileImage.vue";
import RecommentsContents from "@/components/Home/Recomments/RecommentsContents.vue";
import FormCommentsOption from "@/components/form/FormCommentsOption.vue";

export default {
  name: "RecommentsShow",
  components: {
    ProfileImage,
    RecommentsContents,
    FormCommentsOption,
  },
  props: {
    recomments: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isShowRecommentsOptionButton: false,
      isShowRecommentsOptionForm: false,
    };
  },
  computed: {
    username() {
      return this.recomments.User.name;
    },
    profileImage() {
      return this.recomments.User.Images[0].name;
    },
    contents() {
      return this.recomments.contents;
    },
  },
  methods: {
    // 대댓글 삭제
    async onDeleteRecomments() {
      try {
        // 대댓글 삭제 API
        await deleteRecomments(this.recomments._id);

        // 대댓글 reFetch
        this.$emit("fetch:recomments");
      } catch (error) {
        switch (error.response.status) {
          case 503:
            alert(error.reponse.message);
            break;

          default:
            alert("알 수 없는 오류 by RecommentsShow.vue");
            break;
        }
      }
    },
  },
};
</script>

<style scoped>
.recomments {
  position: relative;
  display: flex;
  margin-bottom: 0.2rem;
}
</style>
