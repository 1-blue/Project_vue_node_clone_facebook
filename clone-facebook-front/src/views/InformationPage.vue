<template>
  <section id="information__page">
    <section class="image">
      <!-- 커버이미지 -->
      <div class="container__cover__image">
        <img :src="myCoverImage" alt="커버이미지" class="cover__image" @click="isShowCoverImageChangeForm = !isShowCoverImageChangeForm" ref="coverImageButton" v-if="myCoverImage" />
        <div class="cover__image" @click="isShowCoverImageChangeForm = !isShowCoverImageChangeForm" ref="coverImageButton" v-else></div>

        <!-- 커버이미지 수정 form -->
        <form-image-change class="cover__image__change__form" v-show="isShowCoverImageChangeForm" :kinds="IMAGE.COVER_IMAGE" @fetch:user="fetchUser">
          <template v-slot:change>
            <i class="fas fa-camera"></i>
            커버이미지변경
          </template>
          <template v-slot:remove>
            <i class="fas fa-eraser"></i>
            커버이미지제거
          </template>
        </form-image-change>
      </div>

      <!-- 프로필이미지 -->
      <div class="container__profile__image">
        <img
          :src="myProfileImage"
          alt="프로필이미지"
          class="profile__image shadow"
          @click="isShowProfileImageChangeForm = !isShowProfileImageChangeForm"
          ref="profileImageButton"
          v-if="profileImage"
        />
        <img src="@/assets/user-default.png" alt="프로필이미지" class="profile__image shadow" @click="isShowProfileImageChangeForm = !isShowProfileImageChangeForm" ref="profileImageButton" v-else />

        <!-- 프로필이미지 수정 form -->
        <form-image-change class="profile__image__change__form" v-show="isShowProfileImageChangeForm" :kinds="IMAGE.PROFILE_IMAGE" @fetch:user="fetchUser">
          <template v-slot:change>
            <i class="fas fa-camera"></i>
            프로필사진변경
          </template>
          <template v-slot:remove>
            <i class="fas fa-eraser"></i>
            프로필이미지제거
          </template>
          <template v-slot:appendFrame>
            <i class="fas fa-image"></i>
            프레임추가 ( 기능없음 )
          </template>
        </form-image-change>
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
import { fetchInformation } from "@/api/index.js";
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
      isShowCoverImageChangeForm: false,
    };
  },
  computed: {
    IMAGE() {
      return this.$filter.IMAGE;
    },
    name() {
      if (!this.data) return;
      return this.data.name;
    },
    currentClickNode() {
      return this.$store.state.currentClickNode;
    },
    profileImage() {
      if (!this.data) return;
      if (this.data.Images.length === 0) return;
      const profileImage = this.data.Images.find(image => {
        if (image.kinds === this.IMAGE.PROFILE_IMAGE) {
          return image.name;
        }
      });

      return profileImage ? profileImage.name : null;
    },
    myProfileImage() {
      return this.profileImage ? `http://localhost:3000/image/profile/${this.profileImage}` : null;
    },
    coverImage() {
      if (!this.data) return;
      if (this.data.Images.length === 0) return;
      const coverImage = this.data.Images.find(image => {
        if (image.kinds === this.$filter.IMAGE.COVER_IMAGE) {
          return image.name;
        }
      });

      return coverImage ? coverImage.name : null;
    },
    myCoverImage() {
      return this.coverImage ? `http://localhost:3000/image/cover/${this.coverImage}` : null;
    },
  },
  watch: {
    currentClickNode(value) {
      // 프로필이미지외 다른거 클릭시 form 닫기
      if (value !== this.$refs.profileImageButton) {
        this.isShowProfileImageChangeForm = false;
      }

      // 커버이미지외 다른거 클릭시 form 닫기
      if (value !== this.$refs.coverImageButton) {
        this.isShowCoverImageChangeForm = false;
      }
    },
  },
  async created() {
    await this.fetchUser();
  },
  methods: {
    async fetchUser() {
      try {
        this.data = await fetchInformation();
        return;
      } catch (error) {
        console.log("error >> ", error);
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
/* 이미지관련 */
.image {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 70vh;
  background: white;
}

/* 커버이미지 */
.container__cover__image {
  position: relative;
  background: var(--light-gray-color);
  width: 70%;
  min-height: 70%;
  border-radius: 0 0 1rem 1rem;
  box-shadow: 0 0 10px grey;
  cursor: pointer;
}
.cover__image {
  width: 100%;
  height: 100%;
  border-radius: 0 0 1rem 1rem;
}
.cover__image__change__form {
  position: absolute;
  bottom: -40%;
  right: 0;
  z-index: 9999;
}

/* 프로필이미지 */
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
  bottom: -100%;
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

.fas {
  font-size: 1.2rem;
  padding-right: 0.4rem;
}
</style>
