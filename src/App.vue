<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
    <button type="button" class="btn btn-primary">Primary</button>
    <button type="button" class="btn btn-secondary">Secondary</button>
    <button type="button" class="btn btn-success">Success</button>
    <button type="button" class="btn btn-danger">Danger</button>
    <button type="button" class="btn btn-warning">Warning</button>
    <button type="button" class="btn btn-info">Info</button>
    <button type="button" class="btn btn-light">Light</button>
    <button type="button" class="btn btn-dark">Dark</button>
    <button type="button" class="btn btn-link">Link</button>
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
