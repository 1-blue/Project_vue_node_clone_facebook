<template>
  <form @submit.prevent class="form__image__change">
    <!-- 이미지 수정 -->
    <label :for="imageKinds" class="image">
      <slot name="change"></slot>
    </label>
    <input
      type="file"
      name="image"
      accept="image/*"
      :id="imageKinds"
      ref="image"
      @change="$emit('chage:image', kinds, $refs.image.files[0])"
    />

    <!-- 이미지 제거 -->
    <label for="" class="image__remove" @click="$emit('delete:image', kinds)">
      <slot name="remove"></slot>
    </label>

    <!-- 관상용 - 이미지 테두리 수정 - -->
    <template v-if="kinds === $filter.IMAGE.PROFILE_IMAGE">
      <label for="frame" class="frame">
        <slot name="appendFrame"></slot>
      </label>
      <input type="file" name="profileframe" accept="image/*" id="frame" ref="profileFrame" />
    </template>
  </form>
</template>

<script>
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
