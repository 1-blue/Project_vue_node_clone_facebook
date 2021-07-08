<template>
  <li class="recomments">
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
      @show:editCommentFrom="togleIsShowCommentsEditForm"
      @delete:comments="onDeleteComments"
      v-if="isShowRecommentsOptionForm"
    ></form-comments-option>
  </li>
</template>

<script>
import ProfileImage from "@/components/common/ProfileImage.vue";
import RecommentsContents from "@/components/recomments/RecommentsContents.vue";
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
};
</script>

<style scoped>
.recomments {
  position: relative;
  display: flex;
  margin-bottom: 0.2rem;
}
</style>
