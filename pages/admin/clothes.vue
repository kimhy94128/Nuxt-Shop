<template>
  <div class="container">
    <table>
      <tr>
        <td>카테고리</td>
        <td>상품명</td>
        <td>가격</td>
      </tr>
      <tr v-for="cloth in clothes" :key="cloth['id']">
        <td>{{cloth['category']}}</td>
        <td>{{cloth['name']}}</td>
        <td>{{cloth['price']}}</td>
      </tr>
    </table>

    <div class="pagination">
      <a href="#" @click="getPage(p)" v-for="p in pagination" :key="p">{{ p + 1 }}</a>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
function getPagination({currentPage, totalCount, limit}){
  let pn = []
  let maxPage = Math.floor(totalCount/limit)
  for(let i = currentPage - 3; i < currentPage +3 && i <= maxPage; i++){
    if(i>-1){
      pn.push(i)
    }
  }
  return pn
}
export default {
  layout: 'admin',
  async asyncData(){
    let data = await axios.get('http://localhost:3000/api/v1.0/admin/clothes')
    return {
      clothes: data.data.clothes,
      totalCount: data.data.totalCount,
      limit: data.data.limit,
      currentPage: data.data.currentPage,
      pagination: getPagination({
        currentPage: data.data.currentPage,
        totalCount: data.data.totalCount,
        limit: data.data.limit,
      })
    }
  },
  methods: {
    async getPage(page){
      let url = `http://localhost:3000/api/v1.0/admin/clothes?page=${page}`
      let data = await axios.get(url)

      this.clothes = data.data.cloth
      this.totalCount = data.data.totalCount
      this.limit = data.data.limit
      this.currentPage = data.data.currentPage,
      this.pagination = getPagination({
        currentPage: data.data.currentPage,
        totalCount: data.data.totalCount,
        limit: data.data.limit
      })
    }
  }
}
</script>
<style>
  td {
    border: 1px solid #000;
  }
</style>