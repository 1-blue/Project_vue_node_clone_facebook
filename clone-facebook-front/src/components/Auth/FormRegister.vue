<template>
  <form
    class="form__register"
    enctype="multipart/form-data"
    @submit.prevent="$emit('submit:register', information, $refs.profileImage)"
  >
    <ul class="register__form__container">
      <!-- 제목 및 종료버튼 -->
      <li>
        <h1 class="title">회원가입</h1>
        <i class="far fa-times-circle icon__exit" @click="$emit('close:registerForm')"></i>
      </li>

      <!-- 성명 -->
      <li>
        <input type="text" placeholder="성명입력" v-model.trim="information.name" />
      </li>

      <!-- 아이디 -->
      <li>
        <input type="text" placeholder="아이디입력" v-model.trim="information.id" />
      </li>

      <!-- 비밀번호 -->
      <li>
        <input type="password" placeholder="비밀번호입력" autocomplete="off" v-model.trim="information.password" />
      </li>

      <!-- 이메일 -->
      <li>
        <input type="text" placeholder="이메일입력" v-model.trim="information.email" />
      </li>

      <!-- 성별 -->
      <li class="input__radio__container">
        <div class="input__radio__wrapper">
          <label for="male">남성</label>
          <input type="radio" id="male" name="gender" class="input__radio" :value="true" v-model="information.gender" />
        </div>
        <div class="input__radio__wrapper">
          <label for="female">여성</label>
          <input
            type="radio"
            id="female"
            name="gender"
            class="input__radio"
            :value="false"
            v-model="information.gender"
          />
        </div>
      </li>

      <!-- 태어난날 -->
      <li class="select__birthday__container">
        <select name="year" id="year" class="select__birthday__wrapper" v-model="information.year">
          <!-- 2021년이라서 +1921했음 -->
          <option :value="year + 1921" v-for="year in 100" :key="year">{{ year + 1921 }}</option>
        </select>
        <select name="month" id="month" class="select__birthday__wrapper" v-model="information.month">
          <option :value="month" v-for="month in 12" :key="month">{{ month }}</option>
        </select>
        <select name="day" id="day" class="select__birthday__wrapper" v-model="information.day">
          <option :value="day" v-for="day in 31" :key="day">{{ day }}</option>
        </select>
      </li>

      <!-- 프로필이미지 -->
      <li class="profile__image__container">
        <label for="profile__image" class="label__profile__image">프로필이미지</label>
        <input
          type="file"
          name="profileImage"
          accept="image/*"
          id="profile__image"
          @change="onChangeProfileImage"
          ref="profileImage"
        />
        <span class="select__profile__image__name">{{ profileImageName }}</span>
      </li>

      <!-- 가입버튼 -->
      <li>
        <button type="submit" class="button__register">가입하기</button>
      </li>
    </ul>
  </form>
</template>

<script>
export default {
  name: "FormRegister",
  data() {
    return {
      // 회원가입하는 유저의 정보를 저장할 객체
      information: {
        name: "",
        id: "",
        password: "",
        email: "",
        gender: false,
        year: 0,
        month: 0,
        day: 0,
        profileImage: null,
      },
      profileImageName: "",
    };
  },
  created() {
    // 기본값
    this.information.year = 1998;
    this.information.month = 11;
    this.information.day = 6;
  },
  methods: {
    // 프로필이미지 선택시 화면에 보여주기 위한 메서드
    onChangeProfileImage(e) {
      let temp = e.target.value;
      const index = temp.lastIndexOf("\\");
      this.profileImageName = temp.slice(index + 1);
    },
  },
};
</script>

<style scoped>
.label__profile__image {
  display: inline-block;
  min-width: 10vw;
  min-height: 6vh;
  background: #f5f6f7;
  border: 1px solid #ccd0d5;
  padding: 0.8rem;
  border-radius: 0.5rem;
  cursor: pointer;
}

.form__register {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 전체설정 */
.register__form__container {
  position: relative;
  min-width: 30vw;
  background: white;
  padding: 1rem 2rem;
  border-radius: 0.2rem;
}
.register__form__container li {
  margin: 0.5rem 0;
}
.register__form__container input {
  min-width: 30vw;
  min-height: 6vh;
  background: #f5f6f7;
  border: 1px solid #ccd0d5;
  padding: 0.8rem;
  border-radius: 0.5rem;
}
.register__form__container input[type="file"] {
  display: none;
}

/* 라디오버튼 */
.input__radio__container {
  display: flex;
  justify-content: space-between;
}
.input__radio__wrapper {
  min-width: 14vw;
  min-height: 2vh;
  background: #f5f6f7;
  border: 1px solid #ccd0d5;
  padding: 0.8rem;
  margin: 0.2rem 0;
  border-radius: 0.5rem;
  text-align: center;
}
.input__radio__wrapper .input__radio {
  min-width: 3vw;
  min-height: 2vh;
}

/* 생일 */
.select__birthday__container {
  display: flex;
  justify-content: space-between;
}
.select__birthday__wrapper {
  min-width: 9vw;
  min-height: 5vh;
  border: 1px solid #ccd0d5;
  border-radius: 0.2rem;
}

/* 프로필이미지 관련 */
.select__profile__image__name {
  padding: 0 0.5rem;
}

/* 종료버튼 */
.icon__exit {
  cursor: pointer;
  position: absolute;
  top: 6%;
  right: 5%;
  font-size: 2rem;
}

/* 가입버튼 */
.button__register {
  background: #42b72a;
  border: none;
  border-radius: 0.5rem;
  font-weight: bold;
  color: white;
  font-size: 1.2rem;
  padding: 0.6rem 0;
  margin: 0.5rem 0;
  cursor: pointer;
  transition: all 0.5s;
  min-width: 100%;
}
.button__register:hover {
  background: #36a420;
}
</style>
