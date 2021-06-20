<template>
  <section id="bookmark__page">
    <ul class="bookmark__page__container">
      <!-- 메인페이지 -->
      <li>
        <router-link to="/">
          <i class="fas fa-home icon__home" ref="home"></i>
          <span>메인페이지</span>
        </router-link>
      </li>
      <!-- 친구페이지 -->
      <li>
        <router-link to="/friend">
          <i class="fas fa-user-friends icon__friend"></i>
          <span>친구페이지</span>
        </router-link>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "BookmarkPage",
  components: {},
};
</script>

<style scoped>
#bookmark__page {
}

.bookmark__page__container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.bookmark__page__container > li {
  font-size: 1.2rem;
  font-weight: bold;
  padding: 3vh 35vw;
  margin: 1vw 0;
  border-radius: 1rem;
}
.bookmark__page__container > li:hover {
  background: var(--gray-color);
}
</style>
