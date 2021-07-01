<template>
  <section id="information__page">
    <section class="image">
      <!-- 커버이미지 -->
      <img :src="myCoverImage" alt="커버이미지" class="cover__image" />
      <!-- 커버이미지 변경버튼 -->
      <label for="cover__image" class="cover__image__label shadow">
        <i class="fas fa-camera"></i>
        커버이미지 변경
      </label>
      <input type="file" name="coverImage" accept="image/*" id="cover__image" ref="coverImage" @change="changeCoverImage" />

      <!-- 프로필이미지 -->
      <div class="container__profile__image">
        <img
          :src="myProfileImage"
          alt="프로필이미지"
          class="profile__image shadow"
          v-if="profileImage"
          @click="isShowProfileImageChangeForm = !isShowProfileImageChangeForm"
          ref="profileImageButton"
        />
        <img src="@/assets/user-default.png" alt="프로필이미지" class="profile__image shadow" v-else @click="isShowProfileImageChangeForm = !isShowProfileImageChangeForm" ref="profileImageButton" />
        <!-- 프로필이미지 수정 form -->
        <form-image-change class="profile__image__change__form" v-show="isShowProfileImageChangeForm" @fetch:user="fetchUser"></form-image-change>
      </div>

      <!-- 이름 -->
      <span class="name" v-if="name">{{ name }}</span>
      <span class="introduce">소개추가</span>
    </section>
    <section class="navigation shadow">네비게이션</section>
    <section class="temp"></section>
  </section>
</template>

<script>
import { fetchInformation, updateCoverImage } from "@/api/index.js";
import FormImageChange from "@/components/form/FormImageChange.vue";

export default {
  name: "InformationPage",
  components: {
    FormImageChange,
  },
  data() {
    return {
      data: null,
      isShowProfileImageChangeForm: false,
    };
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    profileImage() {
      if (!this.data) return;
      if (this.data.Images.length === 0) return;
      const profileImage = this.data.Images.find(image => {
        if (image.kinds === 0) {
          return image.name;
        }
      });

      return profileImage.name;
    },
    myProfileImage() {
      return `http://localhost:3000/image/profile/${this.profileImage}`;
    },
    // eslint-disable-next-line vue/return-in-computed-property
    coverImage() {
      if (!this.data) return;
      if (this.data.Images.length === 0) return;
      const coverImage = this.data.Images.find(image => {
        if (image.kinds === 1) {
          return image.name;
        }
      });

      return coverImage.name;
    },
    myCoverImage() {
      return `http://localhost:3000/image/cover/${this.coverImage}`;
    },
    name() {
      if (!this.data) return;
      return this.data.name;
    },
    currentClickNode() {
      return this.$store.state.currentClickNode;
    },
  },
  watch: {
    currentClickNode(value) {
      if (value === this.$refs.profileImageButton) return;
      this.isShowProfileImageChangeForm = false;
    },
  },
  created() {
    this.fetchUser();
  },
  methods: {
    async fetchUser() {
      this.data = await fetchInformation();
    },
    async changeCoverImage() {
      try {
        // 커버이미지 변경
        await updateCoverImage(this.$refs.coverImage.files[0]);

        // 새로 업로드받기
        this.fetchUser();
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
#information__page {
  display: flex;
  flex-direction: column;
}

.image {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 70vh;
  background: white;
}
.cover__image {
  background: var(--light-gray-color);
  width: 70%;
  min-height: 70%;
  border-radius: 0 0 1rem 1rem;
}
#cover__image {
  display: none;
}
.cover__image__label {
  position: relative;
  bottom: 8%;
  left: 25%;
  background: white;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
}
.cover__image__label:hover {
  background: rgb(226, 226, 226);
}
.container__profile__image {
  position: relative;
  top: -30%;
}
.profile__image {
  width: 168px;
  height: 168px;
  border-radius: 100%;
  border: 0.2rem solid gray;
  cursor: pointer;
}
.profile__image:hover {
  /* 임시 */
  opacity: 0.9;
}
.profile__image__change__form {
  position: absolute;
  bottom: -60%;
  left: 0;
  transform: translateX(-25%);
  z-index: 9999;
}
.name {
  position: relative;
  top: -30%;
  font-size: 2.5rem;
  font-weight: bold;
}
.introduce {
  position: relative;
  top: -30%;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--main-color);
}

.navigation {
  height: 10vh;
  background: white;
}
</style>
