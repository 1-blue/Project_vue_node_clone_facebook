<template>
  <ul id="comments__footer">
    <li class="comments__like">좋아요</li>
    <li class="comments__separator"><span>-</span></li>
    <li class="comments__recomments">답글달기</li>
    <li class="comments__separator"><span>-</span></li>
    <li class="comments__time">{{ createdTime }}</li>
  </ul>
</template>

<script>
export default {
  name: "CommentsFooter",
  props: {
    createdAt: {
      type: String,
      required: true,
    },
  },
  computed: {
    createdTime() {
      return this.$filter.timeFormat(this.createdAt);
    },
  },
};
</script>

<style scoped>
#comments__footer {
  display: flex;
  align-items: baseline;
}

.comments__like,
.comments__recomments,
.comments__time {
  font-size: 0.8rem;
  font-weight: bold;
  color: gray;
  cursor: pointer;
}
.comments__like:hover,
.comments__recomments:hover,
.comments__time:hover {
  text-decoration: underline;
}
.comments__time {
  font-weight: 500;
  font-size: 0.6rem;
}

.comments__separator {
  font-size: 0.8rem;
  color: gray;
  margin: 0 0.2rem;
}
</style>
