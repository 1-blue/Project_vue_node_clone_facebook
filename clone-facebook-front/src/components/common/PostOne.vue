<template>
  <li class="post shadow">
    <post-title :username="username" :profileImage="profileImage" :updatedAt="updatedAt" :postId="post._id" @show:editForm="isShowEditForm = !isShowEditForm"></post-title>
    <post-contents :contents="contents"></post-contents>

    <!-- 게시글 수정 폼 -->
    <template v-if="isShowEditForm">
      <form-edit-post :post="post" @close:postEditForm="isShowEditForm = false"></form-edit-post>
    </template>
  </li>
</template>

<script>
import PostTitle from "@/components/post/PostTitle.vue";
import PostContents from "@/components/post/PostContents.vue";
import FormEditPost from "@/components/form/FormEditPost.vue";

export default {
  name: "PostOne",
  components: {
    PostTitle,
    PostContents,
    FormEditPost,
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isShowEditForm: false,
    };
  },
  computed: {
    username() {
      return this.post.User.name;
    },
    profileImage() {
      const profileImage = this.post.User.Images.find(image => {
        if (image.kinds === 0) {
          return image.name;
        }
      });

      return profileImage.name;
    },
    updatedAt() {
      return this.post.updatedAt;
    },
    contents() {
      return this.post.contents;
    },
  },
};
</script>

<style scoped>
.post {
  min-width: 40vw;
  background: white;
  border-radius: 0.2rem;
  margin: 0.5rem 0;
}
</style>
