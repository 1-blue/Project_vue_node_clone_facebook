<template>
  <section id="information__page">
    <!-- 이미지 영역 -->
    <section class="image">
      <!-- 커버이미지 영역 -->
      <section class="cover__image__section">
        <!-- 커버이미지 -->
        <cover-image
          :coverImageName="coverImageName"
          @show:coverImageChangeForm="isShowCoverImageChangeForm = !isShowCoverImageChangeForm"
          @close:coverImageEditForm="isShowCoverImageChangeForm = false"
        ></cover-image>
        <!-- 커버이미지 수정 form -->
        <form-image-change
          class="cover__image__change__form"
          v-show="isShowCoverImageChangeForm"
          :kinds="IMAGE.COVER_IMAGE"
          @chage:image="changeImage"
          @delete:image="deleteImage"
        >
          <template v-slot:change>
            <i class="fas fa-camera"></i>
            커버이미지변경
          </template>
          <template v-slot:remove>
            <i class="fas fa-eraser"></i>
            커버이미지제거
          </template>
        </form-image-change>
      </section>

      <!-- 프로필이미지영역 -->
      <section class="profile__image__section">
        <!-- 프로필이미지 -->
        <profile-image
          :profileImageName="profileImageName"
          @show:profileImageChangeForm="isShowProfileImageChangeForm = !isShowProfileImageChangeForm"
          @close:profileImageEditForm="isShowProfileImageChangeForm = false"
        ></profile-image>
        <!-- 프로필이미지 수정 form -->
        <form-image-change
          class="profile__image__change__form"
          v-show="isShowProfileImageChangeForm"
          :kinds="IMAGE.PROFILE_IMAGE"
          @chage:image="changeImage"
          @delete:image="deleteImage"
        >
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
      </section>
    </section>

    <!-- 이후에 내 정보 페이지 만들 때 처리하기 -->
    <!-- 이름 -->
    <span class="name" v-if="name">{{ name }}</span>
    <span class="introduce">소개추가</span>
    <section class="navigation shadow">네비게이션</section>
    <section class="temp"></section>
  </section>
</template>

<script>
import {
  fetchInformation,
  updateProfileImage,
  removeProfileImage,
  updateCoverImage,
  removeCoverImage,
} from "@/api/index.js";
import CoverImage from "@/components/Information/CoverImage.vue";
import ProfileImage from "@/components/Information/ProfileImage.vue";
import FormImageChange from "@/components/Information/FormImageChange.vue";

export default {
  name: "InformationPage",
  components: {
    CoverImage,
    ProfileImage,
    FormImageChange,
  },
  data() {
    return {
      // 유저의 정보
      information: {},

      // 프로필이미지 수정폼 보여줄지말지
      isShowProfileImageChangeForm: false,

      // 커버이미지 수정폼 보여줄지말지
      isShowCoverImageChangeForm: false,
    };
  },
  computed: {
    // 전역 이미지 상수값 사용
    IMAGE() {
      return this.$filter.IMAGE;
    },
    // 현재 로그인한 유저의 이름
    name() {
      if (!this.information) return;
      return this.information.name;
    },
    // 프로필이미지 이름 추출
    profileImageName() {
      // 빈 객체라면
      if (Object.keys(this.information).length === 0) return;

      // 프로필이미지 찾기
      const profileImage = this.information.Images.find(image => {
        if (image.kinds === this.IMAGE.PROFILE_IMAGE) {
          return image.name;
        }
      });

      // 프로필이미지 이름 반환
      return profileImage ? profileImage.name : null;
    },
    // 커버이미지 이름 추출
    coverImageName() {
      // 빈 객체라면
      if (Object.keys(this.information).length === 0) return;

      // 커버이미지찾기
      const coverImage = this.information.Images.find(image => {
        if (image.kinds === this.$filter.IMAGE.COVER_IMAGE) {
          return image.name;
        }
      });

      // 커버이미지 이름 반환
      return coverImage ? coverImage.name : null;
    },
  },
  async created() {
    await this.fetchUser();
  },
  methods: {
    // 로그인한 유저의 정보 가져오기
    async fetchUser() {
      try {
        this.information = await fetchInformation();
      } catch (error) {
        if (error.response) {
          switch (error.reponse.status) {
            case 503:
              alert(error.response.message);
              break;

            default:
              alert("알 수 없는 에러 by InformationPage.vue");
              break;
          }
        } else {
          console.error("클라이언트측 에러 by InformationPage.vue", error);
        }
      }
    },
    // 이미지 변경 ( 커버, 프로필 동시처리 )
    async changeImage(kinds, currentImage) {
      try {
        switch (kinds) {
          // 프로필이미지 변경
          case this.IMAGE.PROFILE_IMAGE:
            await updateProfileImage(currentImage);
            break;

          // 커버 이미지 변경
          case this.IMAGE.COVER_IMAGE:
            await updateCoverImage(currentImage);
            break;
        }

        // 데이터 다시받기
        this.fetchUser();
      } catch (error) {
        if (error.response) {
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
        } else {
          console.error("클라이언트측 에러 by FormImageChange.vue", error);
        }
      }
    },
    // 이미지 제거 ( 커버, 프로필 동시처리 )
    async deleteImage(kinds) {
      try {
        switch (kinds) {
          // 프로필이미지 제거
          case this.IMAGE.PROFILE_IMAGE:
            await removeProfileImage();
            break;

          // 커버 이미지 변경
          case this.IMAGE.COVER_IMAGE:
            await removeCoverImage();
            break;

          default:
            break;
        }

        // 데이터 다시받기
        this.fetchUser();
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
.profile__image__section {
  position: relative;
  top: -10%;
}
/* 프로필이미지 */
.cover__image__section {
  position: relative;
  background: var(--light-gray-color);
  width: 70%;
  min-height: 70%;
  border-radius: 0 0 1rem 1rem;
  box-shadow: 0 0 10px grey;
  cursor: pointer;
}
/* 프로필이미지 수정 폼 */
.profile__image__change__form {
  position: absolute;
  bottom: -65%;
  left: 0;
  transform: translateX(-25%);
  z-index: 9999;
}
/* 커버 이미지 수정 폼 */
.cover__image__change__form {
  position: absolute;
  bottom: -40%;
  right: 0;
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
