<script>

  export default{
    props: ["label"],
  }

</script>

<template>
  <div>
    <el-button size="small" type="primary" >{{label}}</el-button>
  </div>
</template>

<style scoped>
  .el-button {
    margin-bottom: 22px !important;
  }
</style>
