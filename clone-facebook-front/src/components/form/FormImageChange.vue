<template>
  <form @submit.prevent class="form__image__change">
    <label :for="imageKinds" class="image">
      <slot name="change"></slot>
    </label>
    <input type="file" name="image" accept="image/*" :id="imageKinds" ref="image" @change="changeImage" />

    <label for="" class="image__remove" @click="deleteImage">
      <slot name="remove"></slot>
    </label>

    <template v-if="kinds === $filter.IMAGE.PROFILE_IMAGE">
      <label for="frame" class="frame">
        <slot name="appendFrame"></slot>
      </label>
      <input type="file" name="profileframe" accept="image/*" id="frame" ref="profileFrame" />
    </template>
  </form>
</template>

<script>
import { updateProfileImage, removeProfileImage, updateCoverImage, removeCoverImage } from "@/api/index.js";

export default {
  name: "FormImageChange",
  props: {
    kinds: {
      type: Number,
      required: true,
    },
  },
  computed: {
    // label의 for과 input의 id가 profile이랑 cover랑 같아서 이미지 변경에 오류가 생겨서 서로 다른 이름을 가지게 하기위해 사용
    imageKinds() {
      switch (this.kinds) {
        case this.$filter.IMAGE.PROFILE_IMAGE:
          return "profileImage";

        case this.$filter.IMAGE.COVER_IMAGE:
          return "coverImage";

        default:
          return "image";
      }
    },
  },
  methods: {
    async changeImage() {
      try {
        switch (this.kinds) {
          // 프로필이미지 변경
          case this.$filter.IMAGE.PROFILE_IMAGE:
            await updateProfileImage(this.$refs.image.files[0]);
            break;

          // 커버 이미지 변경
          case this.$filter.IMAGE.COVER_IMAGE:
            await updateCoverImage(this.$refs.image.files[0]);
            break;
        }

        // 데이터 다시받기
        this.$emit("fetch:user");
      } catch (error) {
        switch (error.response.status) {
          // DB에 저장된 이미지명 변경 실패
          case 500:
            alert(error.response.data.message);
            break;

          // 이미지 저장 실패
          case 503:
            alert(error.response.data.message);
            break;

          default:
            alert("FormImageChange.vue 알 수 없는 에러>> ", error);
            break;
        }
      }
    },
    async deleteImage() {
      try {
        switch (this.kinds) {
          // 프로필이미지 제거
          case this.$filter.IMAGE.PROFILE_IMAGE:
            await removeProfileImage();
            break;

          // 커버 이미지 변경
          case this.$filter.IMAGE.COVER_IMAGE:
            await removeCoverImage();
            break;

          default:
            break;
        }

        // 데이터 다시받기
        this.$emit("fetch:user");
      } catch (error) {
        switch (error.response.status) {
          // DB에 저장된 이미지명 변경 실패
          case 500:
            alert(error.response.data.message);
            break;

          // 이미지 저장 실패
          case 503:
            alert(error.response.data.message);
            break;

          default:
            alert("FormImageChange.vue 알 수 없는 에러>> ", error);
            break;
        }
      }
    },
  },
};
</script>

<style scoped>
.form__image__change {
  display: flex;
  flex-direction: column;
  background: white;
  padding: 0.5rem 0.2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 15px grey;
  min-width: 300px;
}
input[type="file"] {
  display: none;
}
.image,
.frame,
.image__remove {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  border-radius: 0.5rem;
  cursor: pointer;
  text-align: start;
  vertical-align: middle;
  padding: 0.8rem 1.4rem;
}
.image:hover,
.frame:hover,
.image__remove:hover {
  background: var(--gray-color);
}
</style>
