<template>
  <li class="post shadow">
    <post-title :username="username" :profileImage="profileImage" :updatedAt="updatedAt" :postId="post._id" @show:editForm="isShowEditForm = !isShowEditForm"></post-title>
    <hr />
    <post-contents :contents="contents"></post-contents>
    <hr />
    <post-footers :postId="postId" :like="like" @fetch:postList="$emit('fetch:postList')"></post-footers>

    <!-- 게시글 수정 폼 -->
    <template v-if="isShowEditForm">
      <form-edit-post :post="post" @close:postEditForm="isShowEditForm = false"></form-edit-post>
    </template>
  </li>
</template>

<script>
import PostTitle from "@/components/post/PostTitle.vue";
import PostContents from "@/components/post/PostContents.vue";
import PostFooters from "@/components/post/PostFooters.vue";
import FormEditPost from "@/components/form/FormEditPost.vue";

export default {
  name: "PostOne",
  components: {
    PostTitle,
    PostContents,
    PostFooters,
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
        if (image.kinds === this.$filter.IMAGE.PROFILE_IMAGE) {
          return image.name;
        }
      });

      return profileImage ? profileImage.name : null;
    },
    updatedAt() {
      return this.post.updatedAt;
    },
    contents() {
      return this.post.contents;
    },
    postId() {
      return this.post._id;
    },
    like() {
      return this.post.Likes;
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
