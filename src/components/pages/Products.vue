<template>
  <div>
    45699
  </div>
</template>
<script>
export default {
  data() {
    return {
      products: []
    };
  },
  methods: {
    getProducts() {
      const api = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/admin/products`; //"https://vue-course-api.hexschool.io/api/utest/products";
      //確保http結束時候，把取回的資料存進去
      const vm = this;
      console.log(process.env.APIPATH, process.env.CUSTOMPATH);
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.products = response.data.products;
      });
    },
    created() {
      this.getProducts();
    }
  }
};
</script>
