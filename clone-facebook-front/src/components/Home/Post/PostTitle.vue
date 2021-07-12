<template>
  <div class="post__title">
    <!-- 포스트작성 유저의 프로필이미지 -->
    <profile-image :profileImage="profileImage" :size="40"></profile-image>

    <!--  포스트작성 유저이름 및 포스트 업로드시간 -->
    <div class="wrapper__post__info">
      <!-- 포스트작성 유저이름 -->
      <span class="post__user__name">
        {{ username }}
      </span>
      <!-- 포스트 작성 시간 -->
      <span class="post__created__time" @mouseenter="showUpdatedTime" @mouseleave="hideUpdatedTime">
        {{ updatedTime }}
      </span>
      <!-- 포스트 작성 시간 (상세) -->
      <span class="show__time" v-show="isShowUpdatedTime">
        {{ detailUpdatedTime }}
      </span>
    </div>

    <!-- 포스트 옵션폼 버튼 -->
    <span class="post__more__button" ref="postOptionButton" @click="isShowOption = !isShowOption">...</span>

    <!-- 포스트 옵션 폼 ( 수정 및 삭제 ) -->
    <form-post-option
      class="post__option"
      :username="username"
      @show:editForm="$emit('show:editForm')"
      @delete:post="$emit('delete:post')"
      v-if="isShowOption"
    ></form-post-option>
  </div>
</template>

<script>
import ProfileImage from "@/components/common/ProfileImage.vue";
import FormPostOption from "@/components/form/FormPostOption.vue";

export default {
  name: "PostTitle",
  components: {
    ProfileImage,
    FormPostOption,
  },
  props: {
    userInfo: {
      type: Object,
      required: true,
    },
    updatedAt: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isShowUpdatedTime: false,
      isShowOption: false,
    };
  },
  computed: {
    username() {
      return this.userInfo.name;
    },
    profileImage() {
      return this.userInfo.Images ? this.userInfo.Images[0].name : null;
    },
    updatedTime() {
      return this.$filter.timeFormat(this.updatedAt);
    },
    detailUpdatedTime() {
      return this.$filter.dateFormat(this.updatedAt, "YYYY년MM월DD일hh시mm분ss초");
    },
    currentClickNode() {
      return this.$store.state.link.currentClickNode;
    },
    postOptionButton() {
      return this.$refs.postOptionButton;
    },
  },
  watch: {
    // 옵션창외 다른 곳을 클릭하면 옵션창 닫기
    currentClickNode(clickNode) {
      if (clickNode !== this.postOptionButton) {
        this.isShowOption = false;
      }
    },
  },
  methods: {
    // 상세시간보기
    showUpdatedTime() {
      this.isShowUpdatedTime = true;
    },
    // 상세시간닫기
    hideUpdatedTime() {
      this.isShowUpdatedTime = false;
    },
  },
};
</script>

<style scoped>
.post__title {
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 1rem 1rem 0;
}
.wrapper__post__info {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-left: 0.5rem;
}
.post__user__name {
  font-weight: bold;
  cursor: pointer;
}
.post__created__time {
  font-size: 0.8rem;
  color: gray;
}
.show__time {
  position: absolute;
  bottom: -100%;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5rem;
  font-size: 0.8rem;
  border-radius: 0.4rem;
}
.post__more__button {
  font-size: 2rem;
  font-weight: bold;
  border-radius: 100%;
  padding: 0 0.4rem;
  line-height: 1.2rem;
  transition: all 0.5s;
  cursor: pointer;
}
.post__more__button:hover {
  background: #dadce0;
}

.post__option {
  position: absolute;
  top: 100%;
  right: 3%;
}
</style>
