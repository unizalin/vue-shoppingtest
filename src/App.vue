<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    //把路徑寫在config dev.enc.js 再做更改
    const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`; //"https://vue-course-api.hexschool.io/api/utest/products";
    //api 伺服器路徑
    // 所申請的APIPath
    console.log(process.env.APIPATH, process.env.CUSTOMPATH);
    this.$http.get(api).then(response => {
      console.log(response.data);
    });
  }
};
</script>

<style lang="scss">
@import "./assets/all.scss";
</style>
