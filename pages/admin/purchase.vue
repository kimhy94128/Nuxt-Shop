<template>
  <div class="container">
    <table>
      <tr>
        <td>아이디</td>
        <td>상품명</td>
        <td>상품금액</td>
        <td>수량</td>
      </tr>
      <tr v-for="purchase in purchases" :key="purchase.id">
        <td>{{ purchase.uid }}</td>
        <td>{{ purchase.name }}</td>
        <td>{{ purchase.price }}원</td>
        <td>{{ purchase.count }}개</td>
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
    let data = await axios.get('http://localhost:3000/api/v1.0/admin/purchase')
    return {
      purchases: data.data.purchase,
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
      let url = `http://localhost:3000/api/v1.0/admin/purchase?page=${page}`
      let data = await axios.get(url)

      this.purchases = data.data.purchase
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