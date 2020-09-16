<template>
  <div class="container">
    <form action="/api/v1.0/admin/clothes/registry" method="post">
      <label for="옷 이름">옷 이름</label>
      <input type="text" name="name">
      <label for="옷 가격">옷 가격</label>
      <input type="text" name="price">
      <label for="옷 카테고리">옷 카테고리</label>
      <select name="category">
        <option v-for="cate in categories" v-bind:value="cate" :key="cate">{{ cate }}</option>
      </select>
      <label for="옷 이미지">옷 이미지</label>
      <input type="file" name="img">
      <button type="submit">등록하기</button>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      categories: ['상의', '하의'],
    }
  }
}
</script>