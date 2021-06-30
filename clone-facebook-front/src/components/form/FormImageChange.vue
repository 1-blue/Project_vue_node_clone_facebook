<template>
  <form @submit.prevent class="form__image__change">
    <label for="profile__image" class="profile__image">
      <i class="fas fa-camera"></i>
      프로필사진변경
    </label>
    <input type="file" name="profileImage" accept="image/*" id="profile__image" ref="profileImage" @change="changeProfileImage" />

    <label for="profile__frame" class="profile__frame">
      <i class="fas fa-image"></i>
      프레임추가 ( X )
    </label>
    <input type="file" name="profileframe" accept="image/*" id="profile__frame" ref="profileFrame" />
  </form>
</template>

<script>
import { updateProfileImage } from "@/api/index.js";

export default {
  name: "FormImageChange",
  methods: {
    async changeProfileImage() {
      try {
        // 프로필이미지 변경
        await updateProfileImage(this.$refs.profileImage.files[0]);

        // 데이터 다시받기
        this.$emit("fetch:user");
      } catch (error) {
        switch (error.response.status) {
          case 400:
            alert("FormImageChange.vue 400에러 >> ", error);
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
  width: 300px;
  height: 12vh;
  border-radius: 0.5rem;
  box-shadow: 0 0 15px grey;
}
#profile__image,
#profile__frame {
  display: none;
}
.profile__image,
.profile__frame {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  border-radius: 0.5rem;
  cursor: pointer;
  text-align: start;
  vertical-align: middle;
}
.profile__image:hover,
.profile__frame:hover {
  background: var(--gray-color);
}
.fas {
  font-size: 1.2rem;
  padding-right: 0.4rem;
}
</style>
