<template>
  <div class="post__title">
    <!-- 포스트의 유저 이미지 -->
    <img src="@/assets/user-default.png" alt="기본이미지" class="user__image shadow" />

    <!--  포스트의 유저 및 포스트 업로드시간 -->
    <div class="wrapper__post__info">
      <div class="post__user__name">{{ username }}</div>
      <div class="post__created__time" @mouseenter="isShowTime = true" @mouseleave="isShowTime = false">{{ $filter.timeFormat(updatedAt) }}</div>
      <div class="show__time" v-show="isShowTime">{{ updatedTime }}</div>
    </div>

    <!-- 포스트 관련 옵션버튼 -->
    <span class="post__more__button" @click="isShowOption = !isShowOption">...</span>
    <form-post-option class="post__option" :username="username" v-show="isShowOption"></form-post-option>
  </div>
</template>

<script>
import FormPostOption from "@/components/form/FormPostOption.vue";

export default {
  name: "PostTitle",
  components: {
    FormPostOption,
  },
  props: {
    username: {
      type: String,
      required: true,
    },
    updatedAt: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isShowTime: false,
      isShowOption: false,
    };
  },
  computed: {
    updatedTime() {
      return this.$filter.dateFormat(this.updatedAt, "YYYY년MM월DD일hh시mm분ss초");
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
.user__image {
  border-radius: 100%;
  width: 40px;
  height: 40px;
  opacity: 0.8;
  transition: all 0.5s;
  cursor: pointer;
}
.user__image:hover {
  opacity: 1;
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
  right: 5%;
}
</style>
